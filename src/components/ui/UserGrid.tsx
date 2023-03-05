import { ICurrUser } from "@/interfaces/IUserData";
import style from "../styles/UI.module.scss";
import User from "./User";

interface Mydata {
  data: ICurrUser[] | any;
}

const UserGrid = (props: Mydata) => {
  console.log(props);

  return (
    <div className={style.user_grid_container}>
      {props.data["data"].map((usr: any) => {
        return (
          <User
            key={usr.ID}
            ID={usr.ID}
            Email={usr.Email}
            First_name={usr.First_name}
            Last_name={usr.Last_name}
            Phone={usr.Phone}
            RoleID={usr.RoleID}
            Status={usr.Status}
            Country={usr.Country}
            Balance={usr.Balance}
          />
        );
      })}
    </div>
  );
};

export default UserGrid;
