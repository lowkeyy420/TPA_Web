import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";
import {
  faAddressBook,
  faHeart,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import style from "../../styles/Button.module.scss";

function RoleOnlyButton(props: number | any) {
  return (
    <div className={style.roleBtn}>
      {props.roleid === 1 && (
        <Link href="/user/wishlist">
          <FontAwesomeIcon
            icon={faHeart}
            className={style.icon}
            style={{ color: "red" }}
          />
        </Link>
      )}
      {props.roleid === 2 && (
        <Link href="/shop/myshop">
          <FontAwesomeIcon
            icon={faShop}
            className={style.icon}
            style={{ color: "red" }}
          />
        </Link>
      )}
      {props.roleid === 3 && (
        <Link href="/contact-support">
          <FontAwesomeIcon
            icon={faAddressBook}
            className={style.icon}
            style={{ color: "red" }}
          />
        </Link>
      )}
      {props.roleid === 4 && (
        <Link href="/admin">
          <FontAwesomeIcon
            icon={faSuperpowers}
            className={style.icon}
            style={{ color: "red" }}
          />
        </Link>
      )}
    </div>
  );
}

export default RoleOnlyButton;
