import React from "react";
import style from "../styles/Loading.module.scss";

function Banned() {
  return (
    <div className={style.modalBan}>
      <div className={style.modal_content}>
        <div className={style.modal_text} style={{ color: "red" }}>
          This Shop Is Banned !!!
        </div>
      </div>
    </div>
  );
}

export default Banned;
