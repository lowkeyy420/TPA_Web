import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

//config example {method: 'GET', url : 'http://localhost:3000/users'}

//generic type T to define what data i want to returned , ex : type User { name : name , email : email, password : password}
export const useAxios = <T,>(
  config: AxiosRequestConfig<any>,
  loadOnStart: boolean = true
): [boolean, T | undefined, string, () => void] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setLoading(false);
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setLoading(true);

    axios(config)
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
