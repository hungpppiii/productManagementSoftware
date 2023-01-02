import axios from "axios";
import { PRODUCE_URL } from "../config/api";

export const getAllProducts = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .get(`${PRODUCE_URL}/all`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

export const getAllErrorProducts = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .get(`${PRODUCE_URL}/all-error`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// check req.facility.id
// interface ImportPayLoad {
// 	productLineModel: string;
// 	mfg: Date;
// }
export const importProduct = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .post(`${PRODUCE_URL}/import`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// interface ExportPayload {
// 	products: string[];
// 	distributeId: number;
// 	distributeDate: Date;
// }

export const exportProducts = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .put(`${PRODUCE_URL}/export`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};
