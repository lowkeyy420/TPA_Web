import React from "react";
import styles from "../styles/Navbar.module.scss";

interface MyProps {
  text?: string;
  variant: string;
}

function NavbarLink({ text, variant }: MyProps) {
  let show: any | null =
    variant === "normal" ? (
      <div className={styles.navbar_link}>{text}</div>
    ) : (
      <div className={styles.navbar_link_business}>
        <div className={styles.business_left}>NEWEGG</div>
        <div className={styles.business_right}>BUSINESS</div>
      </div>
    );

  if (variant === "red")
    show = <div className={styles.navbar_link_red}>{text}</div>;

  return show;
}

export default NavbarLink;
