import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/ui/item/CartItem";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";

function MyWishlistPage() {
  const authCtx: any = useContext(AuthContext);

  return (
    <Layout>
      <main className={style.wishlish_container}></main>
    </Layout>
  );
}

export default MyWishlistPage;
