import axios from "axios";
import { PRODUCT_LINE_URL } from "../config/api";

// Admin

export const getProductLineByIdAPI = async (id) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .get(`${PRODUCT_LINE_URL}/id`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

export const getProductLinesAPI = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .get(`${PRODUCT_LINE_URL}`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// Admin
// interface ProductLinePayload {
// 	name: string;
// 	model: string;
// 	photoUrl?: string;
// 	guaranteePeriod: number;
// }

export const addProductLine = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .post(`${PRODUCT_LINE_URL}`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

// Admin
// interface ProductLinePayload {
// 	name: string;
// 	model: string;
// 	photoUrl?: string;
// 	guaranteePeriod: number;
// }
export const updateProductLine = async (id) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .put(`${PRODUCT_LINE_URL}/id`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};
