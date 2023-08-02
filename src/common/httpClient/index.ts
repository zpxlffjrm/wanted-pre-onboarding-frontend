import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { baseUrl } from "../common"

export const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  },
)
