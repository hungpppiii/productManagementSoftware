interface ExportGuaranteePayload {
	productCode: string;
	insuranceDate: Date;
	error: string;
	guaranteeId: number;
}

export default ExportGuaranteePayload;
