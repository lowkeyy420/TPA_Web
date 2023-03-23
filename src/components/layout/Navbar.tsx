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

import { useContext, useState } from "react";
import AuthContext from "@/store/Authcontext";
import Logo from "../ui/Logo";
import RoleOnlyButton from "../actions/button/RoleOnlyButton";
import BalanceVoucherButton from "../actions/button/BalanceVoucherButton";

function LoginRegisterButton(props: any) {
  return (
    <Link href={props.user["ID"] ? "/user/account" : "/auth/login"}>
      <div className={style.loginBtn}>
        <div className={style.loginBtn_left}>
          <FontAwesomeIcon icon={faUser} className={style.loginBtn_icon} />
        </div>
        <div className={style.loginBtn_right}>
          <div className={style.loginBtn_top}>
            <p>{props.country === "en" ? "Welcome" : "Selamat Datang"}</p>
          </div>
          <div className={style.loginBtn_bottom}>
            {props.Name
              ? props.Name
              : props.country === "en"
              ? "Sign In / Register"
              : "Masuk / Daftar"}
          </div>
        </div>
      </div>
    </Link>
  );
}

const FeedBackButton = (props: any) => {
  return (
    <div className={btn.nav_childsupportBtn}>
      <FontAwesomeIcon icon={faCommentAlt} className={btn.icon} />
      <p>{props.country === "en" ? "FEEDBACK" : "MASUKAN"}</p>
    </div>
  );
};

const HelpCenterButton = (props: any) => {
  return (
    <div className={btn.nav_childsupportBtn}>
      <FontAwesomeIcon icon={faCircleQuestion} className={btn.icon} />
      <p>{props.country === "en" ? "HELP CENTER" : "PUSAT BANTUAN"}</p>
    </div>
  );
};

export default function Navbar() {
  const authCtx: any = useContext(AuthContext);
  const [lang, setLang] = useState("en");

  function toggleLanguageHandler() {
    setLang(lang === "en" ? "id" : "en");
  }

  return (
    <nav className={style.navbar_container}>
      <div className={style.nav_top}>
        <HamburgerToggle />
        <Logo height={50} />
        <SelectAddress country={lang} email={authCtx.user["Email"]} />
        <SearchField />
        <NotifButton id={authCtx.user["ID"]} />
        <CountryButton onClick={toggleLanguageHandler} country={lang} />
        <ThemeToggle />
        {authCtx.user["RoleID"] > 1 && (
          <RoleOnlyButton roleid={authCtx.user["RoleID"]} />
        )}
        {authCtx.user["RoleID"] === 1 && (
          <BalanceVoucherButton balance={authCtx.user["Balance"]} />
        )}
        <LoginRegisterButton
          Name={authCtx.user["Name"]}
          country={lang}
          user={authCtx.user}
        />
        <ReturnOrderButton country={lang} />
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
          <SupportButton element={<FeedBackButton country={lang} />} />
          <SupportButton element={<HelpCenterButton country={lang} />} />
        </div>
      </div>
    </nav>
  );
}
