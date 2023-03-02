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
