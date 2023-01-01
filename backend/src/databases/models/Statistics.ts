import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Facility, { FacilityModel } from './Facility';
import ProductLine, { ProductLineModel } from './ProductLine';

export interface StatisticsModel
	extends Model<InferAttributes<StatisticsModel>, InferCreationAttributes<StatisticsModel>> {
	id: CreationOptional<number>;
	time: string;
	warehouse: number;
	work: number;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	facilityId: ForeignKey<FacilityModel['id']>;
	productLineModel: ForeignKey<ProductLineModel['model']>;
}

const Statistics = sequelize.define<StatisticsModel>(
	'Statistics',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		time: {
			type: DataTypes.STRING
		},
		warehouse: {
			defaultValue: 0,
			type: DataTypes.INTEGER
		},
		work: {
			defaultValue: 0,
			type: DataTypes.INTEGER
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		},
		facilityId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		productLineModel: {
			allowNull: false,
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'statistics',
		underscored: true
	}
);

Facility.hasMany(Statistics, {
	foreignKey: 'facilityId'
});
ProductLine.hasMany(Statistics, {
	sourceKey: 'model',
	foreignKey: 'productLineModel'
});

export default Statistics;
