import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Facility, Product, ProductLine, Statistics } from 'databases/models';
import { ProductModel } from 'databases/models/Product';
import ProductStatus from 'utils/constants/ProductStatus';
import Order, { OrderModel } from 'databases/models/Order';
import sequelize from 'databases';
import Insurance, { InsuranceModel } from 'databases/models/Insurance';
import FacilityType from 'utils/constants/FacilityType';
import { timeDiffByMonth } from 'utils/helpers/timeService';
import { ExportOrderPayload, ExportGuaranteePayload, ImportProductPayload } from 'utils/payload';

const getProducts = async (req: Request) => {
	try {
		const { offset, limit, order } = paginate(req);
		const distributeId = req.facility.id;

		const products = await Product.findAndCountAll({
			where: {
				distributeId,
				status: ProductStatus.INSTOCK
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
		let data;
		let message: string;
		let status: number;

		const distributeId = req.facility.id;
		const importData: ImportProductPayload = req.body;
		const { products, distributeDate } = importData;

		if (products.length === 0) {
			message = 'Invalid payload.';
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

			message = 'Import successfully!';
			status = ResponeCodes.OK;
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

const verifyProduct = async (productCode: string, distributeId: number) => {
	return await Product.findOne({
		where: {
			code: productCode,
			distributeId
		},
		include: {
			model: ProductLine,
			attributes: ['guaranteePeriod']
		}
	});
};

const exportOrder = async (req: Request) => {
	const transaction = await sequelize.transaction();
	try {
		let data: OrderModel;
		let message: string;
		let status: number;

		const distributeId = req.facility.id;
		const exportData: ExportOrderPayload = req.body;

		if (!exportData.productCode || !exportData.orderName || !exportData.orderDate) {
			message = 'Invalid payload.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const product = await verifyProduct(exportData.productCode, distributeId);
			if (!product || product.status !== ProductStatus.INSTOCK) {
				message = 'Invalid product.';
				status = ResponeCodes.BAD_REQUEST;
			} else {
				const order = await Order.create(
					{
						...exportData,
						distributeId
					},
					{ transaction }
				);
				await product.update(
					{
						status: ProductStatus.SOLD
					},
					{ transaction }
				);
				await transaction.commit();

				let produceId = product.distributeId;
				let month = product.distributeDate.getMonth() + 1;
				let t;
				if (month < 10) {
					t = product.distributeDate.getFullYear() + '/' + '0' + month;
				} else {
					t = product.distributeDate.getFullYear() + '/' + month;
				}
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
						work: 1,
						facilityId: produceId,
						productLineModel: product.productLineModel
					});
				} else {
					s.work++;
					s.warehouse--;
					await s.save();
				}

				data = order;
				message = 'Export customer successfully!';
				status = ResponeCodes.CREATED;
			}
		}
		return {
			data,
			message,
			status
		};
	} catch (error) {
		await transaction.commit();
		throw error;
	}
};

const exportGuarantee = async (req: Request) => {
	const transaction = await sequelize.transaction();
	try {
		let data: InsuranceModel;
		let message: string;
		let status: number;

		const distributeId = req.facility.id;
		const exportData: ExportGuaranteePayload = req.body;
		const { productCode, insuranceDate, guaranteeId, error } = exportData;
		if (!productCode || !guaranteeId || !insuranceDate) {
			message = 'Invalid payload.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const product = await verifyProduct(productCode, distributeId);

			if (!product || product.status !== ProductStatus.SOLD || new Date(insuranceDate) < new Date(product.mfg)) {
				message = 'Invalid product.';
				status = ResponeCodes.BAD_REQUEST;
			} else {
				const guarantee = await Facility.findByPk(guaranteeId);
				if (guarantee.type !== FacilityType.GUARANTEE) {
					message = 'Invalid guarantee.';
					status = ResponeCodes.BAD_REQUEST;
				} else {
					const order = await Order.findOne({
						where: {
							productCode
						}
					});
					const diffMonth = timeDiffByMonth(new Date(order.orderDate), new Date(insuranceDate));
					const guaranteePeriod = product.ProductLine.guaranteePeriod;
					if (diffMonth > guaranteePeriod) {
						message = 'Time expired.';
						status = ResponeCodes.OK;
					} else {
						const insurance = await Insurance.create(
							{
								...exportData,
								distributeId
							},
							{ transaction }
						);
						await product.update(
							{
								status: ProductStatus.GUARANTING
							},
							{ transaction }
						);
						await transaction.commit();
						data = insurance;

						let produceId = insurance.guaranteeId;
						var d = new Date();
						let month = d.getMonth() + 1;
						let t;
						if (month < 10) {
							t = d.getFullYear() + '/' + '0' + month;
						} else {
							t = d.getFullYear() + '/' + month;
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
								work: 0,
								facilityId: produceId,
								productLineModel: product.productLineModel
							});
						} else {
							s.warehouse++;
							await s.save();
						}

						message = 'Export guarantee successfully!';
						status = ResponeCodes.CREATED;
					}
				}
			}
		}
		return {
			data,
			message,
			status
		};
	} catch (error) {
		await transaction.commit();
		throw error;
	}
};

export { getProducts, getProductById, importProduct, exportOrder, exportGuarantee };
