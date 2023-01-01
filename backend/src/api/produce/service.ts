import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Facility, Product, ProductLine, Statistics } from 'databases/models';
import { ProductModel } from 'databases/models/Product';
import ProductStatus from 'utils/constants/ProductStatus';
import { generateProductCode } from 'utils/helpers/generate';
import FacilityType from 'utils/constants/FacilityType';
import { Op } from 'sequelize';
import { ImportPayLoad, ExportPayload } from 'utils/payload';

const getProducts = async (req: Request) => {
	try {
		const { offset, limit, order, query } = paginate(req);
		const produceId = req.facility.id;

		const products = await Product.findAndCountAll({
			where: {
				produceId,
				status: ProductStatus.PRODUCED,
				code: {
					[Op.like]: `%${query}%`
				}
			},
			include: ProductLine,
			offset,
			limit,
			order: [order]
		});

		return products;
	} catch (error) {
		throw error;
	}
};

const getErrorProducts = async (req: Request) => {
	try {
		const { offset, limit, order, query } = paginate(req);
		const produceId = req.facility.id;

		const products = await Product.findAndCountAll({
			where: {
				produceId,
				status: ProductStatus.ERROR,
				code: {
					[Op.like]: `%${query}%`
				}
			},
			offset,
			limit,
			order: [order]
		});

		return products;
	} catch (error) {
		throw error;
	}
};

const getProductById = async (req: Request) => {
	try {
		let data: ProductModel;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const product = await Product.findByPk(id, {
				include: ProductLine
			});
			if (!product) {
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = product;
				message = 'Get successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const importProduct = async (req: Request) => {
	try {
		let data: ProductModel;
		let message: string;
		let status: number;

		const importData: ImportPayLoad = req.body;
		const produceId = req.facility.id;

		if (!importData.productLineModel) {
			message = 'Invalid payload.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const productCode = await generateProductCode(importData.productLineModel);
			const product = await Product.create({
				...importData,
				code: productCode,
				produceId,
				status: ProductStatus.PRODUCED
			});
			data = product;
			let month = product.createdAt.getMonth() + 1;
			let t;
			if (month < 10) {
				t = product.createdAt.getFullYear() + '/' + '0' + month;
			} else {
				t = product.createdAt.getFullYear() + '/' + month;
			}
			let s = await Statistics.findOne({
				where: { time: t, facilityId: produceId, productLineModel: product.productLineModel }
			});
			if (s == null) {
				let statistic = await Statistics.findAll({
					where: { facilityId: produceId, productLineModel: product.productLineModel },
					order: [['createdAt', 'DESC']]
				});
				let wh = 1;
				if (statistic[0] != null) wh = statistic[0].warehouse + 1;
				let new_statistic = await Statistics.create({
					time: t,
					warehouse: wh,
					work: 1,
					facilityId: produceId,
					productLineModel: product.productLineModel
				});
			} else {
				s.warehouse++;
				s.work++;
				await s.save();
			}
			message = 'Import successfully!';
			status = ResponeCodes.CREATED;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const exportProduct = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const exportData: ExportPayload = req.body;
		const { products, distributeId, distributeDate } = exportData;

		if (!distributeId || products.length === 0) {
			message = 'Invalid payload.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const distribute = await Facility.findByPk(distributeId);
			if (distribute.type !== FacilityType.DISTRIBUTE) {
				message = 'Invalid distribute.';
				status = ResponeCodes.BAD_REQUEST;
			} else {
				await Promise.all(
					products.map(async productCode => {
						Product.update(
							{
								distributeId,
								distributeDate,
								status: ProductStatus.INSTOCK
							},
							{
								where: {
									code: productCode,
									status: ProductStatus.PRODUCED
								}
							}
						);
					})
				);
				for (let i in products) {
					let product = await Product.findOne({ where: { code: products[i] } });
					let produceId = product.produceId;
					let month = product.createdAt.getMonth() + 1;
					let t;
					if (month < 10) {
						t = product.createdAt.getFullYear() + '/' + '0' + month;
					} else {
						t = product.createdAt.getFullYear() + '/' + month;
					}
					if (0 == 0) {
						let s = await Statistics.findOne({
							where: { time: t, facilityId: produceId, productLineModel: product.productLineModel }
						});
						if (s == null) {
							let statistic = await Statistics.findAll({
								where: { facilityId: produceId, productLineModel: product.productLineModel },
								order: [['createdAt', 'DESC']]
							});
							let wh = 0;
							if (statistic[0] != null) wh = statistic[0].warehouse - 1;
							let new_statistic = await Statistics.create({
								time: t,
								warehouse: wh,
								work: 0,
								facilityId: produceId,
								productLineModel: product.productLineModel
							});
						} else {
							s.warehouse--;
							await s.save();
						}
					}
					if (0 == 0) {
						let s = await Statistics.findOne({
							where: { time: t, facilityId: distributeId, productLineModel: product.productLineModel }
						});
						if (s == null) {
							let statistic = await Statistics.findAll({
								where: { facilityId: distributeId, productLineModel: product.productLineModel },
								order: [['createdAt', 'DESC']]
							});
							let wh = 1;
							if (statistic[0] != null) wh = statistic[0].warehouse + 1;
							let new_statistic = await Statistics.create({
								time: t,
								warehouse: wh,
								work: 0,
								facilityId: distributeId,
								productLineModel: product.productLineModel
							});
						} else {
							s.warehouse++;
							await s.save();
						}
					}
				}
				message = 'Export successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { getProducts, getErrorProducts,getProductById, importProduct, exportProduct };
