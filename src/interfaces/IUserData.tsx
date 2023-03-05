export interface IUserData {
  First_name?: string;
  Last_name?: string;
  Email?: string;
  Phone?: string;
  Password?: string;
  SubscribeToEmail?: boolean;
}

export interface IUserLogin {
  Email?: string;
  Password?: string;
}

export interface ICurrUser {
  ID: number;
  Email: string;
  First_name: string;
  Last_name: string;
  Phone: string;
  RoleID: number;
  Status: string;
  Country: string;
  Balance: number;
}
