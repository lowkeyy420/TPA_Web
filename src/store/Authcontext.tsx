import React, { ProviderProps, useEffect, useState } from "react";

let logoutTimer: any;

const AuthContext: any = React.createContext({
  token: "",
  isLoggedIn: false,
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

type MyProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: MyProps) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  // if token is empty return false else true
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (tkn: string, expirationTime: any) => {
    setToken(tkn);
    localStorage.setItem("token", tkn);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //set timer kalau ada
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
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
