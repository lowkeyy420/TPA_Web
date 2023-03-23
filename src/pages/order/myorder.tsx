import Layout from "@/components/layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/Authcontext";
import OrderShop from "@/components/ui/OrderShop";
import OrdersUser from "@/components/ui/OrdersUser";

function MyOrderPage() {
  const authCtx: any = useContext(AuthContext);

  return (
    <Layout>
      {authCtx && authCtx.user["RoleID"] === 2 && <OrderShop />}
      {authCtx && authCtx.user["RoleID"] === 1 && <OrdersUser />}
    </Layout>
  );
}

export default MyOrderPage;
