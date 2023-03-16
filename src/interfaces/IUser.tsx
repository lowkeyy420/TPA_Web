//signup
export interface IUserData {
  First_name?: string;
  Last_name?: string;
  Email?: string;
  Phone?: string;
  Password?: string;
  SubscribeToEmail?: boolean;
}

//signin
export interface IUserLogin {
  Email?: string;
  Password?: string;
}

//current user
export interface ICurrUser {
  ID: number;
  Email: string;
  Name?: string;
  First_name?: string;
  Last_name?: string;
  Phone?: string;
  RoleID: number;
  Status: string;
  SubscribeToEmail?: boolean;
  Balance?: number;
}
