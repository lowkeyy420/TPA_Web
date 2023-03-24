import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";
import Link from "next/link";
import { useAxios } from "@/hooks/useAxios";
import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Wishlist from "@/components/ui/item/Wishlist";

function MyWishlistPage() {
  const authCtx: any = useContext(AuthContext);

  let url =
    process.env.BASE_URL + `wishlist/get-wishlist?id=${authCtx.user["ID"]}`;

  let url2 = process.env.BASE_URL + `wishlist/add-wishlist`;

  const [loading, success, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [addloading, addsuccess, adderror, addrequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
    }
  }, [authCtx.user["ID"]]);

  useEffect(() => {
    if (!addloading) {
      if (addsuccess) {
        alert(addsuccess.message);
        request();
      }
      if (adderror) {
        alert(adderror);
      }
    }
  }, [addloading]);

  function addHandler() {}

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          {success &&
            success.map((item: any) => {
              return <Wishlist key={item.ID} data={item} reload={request} />;
            })}
        </div>
        <div className={style.right}>
          <h2 style={{ paddingBottom: "10px" }}>Public WishList</h2>
          <Link href="/user/wishlist">My Wishlist</Link>
          <Link href="/wishlist/following">Followed Wishlist</Link>
        </div>
      </main>
    </Layout>
  );
}

export default MyWishlistPage;
