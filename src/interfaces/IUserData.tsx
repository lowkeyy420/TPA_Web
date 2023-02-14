export interface IUserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface IUserLogin {
  email?: string;
  password?: string;
}
