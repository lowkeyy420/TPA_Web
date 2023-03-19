import { ICurrUser } from "@/interfaces/IUser";
import axios from "axios";
import style from "../../styles/UI.module.scss";

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        props.reload();
      })
      .catch((err) => {
        console.log(err);
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        props.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className={style.user_container}
      style={{
        backgroundColor:
          props.Status === "Active" ? "" : "rgba(233, 60, 22, 0.303)",
      }}
    >
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
