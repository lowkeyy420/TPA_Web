import React from "react";
import style from "../../styles/Button.module.scss";
import { useRouter } from "next/router";

function ReturnOrderButton(props: any) {
  const router = useRouter();

  function redirectHandler() {
    if (props.userid) {
      router.push("/order/myorder");
    }
  }

  return (
    <div className={style.returnOrderBtn} onClick={redirectHandler}>
      <div className={style.returnOrderBtn_top}>
        <p>{props.country === "en" ? "Returns" : "Pengembalian"}</p>
      </div>
      <div className={style.returnOrderBtn_bottom}>
        <p>{props.country === "en" ? "& Orders" : "& Pesanan"}</p>
      </div>
    </div>
  );
}

export default ReturnOrderButton;
