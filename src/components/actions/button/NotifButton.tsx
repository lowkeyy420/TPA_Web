import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/Action.module.scss";
import btn from "../../styles/Button.module.scss";
import { useAxios } from "@/hooks/useAxios";

function NotifButton(props: any) {
  let url = process.env.BASE_URL + `get-notification?id=${props.id}`;

  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [loading, notifications, failed, request] = useAxios(
    {
      method: "GET",
      url: url,
    },
    false
  );

  function showNotificationHandler() {
    setNotificationIsOpen(!notificationIsOpen);
    request();
  }

  return (
    <div className={btn.notificationBtn} onClick={showNotificationHandler}>
      <FontAwesomeIcon icon={faBell} className={btn.icon} />
      {notificationIsOpen && notifications && (
        <div className={style.notification_popup}>
          {notifications.data.map((item: any) => (
            <p key={item.ID}>{item.Content}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotifButton;
