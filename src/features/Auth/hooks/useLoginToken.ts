import { LOGIN_STATE_KEY } from "@/common/common"
import { axiosClient } from "@/common/httpClient"
import { useEffect } from "react"

export const useLoginToken = () => {
  const token = localStorage.getItem(LOGIN_STATE_KEY)

  function setToken(token: string) {
    localStorage.setItem(LOGIN_STATE_KEY, token)
  }

  function removeToken() {
    localStorage.removeItem(LOGIN_STATE_KEY)
  }

  useEffect(() => {
    if (token) {
      axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }, [token])

  return {
    token,
    setToken,
    removeToken,
  }
}
