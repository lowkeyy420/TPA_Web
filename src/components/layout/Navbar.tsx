import Link from "next/link";

import style from "../styles/Navbar.module.scss";
import SliderNavbar from "../ui/SliderNavbar";

export default function Navbar() {
  return (
    <nav>
      <div className={style.nav_top}>
        <div>Hamburger</div>
        <div className="div">
          <Link href="/">logo</Link>
        </div>
        <div className="div">address</div>
        <div className="div">searchbar</div>
        <div className="div">notif</div>
        <div className="div">country</div>
        <div className="div">theme</div>
        <div className="div">
          <Link href="/auth/login">login/register</Link>
        </div>
        <div className="div">return & order</div>
        <div className="div">cart</div>
      </div>
      <div className={style.nav_bottom}>
        <SliderNavbar>
          <div>text1</div>
        </SliderNavbar>
        <div className={style.nav_bottom_right}>
          <div className="div">business</div>
          <div className="div">feedback</div>
          <div className="div">help center</div>
        </div>
      </div>
    </nav>
  );
}
