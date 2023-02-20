import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "../../styles/Button.module.scss";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function CartButton() {
  return (
    <div className={style.cartBtn}>
      <FontAwesomeIcon icon={faCartShopping} className={style.icon} />
    </div>
  );
}

export default CartButton;
