import { ICurrUser } from "@/interfaces/IUserData";
import style from "../styles/UI.module.scss";
import User from "./User";

interface Mydata {
  data: ICurrUser[] | any;
}

const UserGrid = (props: Mydata) => {
  const URL = process.env.BASE_URL + "admin/update-user-status";

  function unBanHandler(ID: number) {
    // axios.patch(
    //   URL,
    //   {
    //     id: ID,
    //     status: "Active",
    //   },
    //   {
    //     params: {
    //       id: ID,
    //     },
    //   }
    // ).then(res => {
    // });
  }

  function banHandler(ID: number) {
    console.log(ID);
  }

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
            SubscribeToEmail={usr.SubscribeToEmail}
            Country={usr.Country}
            Balance={usr.Balance}
          />
        );
      })}
    </div>
  );
};

export default UserGrid;
