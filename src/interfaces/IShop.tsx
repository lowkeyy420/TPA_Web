//signup
export interface IShopData {
  Name: string;
  Email?: string;
  Password?: string;
  Description: string;
  Image: string;
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
  Name?: string;
  RoleID: number;
  Status: string;
  Description?: string;
  Image?: string;
}
