import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface FacilityModel extends Model<InferAttributes<FacilityModel>, InferCreationAttributes<FacilityModel>> {
	id: CreationOptional<number>;
	name: string;
	account: string;
	password: string;
	email: string;
	imageUrl: string;
	type: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Facility = sequelize.define<FacilityModel>(
	'Facility',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		account: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'facility',
		underscored: true
	}
);

export default Facility;
