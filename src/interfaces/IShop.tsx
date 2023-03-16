//signup
export interface IShopData {
  Name?: string;
  Email?: string;
  Phone?: string;
  Password?: string;
  SubscribeToEmail?: boolean;
}

//signin
export interface IShopLogin {
  Email?: string;
  Password?: string;
}

//current shop
export interface ICurrShop {
  ID: number;
  Email: string;
  First_name: string;
  Last_name: string;
  Phone: string;
  RoleID: number;
  Status: string;
  Country: string;
  SubscribeToEmail: boolean;
  Balance: number;
}
