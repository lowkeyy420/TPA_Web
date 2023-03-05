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

import { useContext } from "react";
import AuthContext from "@/store/Authcontext";
import Logo from "../ui/Logo";
import { ICurrUser } from "@/interfaces/IUserData";
import RoleOnlyButton from "../actions/button/RoleOnlyButton";

function LoginRegisterButton({
  First_name,
  Last_name,
}: {
  First_name: string;
  Last_name: string;
}) {
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
          <div className={style.loginBtn_bottom}>
            {First_name ? First_name : "Sign In / Register"}{" "}
            {Last_name ? Last_name : null}
          </div>
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
  const authCtx: any = useContext(AuthContext);

  return (
    <nav className={style.navbar_container}>
      <div className={style.nav_top}>
        <HamburgerToggle />
        <Logo height={50} />
        <SelectAddress />
        <SearchField />
        <NotifButton />
        <CountryButton />
        <ThemeToggle />
        {authCtx.user["RoleID"] > 1 && (
          <RoleOnlyButton roleid={authCtx.user["RoleID"]} />
        )}
        <LoginRegisterButton
          First_name={authCtx.user["First_name"]}
          Last_name={authCtx.user["Last_name"]}
        />
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
