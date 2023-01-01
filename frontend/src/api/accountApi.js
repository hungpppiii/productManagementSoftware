import axios from "axios";
import { CREATE_ACCOUNT_URL, GET_ME_URL, GET_USERS, LOGIN_URL } from "../config/api";

export const loginApi = async (data) => {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  
    const response = axios
      .post(LOGIN_URL, data, options)
      .then((res) => {
        console.log("Response ==", res);
        return res.data;
      })
      .catch((err) => {
        console.log("Error ==", err);
        return err.response.data;
      });
    return response;
  };

  
export const getUsersApi = (token, setAccounts) => {
var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(GET_USERS, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setAccounts(data.data.rows);
      return data;
    });
};

export const getMeApi = (token) => {
    // console.log('get me api');
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = axios
    .get(GET_ME_URL, options)
    .then((res) => {
      console.log("RES==", res);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR==", err);
      return err;
    });
  return response;
};

export const createAccountApi = (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  };
  const response = axios
    .post(CREATE_ACCOUNT_URL, data, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response;
    });

  return response;
};