import config from 'config';
import { Facility, Product } from 'databases/models';
import jwt from 'jsonwebtoken';
import FacilityType from 'utils/constants/FacilityType';

const generateAccount = async (facilityType: string) => {
	let prefix: string;
	switch (facilityType) {
		case FacilityType.PRODUCE: {
			prefix = 'cssx';
			break;
		}
		case FacilityType.DISTRIBUTE: {
			prefix = 'dlpp';
			break;
		}
		case FacilityType.GUARANTEE: {
			prefix = 'ttbh';
			break;
		}
		default: {
			prefix = 'admin';
			break;
		}
	}

	let idmx: number =
		(await Facility.max('id', {
			where: {
				type: facilityType
			}
		})) || 0;
	const suffix = (++idmx).toString().padStart(3, '0');

	return prefix + suffix;
};

const generatePassword = () => {
	// return Math.random().toString(36).slice(-8);
	return '12345678';
};

const generateToken = (facilityId: number) => {
	const token = jwt.sign({ facilityId }, config.secret_key, {
		expiresIn: config.expires_in
	});
	return token;
};

const generateProductCode = async (productLineModel: string) => {
	let idx: number = await Product.max('id', {
		where: {
			productLineModel
		}
	});
	return productLineModel + `-${++idx}`;
};

export { generateAccount, generatePassword, generateToken, generateProductCode };
