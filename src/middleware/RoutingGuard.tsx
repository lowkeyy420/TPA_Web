import AuthContext from "@/store/Authcontext";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

type MyProps = {
  children?: any;
};

function RoutingGuard(props: MyProps) {
  const authCtx: any = useContext(AuthContext);
  const isLogged = authCtx.isLoggedIn;

  const router = useRouter();
  let unProtectedRoutes = ["/auth/login", "/auth/register", "/"];

  useEffect(() => {
    let pathIsProtected = unProtectedRoutes.indexOf(router.pathname) === -1;

    if (!isLogged && pathIsProtected) {
      router.push("/auth/login");
    } else if (isLogged && router.pathname === "/auth/login") {
      router.push("/");
    }
  }, [router.pathname, isLogged]);

  return props.children;
}

export default RoutingGuard;
