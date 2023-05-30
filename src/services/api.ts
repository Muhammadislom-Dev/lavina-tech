import Axios from "axios";
import { BASE_URL } from "../constants";

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});


export const API = {
  login: (payload: any) => axiosInstance.post("/signup", payload),
  creatBook: (payload: any) => axiosInstance.post("/books", payload),
};
