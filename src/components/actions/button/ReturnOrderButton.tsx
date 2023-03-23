import React from "react";
import style from "../../styles/Button.module.scss";

function ReturnOrderButton(props: any) {
  return (
    <div className={style.returnOrderBtn}>
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
