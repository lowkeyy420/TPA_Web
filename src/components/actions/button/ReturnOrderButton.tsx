import React from "react";
import style from "../../styles/Button.module.scss";

function ReturnOrderButton() {
  return (
    <div className={style.returnOrderBtn}>
      <div className={style.returnOrderBtn_top}>
        <p>Returns</p>
      </div>
      <div className={style.returnOrderBtn_bottom}>
        <p>& Orders</p>
      </div>
    </div>
  );
}

export default ReturnOrderButton;
