import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/Button.module.scss";

interface Myprops {
  name?: string;
  email?: boolean;
  onClick?: any;
}

function SendAlertButton(props: Myprops) {
  function clickHandler() {
    props.onClick();
  }

  return (
    <button onClick={clickHandler} className={style.alertBtn}>
      {props.email && (
        <FontAwesomeIcon className={style.icon} icon={faMailBulk} />
      )}
      {props.name}
    </button>
  );
}

export default SendAlertButton;
