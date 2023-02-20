import React, { useEffect, useState } from "react";
import style from "../styles/Action.module.scss";

function ThemeToggle() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    theme === "dark" ? setChecked(true) : setChecked(false);
    theme === "dark"
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const themeToggleHandler = () => {
    checked
      ? document.documentElement.setAttribute("data-theme", "light")
      : document.documentElement.setAttribute("data-theme", "dark");
    checked
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");

    setChecked(!checked);
  };

  return (
    <div className={style.themeToggle}>
      <input type="checkbox" onChange={themeToggleHandler} checked={checked} />
      <span className={style.themeToggle_background_slider}></span>
    </div>
  );
}

export default ThemeToggle;
