import {
	CreationOptional,
	DataTypes,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import Product, { ProductModel } from './Product';
import Facility, { FacilityModel } from './Facility';

export interface InsuranceModel
	extends Model<InferAttributes<InsuranceModel>, InferCreationAttributes<InsuranceModel>> {
	id: CreationOptional<number>;
	productCode: ForeignKey<ProductModel['code']>;
	insuranceDate: Date;
	guaranteeId: ForeignKey<FacilityModel['id']>;
	distributeId: ForeignKey<FacilityModel['id']>;
	produceId: ForeignKey<FacilityModel['id']>;
	error: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	Product: NonAttribute<ProductModel>;
}

const Insurance = sequelize.define<InsuranceModel>(
	'Insurance',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		productCode: {
			allowNull: false,
			type: DataTypes.STRING
		},
		insuranceDate: {
			allowNull: false,
			type: DataTypes.DATE
		},
		guaranteeId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		distributeId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		produceId: {
			type: DataTypes.INTEGER
		},
		error: {
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
		tableName: 'insurance',
		underscored: true
	}
);

Product.hasMany(Insurance, {
	sourceKey: 'code',
	foreignKey: 'productCode'
});

Insurance.belongsTo(Product, {
	targetKey: 'code',
	foreignKey: 'productCode'
});

Facility.hasMany(Insurance, {
	foreignKey: 'distributeId'
});

Facility.hasMany(Insurance, {
	foreignKey: 'guaranteeId'
});

Facility.hasMany(Insurance, {
	foreignKey: 'produceId'
});

export default Insurance;
