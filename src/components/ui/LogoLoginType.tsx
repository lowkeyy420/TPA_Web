import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import style from "../styles/Navbar.module.scss";

interface MyProps {
  mode: string;
  height: number;
}

function LogoLoginType({ mode, height }: MyProps) {
  return (
    <Link href="/">
      <div className={style.logo}>
        <Image
          src={logo}
          alt={mode}
          className={style.image}
          height={height}
        ></Image>
      </div>
    </Link>
  );
}

export default LogoLoginType;
