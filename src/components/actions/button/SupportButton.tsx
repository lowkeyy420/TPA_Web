import { ReactElement } from "react";
import style from "../../styles/Button.module.scss";

interface MyProps {
  element: ReactElement;
}

function SupportButton({ element }: MyProps) {
  return <div className={style.navbar_supportBtn}>{element}</div>;
}

export default SupportButton;
