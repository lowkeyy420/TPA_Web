import AuthContext from "@/store/Authcontext";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useState } from "react";

//config example {method: 'POST', url : 'http://localhost:3000/users'}

//generic type T to define what data i want to returned , ex : type User { name : name , email : email, password : password}
export const useAxiosPost = <T,>(
  config: AxiosRequestConfig<any>,
  type: string
): [boolean, any, string, (data: T) => void] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState("");
  const authCtx: any = useContext(AuthContext);

  const request = (data: T) => {
    sendRequest(data);
  };

  const sendRequest = (data: T) => {
    setLoading(true);

    const payload = {
      ...config,
      data: { ...data },
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
          authCtx.login(token, expirationTime);
        }
      })
      .catch((error: unknown | any | string) => {
        const msg: string | unknown = error.response?.data["error"];
        setError(msg ? msg : "Error occured");
      })
      .finally(() => setLoading(false));
  };

  return [loading, response, error, request];
};
