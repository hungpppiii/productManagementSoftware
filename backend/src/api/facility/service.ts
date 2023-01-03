import bcrypt from 'bcrypt';
import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import { Facility } from 'databases/models';
import { FacilityModel } from 'databases/models/Facility';
import FacilityType from 'utils/constants/FacilityType';
import { FacilityInfo, FacilityPayload } from 'utils/payload';
import { generatePassword, generateAccount, generateToken } from 'utils/helpers/generate';

const getFacilities = async (req: Request) => {
	try {
		const { offset, limit, order, query } = paginate(req);

		const facilities = await Facility.findAndCountAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${query}%`
						}
					}
				]
			},
			offset,
			limit,
			order: [order]
		});

		return facilities;
	} catch (error) {
		throw error;
	}
};

const getAllFacilities = async (req: Request) => {
	try {
		const type = req.query.type;
		let whereFacility = {};
		if (type === FacilityType.PRODUCE || type === FacilityType.DISTRIBUTE || type === FacilityType.GUARANTEE) {
			whereFacility = {
				type
			};
		}
		const facilities = await Facility.findAll({
			where: whereFacility
		});
		return facilities;
	} catch (error) {
		throw error;
	}
};

const getFacilityById = async (req: Request) => {
	try {
		let data: FacilityModel;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const facility = await Facility.findByPk(id);
			if (!facility) {
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = facility;
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

const addFacility = async (newFacility: FacilityPayload) => {
	try {
		if (!newFacility.name || !newFacility.type) {
			return {
				message: 'Invalid payload.',
				status: ResponeCodes.BAD_REQUEST
			};
		} else {
			const password = generatePassword();
			const hashPassword = bcrypt.hashSync(password, 10);
			const account = await generateAccount(newFacility.type);

			const facility = await Facility.create({
				...newFacility,
				password: hashPassword,
				account
			});

			const token = generateToken(facility.id);

			return {
				data: {
					facility,
					token
				},
				message: 'Create successfully!',
				status: ResponeCodes.OK
			};
		}
	} catch (error) {
		throw error;
	}
};

const deleteFacility = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			await Facility.destroy({
				where: {
					id
				}
			});
			message = 'Deleted successfully!';
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

const changeFacilityInfo = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const facilityId = req.params.id;
		const facilityInfo: FacilityInfo = req.body;

		const facility = await Facility.findByPk(facilityId);

		const password = facilityInfo.password ? bcrypt.hashSync(facilityInfo.password, 10) : facility.password;

		await Facility.update(
			{
				...facilityInfo,
				password
			},
			{
				where: {
					id: facilityId
				}
			}
		);

		message = 'Update facility successfully!';
		status = ResponeCodes.OK;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { getFacilities, getAllFacilities, getFacilityById, addFacility, deleteFacility, changeFacilityInfo };
