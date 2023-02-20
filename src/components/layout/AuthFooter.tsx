import Link from "next/link";
import React from "react";
import style from "../styles/Footer.module.scss";

function AuthFooter() {
  return (
    <footer className={style.auth_footer}>
      <div className={style.terms}>
        <Link className={style.link} href="">
          Terms & Conditions
        </Link>
        {" | "}
        <Link className={style.link} href="">
          Privacy Policy
        </Link>
      </div>
      <p className={style.copyright}>
        © 2000-2023 Newegg Inc. All rights reserved.
      </p>
    </footer>
  );
}

export default AuthFooter;
