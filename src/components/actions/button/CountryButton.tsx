import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/Button.module.scss";
import ReactCountryFlag from "react-country-flag";

function CountryButton() {
  return (
    <div className={style.countryBtn}>
      {/* <FontAwesomeIcon icon={faFlagUsa} className={style.icon} /> */}
      <ReactCountryFlag
        countryCode="US"
        svg
        style={{
          width: "1em",
          height: "1em",
        }}
        title="Select Country"
      />
    </div>
  );
}

export default CountryButton;
