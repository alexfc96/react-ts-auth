import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  }).then((response: { data: any; }) => {
    if (response.data) {
      localStorage.setItem("token", JSON.stringify(response.data));
    }
    return response.data;
  });;
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response: { data: any; }) => {
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const getUserInfo = (userToken: string) => {
  return axios
    .get(API_URL + "profile", {
      headers: {
        token: userToken
      }
    })
    .then((response: { data: any; }) => {
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("token");
  if (userStr) return JSON.parse(userStr);

  return null;
};
