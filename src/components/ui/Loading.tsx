import React from "react";
import style from "../styles/Loading.module.scss";

function Loading() {
  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <div className={style.loader}></div>
        <div className={style.modal_text}>Loading...</div>
      </div>
    </div>
  );
}

export default Loading;
