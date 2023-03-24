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

  const nameInputRef = useRef<any>("");
  const privacyInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<any>("");

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

  function addHandler() {
    const UserID = authCtx.user["ID"];
    const Name = nameInputRef.current.value;
    const IsPublic = privacyInputRef.current?.checked;
    const Description = descriptionInputRef.current.value;

    addrequest({
      UserID: UserID,
      Name: Name,
      IsPublic: IsPublic,
      Description: Description,
    });
  }

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "var(--tertiary-color-dark)",
              color: "var(--text-color)",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <h3>New WishList</h3>
            <input type="text" placeholder="Name" ref={nameInputRef} />
            <div>
              <p style={{ textAlign: "center" }}>Privacy</p>
              <label htmlFor="private">Private</label>
              <input
                type="radio"
                placeholder="Private"
                id="private"
                name="privacy"
                defaultChecked
                style={{ marginLeft: "5px" }}
                ref={privacyInputRef}
              />
              <label htmlFor="public">Public</label>
              <input
                id="public"
                type="radio"
                placeholder="Public"
                name="privacy"
                style={{ marginLeft: "5px" }}
                ref={privacyInputRef}
              />
            </div>
            <input
              type="text"
              placeholder="Description"
              ref={descriptionInputRef}
            />
            <ActionButton text="Create" onClick={addHandler} />
          </div>

          {success &&
            success.map((item: any) => {
              return <Wishlist key={item.ID} data={item} reload={request} />;
            })}
        </div>
        <div className={style.right}>
          <h2 style={{ paddingBottom: "10px" }}>Followed Wishlist</h2>
          <Link href="/wishlist/public">Public Wishlist</Link>
          <Link href="/user/wishlist">My Wishlist</Link>
        </div>
      </main>
    </Layout>
  );
}

export default MyWishlistPage;
