export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  phone: string;
}
