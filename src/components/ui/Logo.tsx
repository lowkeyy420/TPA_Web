import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import style from "../styles/Navbar.module.scss";

interface MyProps {
  height: number;
}

function Logo({ height }: MyProps) {
  return (
    <Link href="/">
      <div className={style.logo}>
        <Image
          src={logo}
          alt="oldegglogo"
          className={style.image}
          height={height}
        ></Image>
      </div>
    </Link>
  );
}

export default Logo;
