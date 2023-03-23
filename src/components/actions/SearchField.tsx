import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import style from "../styles/Input.module.scss";

interface MyProps {
  search?: boolean;
  setSearch?: any;
  reload?: any;
}

function SearchField({ search, setSearch, reload }: MyProps) {
  return (
    <div className={style.searchfield_container}>
      {search && (
        <input
          type="text"
          className={style.searchfield_textinput}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      )}

      {!search && <input type="text" className={style.searchfield_textinput} />}

      <button className={style.searchfieldBtn}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
      </button>
    </div>
  );
}

export default SearchField;
