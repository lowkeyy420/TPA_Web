import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CartButton from "../actions/button/CartButton";
import CountryButton from "../actions/button/CountryButton";
import NotifButton from "../actions/button/NotifButton";
import ReturnOrderButton from "../actions/button/ReturnOrderButton";
import SupportButton from "../actions/button/SupportButton";
import HamburgerToggle from "../actions/HamburgerToggle";
import NavbarLink from "../actions/NavbarLink";
import SearchField from "../actions/SearchField";
import SelectAddress from "../actions/SelectAddress";
import ThemeToggle from "../actions/ThemeToggle";
import SliderNavbar from "../ui/SliderNavbar";

import style from "../styles/Navbar.module.scss";
import btn from "../styles/Button.module.scss";
import {
  faCommentAlt,
  faCircleQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logoNav from "../../assets/logoNav.png";
import { useContext } from "react";
import AuthContext from "@/store/Authcontext";

function Logo() {
  return (
    <Link href="/">
      <div className={style.logo}>
        <Image src={logoNav} alt="" className={style.image} height="50"></Image>
      </div>
    </Link>
  );
}

function LoginRegisterButton() {
  const authCtx: any = useContext(AuthContext);
  let username = "Sign In / Register";
  authCtx.isLoggedIn ? (username = "usr") : (username = "Sign In / Register");

  return (
    <Link href="/auth/login">
      <div className={style.loginBtn}>
        <div className={style.loginBtn_left}>
          <FontAwesomeIcon icon={faUser} className={style.loginBtn_icon} />
        </div>
        <div className={style.loginBtn_right}>
          <div className={style.loginBtn_top}>
            <p>Welcome</p>
          </div>
          <div className={style.loginBtn_bottom}>{username}</div>
        </div>
      </div>
    </Link>
  );
}

const FeedBackButton = () => {
  return (
    <div className={btn.nav_childsupportBtn}>
      {/* <FontAwesomeIcon icon="comment-alt-smile" /> */}
      <FontAwesomeIcon icon={faCommentAlt} className={btn.icon} />
      FEEDBACK
    </div>
  );
};

const HelpCenterButton = () => {
  return (
    <div className={btn.nav_childsupportBtn}>
      <FontAwesomeIcon icon={faCircleQuestion} className={btn.icon} />
      HELP CENTER
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className={style.navbar_container}>
      <div className={style.nav_top}>
        <HamburgerToggle />
        <Logo />
        <SelectAddress />
        <SearchField />
        <NotifButton />
        <CountryButton />
        <ThemeToggle />
        <LoginRegisterButton />
        <ReturnOrderButton />
        <CartButton />
      </div>

      <div className={style.nav_bottom}>
        <SliderNavbar>
          <NavbarLink text="Today's Best Deals" variant="normal" />
          <NavbarLink text="Best Sellers" variant="normal" />
          <NavbarLink text="RTX3090TI/3090 Laptops" variant="normal" />
          <NavbarLink text="MSI Gaming Router" variant="normal" />
          <NavbarLink text="Presidents Day TV Deals" variant="red" />
          <NavbarLink text="Gift Idea" variant="red" />
          <NavbarLink text="PC Builder" variant="normal" />
          <NavbarLink text="VR" variant="normal" />
          <NavbarLink text="Newegg Creator" variant="normal" />
        </SliderNavbar>

        <div className={style.nav_bottom_right}>
          <NavbarLink variant="business" />
          <SupportButton element={<FeedBackButton />} />
          <SupportButton element={<HelpCenterButton />} />
        </div>
      </div>
    </nav>
  );
}
