import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Action.module.scss";

function SelectAddress() {
  return (
    <div className={style.address_selector}>
      <div className={style.address_left}>
        <FontAwesomeIcon icon={faLocationDot} className={style.icon} />
      </div>
      <div className={style.address_right}>
        <div className={style.address_rtop}>
          <p>Hello</p>
        </div>
        <div className={style.address_rbottom}>
          <p>Select Address</p>
        </div>
      </div>
    </div>
  );
}

export default SelectAddress;
