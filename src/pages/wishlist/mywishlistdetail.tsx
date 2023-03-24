import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";
import Link from "next/link";
import { useAxios } from "@/hooks/useAxios";
import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Wishlist from "@/components/ui/item/Wishlist";
import Product from "@/components/ui/item/Product";

function MyWishlistDetailsPage() {
  const authCtx: any = useContext(AuthContext);

  let url2 =
    process.env.BASE_URL +
    `wishlist/get-wishlist-products?id=${authCtx.user["ID"]}`;

  const [loading, success, error, request] = useAxios({
    method: "GET",
    url: url2,
  });

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          {success &&
            success.map((item: any) => {
              return (
                <>
                  <Wishlist
                    key={item.Wishlist.ID}
                    data={item.Wishlist}
                    reload={request}
                  />
                  {item.Products &&
                    item.Products.map((product: any) => {
                      <Product {...product} />;
                    })}
                </>
              );
            })}
        </div>
        <div className={style.right}>
          <h2 style={{ paddingBottom: "10px" }}>My Wishlist</h2>
          <Link href="/wishlist/public">Public Wishlist</Link>
          <Link href="/wishlist/following">Followed Wishlist</Link>
        </div>
      </main>
    </Layout>
  );
}

export default MyWishlistDetailsPage;
