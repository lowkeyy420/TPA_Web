import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/Button.module.scss";
import React from "react";
import { faCircleChevronUp, faPlus } from "@fortawesome/free-solid-svg-icons";

interface MyProps {
  add?: boolean;
  update?: boolean;
  text?: string;
  onClick?: any;
}

function ActionButton({ add, update, onClick, text }: MyProps) {
  if (add) {
    return (
      <button onClick={onClick} className={style.alertBtn}>
        <FontAwesomeIcon icon={faPlus} className={style.icon} />
        {text && <p>{text}</p>}
      </button>
    );
  }

  if (update) {
    return (
      <button onClick={onClick} className={style.alertBtn}>
        <FontAwesomeIcon icon={faCircleChevronUp} className={style.icon} />
        {text && <p>{text}</p>}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={style.alertBtn}>
      {text ? <p>{text}</p> : <p>Edit My Property</p>}
    </button>
  );
}

export default ActionButton;
