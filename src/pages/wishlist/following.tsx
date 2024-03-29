import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";
import Link from "next/link";
import { useAxios } from "@/hooks/useAxios";
import WishlistCard from "@/components/ui/item/WishListCard";

function FollowingWishlistPage() {
  const authCtx: any = useContext(AuthContext);

  let url =
    process.env.BASE_URL +
    `wishlist/get-followed-wishlist?id=${authCtx.user["ID"]}`;

  const [loading, success, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
    }
  }, [authCtx.user["ID"]]);

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          {success &&
            success.map((item: any) => {
              return (
                <WishlistCard
                  key={item.ID}
                  removefollow
                  {...item}
                  reload={request}
                />
              );
            })}
        </div>
        <div className={style.right}>
          <h2 style={{ paddingBottom: "10px" }}>Followed WishList</h2>
          <Link href="/user/wishlist">My Wishlist</Link>
          <Link href="/wishlist/public">Public Wishlist</Link>
        </div>
      </main>
    </Layout>
  );
}

export default FollowingWishlistPage;
