import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";

//config example {method: 'GET', url : 'http://localhost:3000/users'}

//generic type T to define what data i want to returned , ex : type User { name : name , email : email, password : password}
export const useAxios = <T,>(
  config: AxiosRequestConfig<any>,
  loadOnStart: boolean = true
): [boolean, T | undefined | any, string, () => void] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const token = useRef<string | null>("");

  useEffect(() => {
    token.current = `bearer ${localStorage.getItem("token")}`;
    if (loadOnStart) sendRequest(token.current);
    else setLoading(false);
  }, []);

  const request = () => {
    sendRequest(token.current);
  };

  const sendRequest = (tkn: any) => {
    const header = {
      Authorization: tkn,
    };
    const payload = {
      ...config,
      headers: {
        ...header,
      },
    };

    setLoading(true);

    axios(payload)
      .then((res) => {
        setError("");
        setData(res.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return [loading, data, error, request];
};
