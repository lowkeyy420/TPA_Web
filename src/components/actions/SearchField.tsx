import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import style from "../styles/Input.module.scss";

function SearchField() {
  return (
    <div className={style.searchfield_container}>
      <input type="text" className={style.searchfield_textinput} />
      <button className={style.searchfieldBtn}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
      </button>
    </div>
  );
}

export default SearchField;
