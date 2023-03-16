import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/Button.module.scss";

interface Myprops {
  name?: string;
  email?: boolean;
  foo?: any;
}

function SendAlertButton(props: Myprops) {
  function clickHandler() {
    props.foo();
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
