import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Facility, Insurance, Product, ProductLine, Statistics } from 'databases/models';
import { ProductModel } from 'databases/models/Product';
import ProductStatus from 'utils/constants/ProductStatus';
import FacilityType from 'utils/constants/FacilityType';
import sequelize from 'databases';
import { Op } from 'sequelize';
import { ExportDistributePayload, ExportProducePayload } from 'utils/payload';

const getProducts = async (req: Request) => {
	try {
		const { offset, limit, order } = paginate(req);
		const guaranteeId = req.facility.id;

		const products = await Insurance.findAndCountAll({
			where: {
				guaranteeId
			},
			include: {
				model: Product,
				where: {
					status: ProductStatus.GUARANTING
				},
				include: [ProductLine]
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

const verifyInsurance = async (productCode: string, guaranteeId: number) => {
	return await Insurance.findOne({
		where: {
			[Op.and]: [{ productCode }, { guaranteeId }]
		},
		include: Product,
		order: [['id', 'DESC']]
	});
};

const exportDistribute = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const guaranteeId = req.facility.id;
		const exportDistributeData: ExportDistributePayload = req.body;

		const insurance = await verifyInsurance(exportDistributeData.productCode, guaranteeId);
		if (!insurance || insurance.Product.status !== ProductStatus.GUARANTING) {
			message = 'Invalid product.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			await insurance.Product.update({
				status: ProductStatus.SOLD
			});
			let product = await Product.findOne({ where: { code: insurance.productCode } });
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
				let w = 0;
				if (statistic[0] != null) w = statistic[0].work + 1;
				let new_statistic = await Statistics.create({
					time: t,
					warehouse: 0,
					work: w,
					facilityId: produceId,
					productLineModel: product.productLineModel
				});
			} else {
				s.work++;
				s.warehouse--;
				await s.save();
			}

			message = 'Export distribute successfully!';
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

const exportProduce = async (req: Request) => {
	const transaction = await sequelize.transaction();
	try {
		let data;
		let message: string;
		let status: number;

		const guaranteeId = req.facility.id;
		const exportProduceData: ExportProducePayload = req.body;
		const { productCode, produceId } = exportProduceData;
		const insurance = await verifyInsurance(exportProduceData.productCode, guaranteeId);

		if (!insurance || insurance.Product.status !== ProductStatus.GUARANTING) {
			message = 'Invalid product.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const produce = await Facility.findByPk(produceId);
			if (produce.type !== FacilityType.PRODUCE) {
				message = 'Invalid produce.';
				status = ResponeCodes.BAD_REQUEST;
			} else {
				await insurance.update(
					{
						produceId
					},
					{ transaction }
				);
				await insurance.Product.update(
					{
						status: ProductStatus.ERROR
					},
					{ transaction }
				);
				await transaction.commit();
				let product = await Product.findOne({ where: { code: insurance.productCode } });
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
					let w = 0;
					if (statistic[0] != null) w = statistic[0].work + 1;
					let new_statistic = await Statistics.create({
						time: t,
						warehouse: 0,
						work: w,
						facilityId: produceId,
						productLineModel: product.productLineModel
					});
				} else {
					s.work++;
					s.warehouse--;
					await s.save();
				}
				message = 'Export produce successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
};

export { getProducts, getProductById, exportDistribute, exportProduce };
