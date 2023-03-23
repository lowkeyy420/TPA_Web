import React from "react";
import style from "../styles/Action.module.scss";

interface MyProps {
  text: string;
}

function HomeHeader({ text }: MyProps) {
  return (
    <div className={style.home_header}>
      <h2>{text}</h2>
    </div>
  );
}

export default HomeHeader;
