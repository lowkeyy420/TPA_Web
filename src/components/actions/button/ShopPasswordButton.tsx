import React from "react";
import style from "../../styles/Button.module.scss";

interface MyProps {
  id: number;
}

function ShopPasswordButton({ id }: MyProps) {
  return <button className={style.shop_actionBtn}>Change Password</button>;
}

export default ShopPasswordButton;
