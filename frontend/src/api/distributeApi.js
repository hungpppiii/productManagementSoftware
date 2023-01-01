import axios from "axios";
import { DISTRIBUTE_URL } from "../config/api";

export const getAllProductsDtbAPI = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .get(`${DISTRIBUTE_URL}/all`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// interface ImportProductPayload {
// 	products: string[];
// 	distributeDate: Date;
// }
export const importProductDtbAPI = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .post(`${DISTRIBUTE_URL}/import`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// interface ExportOrderPayload {
// 	productCode: string;
// 	orderDate?: Date;
// 	orderName: string;
// 	orderPhone?: string;
// 	orderAdress?: string;
// }
export const exportOrderAPI = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .post(`${DISTRIBUTE_URL}/export-order`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// interface ExportGuaranteePayload {
// 	productCode: string;
// 	insuranceDate: Date;
// 	error: string;
// 	guaranteeId: number;
// }

export const exportGuaranteeAPI = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .post(`${DISTRIBUTE_URL}/export-guarantee`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};
