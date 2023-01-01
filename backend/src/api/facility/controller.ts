import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const getFacilities = async (req: Request, res: Response) => {
	try {
		const result = await service.getFacilities(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get facilities.", ResponeCodes.ERROR).send(res);
	}
};

const getAllFacilities = async (req: Request, res: Response) => {
	try {
		const result = await service.getAllFacilities(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get facilities.", ResponeCodes.ERROR).send(res);
	}
};

const getFacility = async (req: Request, res: Response) => {
	try {
		const result = await service.getFacilityById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get facility.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /
const addFacility = async (req: Request, res: Response) => {
	try {
		const result = await service.addFacility(req.body);
		return new ApiResponse(result.data, result.message, result.status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't create account.", ResponeCodes.ERROR).send(res);
	}
};

const deleteFacility = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteFacility(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete facility.", ResponeCodes.ERROR).send(res);
	}
};

const changeFacilityInfo = async (req: Request, res: Response) => {
	try {
		const result = await service.changeFacilityInfo(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update info.", ResponeCodes.ERROR).send(res);
	}
};

export { getFacilities, getAllFacilities, getFacility, addFacility, deleteFacility, changeFacilityInfo };
