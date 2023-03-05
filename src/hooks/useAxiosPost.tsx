import { ICurrUser } from "@/interfaces/IUserData";
import AuthContext from "@/store/Authcontext";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useEffect, useRef, useState } from "react";

//config example {method: 'POST', url : 'http://localhost:3000/users'}

//generic type T to define what data i want to returned , ex : type User { name : name , email : email, password : password}
export const useAxiosPost = <T,>(
  config: AxiosRequestConfig<any>,
  type: string
): [boolean, any, string, (data: T) => void] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState("");
  const token = useRef<string | null>("");

  const authCtx: any = useContext(AuthContext);

  useEffect(() => {
    token.current = `bearer ${localStorage.getItem("token")}`;
  }, []);

  const request = (data: T) => {
    sendRequest(data);
  };

  const sendRequest = (data: T) => {
    setLoading(true);
    setResponse("");
    setError("");

    const header = {
      header: { Authorization: token.current },
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

          const user: ICurrUser = {
            ID: res.data.user["ID"],
            Email: res.data.user["Email"],
            First_name: res.data.user["First_name"],
            Last_name: res.data.user["Last_name"],
            Phone: res.data.user["Phone"],
            RoleID: res.data.user["RoleID"],
            Status: res.data.user["Status"],
            Country: res.data.user["Country"],
            Balance: res.data.user["Balance"],
          };

          authCtx.login(token, expirationTime, user);
        }
        console.log(res.data);
      })
      .catch((error: unknown | any | string) => {
        // console.log(error);

        const msg: string | unknown = error.response?.data["error"];
        setError(msg ? msg : "Error occured");
      })
      .finally(() => setLoading(false));
  };

  return [loading, response, error, request];
};
