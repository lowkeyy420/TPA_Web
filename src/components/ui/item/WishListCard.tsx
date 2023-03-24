import React, { useState } from "react";

import style from "../../styles/UI.module.scss";

type MyProps = any;

function WishlistCard(props: MyProps) {
  return (
    <div className={style.user_container}>
      <p>Name : {props.Name}</p>
      <p>Privacy : {props.IsPublic ? "Public" : "Private"}</p>
      <p>Description : {props.Description} </p>
      <p>Subscribed : {props.SubscribeToEmail ? "True" : "False"}</p>
    </div>
  );
}

export default WishlistCard;
