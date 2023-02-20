import React from "react";
import style from "../styles/Action.module.scss";

function HamburgerToggle() {
  return (
    <div className={style.hamburger_menu}>
      <span className={style.line}></span>
      <span className={style.line}></span>
      <span className={style.line}></span>
    </div>
  );
}

export default HamburgerToggle;
