import { ICurrUser } from "@/interfaces/IUser";
import style from "../../styles/UI.module.scss";
import User from "../item/User";

interface Mydata {
  data: ICurrUser[] | any;
  reload: any;
}

const UserGrid = (props: Mydata) => {
  return (
    <div className={style.data_grid_container}>
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
            SubscribeToEmail={usr.SubscribeToEmail}
            Balance={usr.Balance}
            reload={props.reload}
          />
        );
      })}
    </div>
  );
};

export default UserGrid;
