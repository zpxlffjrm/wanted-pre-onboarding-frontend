import { axiosClient } from "@/common/httpClient"
import { authApi } from "../api"
import { LoginRequestBody } from "../type"
import { useLoginToken } from "./useLoginToken"
import { AxiosError } from "axios"
import { AxiosErrorData } from "@/common/httpClient/type"

export const useAuth = () => {
  const { setToken, removeToken } = useLoginToken()

  async function login(body: LoginRequestBody) {
    try {
      const { access_token: accessToken } = await authApi.login(body)

      setToken(accessToken)

      axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } catch (error) {
      return error as AxiosError<AxiosErrorData>
    }
  }

  function logout() {
    removeToken()

    delete axiosClient.defaults.headers.common.Authorization
  }

  async function signUp(body: LoginRequestBody) {
    try {
      await authApi.signUp(body)
    } catch (error) {
      return error as AxiosError<AxiosErrorData>
    }
  }

  return { login, logout, signUp }
}
