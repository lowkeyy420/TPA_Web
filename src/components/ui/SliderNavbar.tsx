import React from "react";
import style from "../styles/SliderNavbar.module.css";

type MyProps = {
  children: React.ReactNode;
};

function SliderNavbar(props: MyProps) {
  return <div className={style.slider_nav_container}>{props.children}</div>;
}

export default SliderNavbar;
