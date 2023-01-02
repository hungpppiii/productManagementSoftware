import { ProductModel } from 'databases/models/Product';

interface ExportPayload {
	products: ProductModel[];
	distributeId: number;
	distributeDate: Date;
}

export default ExportPayload;
