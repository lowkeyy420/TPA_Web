import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import style from "../styles/UI.module.scss";

interface Selections {
  logo?: any;
  title: string;
  onHover?: any;
}

function HomeCategory({ logo, title, onHover }: Selections) {
  return (
    <div className={style.category_container}>
      <div className={style.category_left}>
        <Image src={logo} alt="img" width={25} height={25} />
        <p className={style.title}>{title}</p>
      </div>
      <FontAwesomeIcon icon={faAngleRight} className={style.arrow} />
    </div>
  );
}

export default HomeCategory;
