import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const getProductLine = async (req: Request, res: Response) => {
	try {
		const result = await service.getProductLine(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get product line.", ResponeCodes.ERROR).send(res);
	}
};

const getProductLineById = async (req: Request, res: Response) => {
	try {
		const result = await service.getProductLineById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get product line.", ResponeCodes.ERROR).send(res);
	}
};

const addProductLine = async (req: Request, res: Response) => {
	try {
		const result = await service.addProductLine(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add product line.", ResponeCodes.ERROR).send(res);
	}
};

const updateProductLine = async (req: Request, res: Response) => {
	try {
		const result = await service.updateProductLine(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update product line.", ResponeCodes.ERROR).send(res);
	}
};

export { getProductLine, getProductLineById, addProductLine, updateProductLine };
