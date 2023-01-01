import axios from "axios";
import { FACTORY_URL } from "../config/api";

export const getFactoriesAPI = async () => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .get(FACTORY_URL, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

export const addFactoryAPI = async (data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .post(`${FACTORY_URL}`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

export const deleteFactoryAPI = async (id) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios
    .delete(`${FACTORY_URL}/${id}`, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};

export const editFactoryAPI = async (id, data) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = axios
    .put(`${FACTORY_URL}/${id}`, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};
