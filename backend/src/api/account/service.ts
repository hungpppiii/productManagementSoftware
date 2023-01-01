import bcrypt from 'bcrypt';
import { Facility } from 'databases/models';
import { FacilityModel } from 'databases/models/Facility';
import ResponeCodes from 'utils/constants/ResponeCode';
import { generateToken } from 'utils/helpers/generate';
import { LoginPayLoad } from 'utils/payload';

const verifyAccount = async (account: string) => {
	const facility = await Facility.findOne({
		where: {
			account
		}
	});
	return facility;
};

const login = async (loginData: LoginPayLoad) => {
	try {
		const { account, password } = loginData;

		if (!account || !password) {
			return {
				message: 'Invalid account or password.',
				status: ResponeCodes.BAD_REQUEST
			};
		} else {
			const facility = await verifyAccount(account);

			if (facility) {
				const verifyPassword = bcrypt.compareSync(password, facility.password);
				if (!verifyPassword) {
					return {
						message: 'Wrong password!',
						status: ResponeCodes.OK
					};
				} else {
					const token = generateToken(facility.id);
					return {
						data: {
							account_info: {
								name: facility.name,
								imageURL: facility.imageUrl,
								email: facility.email,
								type: facility.type
							},
							token
						},
						message: 'Login successfully!',
						status: ResponeCodes.OK
					};
				}
			} else {
				return {
					message: 'Account not exsist.',
					status: ResponeCodes.NOT_FOUND
				};
			}
		}
	} catch (error) {
		throw error;
	}
};

const getMe = async (facility: FacilityModel) => {
	try {
		let data: FacilityModel;
		let message: string;
		let status: number;

		data = facility;
		message = 'Get successfully!';
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

export { login, getMe };
