import style from "../../styles/Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt, faSignIn } from "@fortawesome/free-solid-svg-icons";

interface MyProps {
  mode?: string;
  text?: string;
  height?: string | number;
  width?: string | number;
}

function LoginTypeButton({ mode, text, height, width }: MyProps) {
  return (
    <button type="button" className={style.authBtn_login}>
      {mode && (
        <FontAwesomeIcon
          icon={mode === "APPLE" ? faAppleAlt : faSignIn}
          className={style.icon}
        />
      )}
      {!!!text && <p>LOGIN WITH {mode}</p>}
      {text && <p>{text}</p>}
    </button>
  );
}

export default LoginTypeButton;
