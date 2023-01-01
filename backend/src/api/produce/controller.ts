import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const getProducts = async (req: Request, res: Response) => {
	try {
		const result = await service.getProducts(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get products.", ResponeCodes.ERROR).send(res);
	}
};

const getErrorProducts = async (req: Request, res: Response) => {
	try {
		const result = await service.getErrorProducts(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get products.", ResponeCodes.ERROR).send(res);
	}
};

const getProduct = async (req: Request, res: Response) => {
	try {
		const result = await service.getProductById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get product.", ResponeCodes.ERROR).send(res);
	}
};

const importProduct = async (req: Request, res: Response) => {
	try {
		const result = await service.importProduct(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't import product.", ResponeCodes.ERROR).send(res);
	}
};

const exportProduct = async (req: Request, res: Response) => {
	try {
		const result = await service.exportProduct(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't export product.", ResponeCodes.ERROR).send(res);
	}
};

export { getProducts, getErrorProducts, getProduct, importProduct, exportProduct };
