import React, { useContext, useEffect, useState } from "react";

import style from "../../styles/UI.module.scss";
import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import AuthContext from "@/store/Authcontext";
import Link from "next/link";

type MyProps = any;

function WishlistCard(props: MyProps) {
  let url = process.env.BASE_URL + `wishlist/follow`;
  let url2 = process.env.BASE_URL + `wishlist/unfollow`;

  const authCtx: any = useContext(AuthContext);

  const [followloading, followsuccess, followerror, followrequest] =
    useAxiosPost({
      method: "POST",
      url: url,
    });

  const [unfollowloading, unfollowsuccess, unfollowerror, unfollowrequest] =
    useAxiosPost({
      method: "POST",
      url: url2,
    });

  useEffect(() => {
    if (!followloading) {
      if (followsuccess) {
        alert(followsuccess.message);
      }
      if (followerror) {
        alert(followerror);
      }
    }
  }, [followloading]);

  useEffect(() => {
    if (!unfollowloading) {
      if (unfollowsuccess) {
        alert(unfollowsuccess.message);
        props.reload();
      }
      if (unfollowerror) {
        alert(unfollowerror);
      }
    }
  }, [unfollowloading]);

  function followWishlist() {
    const userid = authCtx.user["ID"];
    followrequest({
      UserID: userid,
      WishlistID: props.ID,
    });
  }

  function unfollowWishlist() {
    const userid = authCtx.user["ID"];
    unfollowrequest({
      UserID: userid,
      WishlistID: props.ID,
    });
  }

  return (
    <div className={style.user_container}>
      <Link href={`/wishlist/detail/${props.ID}`}>Name : {props.Name}</Link>
      <p>Privacy : {props.IsPublic ? "Public" : "Private"}</p>
      <p>Description : {props.Description} </p>
      <p>Public : {props.IsPublic ? "True" : "False"}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        {props.follow && (
          <ActionButton text="Follow" onClick={followWishlist} />
        )}
        {props.removefollow && (
          <ActionButton text="Unfollow" onClick={unfollowWishlist} />
        )}
      </div>
    </div>
  );
}

export default WishlistCard;
