import { ICurrShop } from "@/interfaces/IShop";
import { ICurrUser } from "@/interfaces/IUser";
import AuthContext from "@/store/Authcontext";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useEffect, useRef, useState } from "react";

//config example {method: 'POST', url : 'http://localhost:3000/users'}

//generic type T to define what data i want to returned , ex : type User { name : name , email : email, password : password}
export const useAxiosPost = <T,>(
  config: AxiosRequestConfig<any>,
  type?: string
): [boolean, any, string, (data: T) => void] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState("");
  const token = useRef<string | null>("");

  const authCtx: any = useContext(AuthContext);

  useEffect(() => {
    token.current = `Bearer ${localStorage.getItem("token")}`;
  }, []);

  const request = (data: T) => {
    sendRequest(data);
  };

  const sendRequest = (data: T) => {
    setLoading(true);
    setResponse("");
    setError("");

    const header = {
      headers: { Authorization: token.current },
    };

    const payload = {
      ...config,
      data: { ...data },
      ...header,
    };

    axios(payload)
      .then((res) => {
        setError("");
        setResponse(res.data);
        if (type === "login") {
          const token = res.data.token;
          const expirationTime = new Date(
            new Date().getTime() + res.data.expiresin * 100
          );

          if (res.data.user["RoleID"] === 2) {
            const user: ICurrShop = {
              ID: res.data.user["ID"],
              Email: res.data.user["Email"],
              Name: res.data.user["Name"],
              RoleID: res.data.user["RoleID"],
              Status: res.data.user["Status"],
              Description: res.data.user["Description"],
              Image: res.data.user["Image"],
            };
            authCtx.login(token, expirationTime, user);
          } else {
            const user: ICurrUser = {
              ID: res.data.user["ID"],
              Email: res.data.user["Email"],
              Name:
                res.data.user["First_name"] + " " + res.data.user["Last_name"],
              First_name: res.data.user["First_name"],
              Last_name: res.data.user["Last_name"],
              Phone: res.data.user["Phone"],
              RoleID: res.data.user["RoleID"],
              Status: res.data.user["Status"],
              SubscribeToEmail: res.data.user["SubscribeToEmail"],
              Balance: res.data.user["Balance"],
            };

            authCtx.login(token, expirationTime, user);
          }
        }
      })
      .catch((error: unknown | any | string) => {
        // console.log(error);

        const msg: string | unknown = error.response.data.error;
        setError(msg ? msg : "Error occured");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return [loading, response, error, request];
};
