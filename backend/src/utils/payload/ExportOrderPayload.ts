interface ExportOrderPayload {
	productCode: string;
	orderDate?: Date;
	orderName: string;
	orderPhone?: string;
	orderAdress?: string;
}

export default ExportOrderPayload;
