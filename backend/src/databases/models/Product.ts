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
import ProductLine, { ProductLineModel } from './ProductLine';
import Facility, { FacilityModel } from './Facility';

export interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
	id: CreationOptional<number>;
	code: string;
	productLineModel: ForeignKey<ProductLineModel['model']>;
	produceId: ForeignKey<FacilityModel['id']>;
	mfg: Date;
	distributeId: ForeignKey<FacilityModel['id']>;
	distributeDate: Date;
	status: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	ProductLine: NonAttribute<ProductLineModel>;
}

const Product = sequelize.define<ProductModel>(
	'Product',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		productLineModel: {
			allowNull: false,
			type: DataTypes.STRING
		},
		produceId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		mfg: {
			type: DataTypes.DATE
		},
		distributeId: {
			type: DataTypes.INTEGER
		},
		distributeDate: {
			type: DataTypes.DATE
		},
		status: {
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
		tableName: 'product',
		underscored: true
	}
);

ProductLine.hasMany(Product, {
	sourceKey: 'model',
	foreignKey: 'productLineModel'
});

Product.belongsTo(ProductLine, {
	targetKey: 'model',
	foreignKey: 'productLineModel'
});

Facility.hasMany(Product, {
	foreignKey: 'produceId'
});

Facility.hasMany(Product, {
	foreignKey: 'distributeId'
});

export default Product;
