import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import style from "../../styles/Button.module.scss";

function RoleOnlyButton(props: number | any) {
  if (props.roleid === 1) return null;

  return (
    <div className={style.roleBtn}>
      {props.roleid === 2 && (
        <Link href="/shop">
          <FontAwesomeIcon icon={faShop} className={style.icon} />
        </Link>
      )}
      {props.roleid === 3 && (
        <Link href="/contact-support">
          <FontAwesomeIcon icon={faAddressBook} className={style.icon} />
        </Link>
      )}
      {props.roleid === 4 && (
        <Link href="/admin">
          <FontAwesomeIcon icon={faSuperpowers} className={style.icon} />
        </Link>
      )}
    </div>
  );
}

export default RoleOnlyButton;
