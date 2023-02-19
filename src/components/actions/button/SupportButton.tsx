import { ReactElement } from "react";
import styles from "../../styles/Action.module.scss";

interface MyProps {
  element: ReactElement;
}

function SupportButton({ element }: MyProps) {
  return <div className={styles.navbar_supportBtn}>{element}</div>;
}

export default SupportButton;
