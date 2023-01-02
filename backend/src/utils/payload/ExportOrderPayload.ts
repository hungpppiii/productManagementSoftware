interface ExportOrderPayload {
	productCode: string;
	orderDate?: Date;
	orderName: string;
	orderPhone?: string;
	orderAddress?: string;
}

export default ExportOrderPayload;
