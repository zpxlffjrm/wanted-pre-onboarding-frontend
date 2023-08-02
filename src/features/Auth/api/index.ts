import { axiosClient } from "@/common/httpClient"
import { LoginRequestBody, LoginResponse } from "@/features/Auth"

export const authApi = {
  login: (body: LoginRequestBody) => {
    return axiosClient.post<LoginResponse>("/auth/signin", body)
  },
  signUp: (body: LoginRequestBody) => {
    return axiosClient.post<void>("/auth/signup", body)
  },
}
