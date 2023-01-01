import axios from "axios";
import { GUARANTEE_URL } from "../config/api";

export const getGuaranteeProductsAPI = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios
    .get(`${GUARANTEE_URL}/all`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getGuaranteeProductLineAPI = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios
    .get(`${GUARANTEE_URL}/all`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const exportDistributeAPI = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios
    .post(`${GUARANTEE_URL}/export-distribute`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const exportProduceAPI = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios
    .post(`${GUARANTEE_URL}/export-produce`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};
