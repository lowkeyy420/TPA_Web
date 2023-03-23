import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import style from "../../styles/Button.module.scss";
import AuthContext from "@/store/Authcontext";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useAxios } from "@/hooks/useAxios";

function CartButton() {
  const authCtx: any = useContext(AuthContext);
  const router = useRouter();

  const url = process.env.BASE_URL + `get-cart?id=${authCtx.user["ID"]}`;
  const [loading, price, error, request] = useAxios(
    {
      method: "GET",
      url: url,
    },
    false
  );

  useEffect(() => {
    request();
  }, [authCtx.user]);

  function redirectCart() {
    if (authCtx.user["ID"]) {
      router.push("/user/cart");
    }
  }

  return (
    <div className={style.cartBtn} onClick={redirectCart}>
      <FontAwesomeIcon icon={faCartShopping} className={style.icon} />
      <p className={style.price}>{price && price}</p>
    </div>
  );
}

export default CartButton;
