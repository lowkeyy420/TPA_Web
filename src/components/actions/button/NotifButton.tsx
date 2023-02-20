import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/Button.module.scss";

function NotifButton() {
  return (
    <div className={style.notificationBtn}>
      <FontAwesomeIcon icon={faBell} className={style.icon} />
    </div>
  );
}

export default NotifButton;
