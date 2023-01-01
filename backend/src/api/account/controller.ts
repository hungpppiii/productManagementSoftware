import { Request, Response } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';


// POST: /login
const login = async (req: Request, res: Response) => {
	try {
		const result = await service.login(req.body);
		return new ApiResponse(result.data, result.message, result.status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't login.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /me
const getMe = async (req: Request, res: Response) => {
	try {
		const result = await service.getMe(req.facility);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get info.", ResponeCodes.ERROR).send(res);
	}
};

export { login, getMe };
