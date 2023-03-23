import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Action.module.scss";
import { useAxios } from "@/hooks/useAxios";

function SelectAddress(props: any) {
  let url = process.env.BASE_URL + `get-address?email=${props.email}`;

  const [loading, address, failed, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div className={style.address_selector}>
      <div className={style.address_left}>
        <FontAwesomeIcon icon={faLocationDot} className={style.icon} />
      </div>
      <div className={style.address_right}>
        <div className={style.address_rtop}>
          <p>Hello</p>
        </div>
        <div className={style.address_rbottom}>
          <p>
            {!address && props.country === "en" && "Select Address"}
            {!address && props.country === "id" && "Pilih Alamat"}
            {address && address.data.Address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectAddress;
