interface GetLoginCodeResponse {
  data: string
}

interface CheckLoginCodeResponse {
  data: string
}

interface LoginData {
  phone: string
}

interface LoginResponse {
  data: {
    token: string
    user: User
  }
}

interface RegisterData {
  phone: string
  name: string
  birthday: string
}
