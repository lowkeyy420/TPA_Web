import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import style from "../../styles/Button.module.scss";

function BalanceVoucherButton(props: any) {
  return (
    <Link href="/user/voucher" className={style.balanceBtn}>
      <FontAwesomeIcon icon={faCoins} height={20} />
      {props.balance}
    </Link>
  );
}

export default BalanceVoucherButton;
