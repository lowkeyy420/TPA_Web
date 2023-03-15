import { ICurrUser } from "@/interfaces/IUserData";
import axios from "axios";
import style from "../styles/UI.module.scss";

type MyProps = ICurrUser | any;

function User(props: MyProps) {
  const URL = process.env.BASE_URL + "admin/update-user-status";

  function unBanHandler(ID: number) {
    axios
      .put(
        URL,
        {
          status: "Active",
        },
        {
          params: {
            id: ID,
          },
        }
      )
      .then((res) => {
        props.reload();
      });
  }

  function banHandler(ID: number) {
    axios
      .put(
        URL,
        {
          status: "Banned",
        },
        {
          params: {
            id: ID,
          },
        }
      )
      .then((res) => {
        props.reload();
      });
  }

  return (
    <div className={style.user_container}>
      <h2>ID : {props.ID}</h2>
      <p>Email : {props.Email}</p>
      <p>First Name : {props.First_name}</p>
      <p>Last Name :{props.Last_name}</p>
      <p>Phone Number : {props.Phone}</p>
      <p>Subscribed : {props.SubscribeToEmail ? "True" : "False"}</p>
      <p>Status : {props.Status}</p>
      <div className={style.user_action_container}>
        {props.Status === "Active" ? (
          <button className={style.banBtn} onClick={() => banHandler(props.ID)}>
            Ban
          </button>
        ) : (
          <button className={style.disabledBtn} disabled></button>
        )}

        {props.Status === "Banned" ? (
          <button
            className={style.unbanBtn}
            onClick={() => unBanHandler(props.ID)}
          >
            UnBan
          </button>
        ) : (
          <button className={style.disabledBtn} disabled></button>
        )}
      </div>
    </div>
  );
}

export default User;
