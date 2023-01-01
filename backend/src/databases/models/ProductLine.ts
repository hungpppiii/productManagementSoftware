import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface ProductLineModel
	extends Model<InferAttributes<ProductLineModel>, InferCreationAttributes<ProductLineModel>> {
	id: CreationOptional<number>;
	name: string;
	model: string;
	photoUrl: string;
	guaranteePeriod: number;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const ProductLine = sequelize.define<ProductLineModel>(
	'ProductLine',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			type: DataTypes.STRING
		},
		model: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		photoUrl: {
			type: DataTypes.STRING
		},
		guaranteePeriod: {
			allowNull: false,
			type: DataTypes.TINYINT
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'productline',
		underscored: true
	}
);

export default ProductLine;
