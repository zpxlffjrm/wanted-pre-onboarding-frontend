export interface LoginRequestBody {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}
