import { ICurrUser } from "@/interfaces/IUserData";
import style from "../styles/UI.module.scss";

function User(props: ICurrUser) {
  return (
    <div className={style.user_container}>
      <p>{props.ID}</p>
      <p>{props.Email}</p>
      <p>{props.First_name}</p>
      <p>{props.Last_name}</p>
      <p>{props.Phone}</p>
      <p>{props.Status}</p>
    </div>
  );
}

export default User;
