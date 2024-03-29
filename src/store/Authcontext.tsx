import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ICurrUser } from "@/interfaces/IUser";
import { ICurrShop } from "@/interfaces/IShop";

let logoutTimer: any;

const AuthContext: any = React.createContext({
  token: "",
  isLoggedIn: false,
  user: [],
  login: (token: string, expiration: any) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: any) => {
  //get time in mili second with new date
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjustedExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  let storedToken;
  let storedExpirationDate;

  if (typeof window !== "undefined") {
    storedToken = localStorage.getItem("token");
    storedExpirationDate = localStorage.getItem("expirationTime");
  }

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const GetUser = (token: string | any, setuser: any, isLoggedIn: any) => {
  const url = process.env.BASE_URL + "getuser";

  const header = {
    headers: { Authorization: token },
  };

  const config = {
    method: "POST",
    url: url,
  };

  const payload = {
    ...config,
    ...header,
  };

  axios(payload)
    .then((res) => {
      if (res.data["RoleID"] == 2) {
        setuser(res.data);
      } else {
        const user = {
          ...res.data,
          Name: res.data["First_name"] + " " + res.data["Last_name"],
        };

        setuser(user);
        isLoggedIn = true;
      }
    })
    .catch((error) => {});
};

type MyProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: MyProps) => {
  const router = useRouter();
  let tokenData: any;
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState<any>([]);

  // if token is empty return false else true
  let userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser([]);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (
    tkn: string,
    expirationTime: any,
    user: ICurrUser | ICurrShop
  ) => {
    setToken(tkn);
    localStorage.setItem("token", tkn);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    setUser(user);

    logoutTimer = setTimeout(logoutHandler, remainingTime);

    if (user.RoleID === 4) {
      router.push("/admin");
    } else if (user.RoleID === 2) {
      router.push("/shop/myshop");
    } else {
      router.push("/");
    }
  };

  //set timer kalau ada
  useEffect(() => {
    tokenData = retrieveStoredToken();

    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      if (user && user.length < 1) {
        GetUser("bearer " + tokenData.token, setUser, userIsLoggedIn);
      }
    }
  }, [tokenData]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    user: user,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
