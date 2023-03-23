import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "../../styles/Button.module.scss";

function BalanceVoucherButton(props: any) {
  return (
    <div className={style.balanceBtn}>
      <FontAwesomeIcon icon={faCoins} height={20} />
      {props.balance}
    </div>
  );
}

export default BalanceVoucherButton;
