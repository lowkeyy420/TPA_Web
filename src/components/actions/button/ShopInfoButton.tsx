import React from "react";
import style from "../../styles/Button.module.scss";

interface MyProps {
  id: number;
}

function ShopInfoButton({ id }: MyProps) {
  return <button className={style.shop_actionBtn}>Change Information</button>;
}

export default ShopInfoButton;
