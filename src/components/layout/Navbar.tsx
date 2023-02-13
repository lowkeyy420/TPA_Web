import Link from "next/link";

import style from "../styles/Navbar.module.scss";

export default function Navbar() {
  return (
    <nav>
      <div className={style.nav_top}>
        <Link href="/auth/login">LOGIN</Link>
      </div>
      <div className={style.nav_bottom}>
        <Link href="/auth/register">REGISTER</Link>
      </div>
    </nav>
  );
}
