import { ICurrShop } from "@/interfaces/IShop";
import axios from "axios";
import Image from "next/image";
import style from "../../styles/UI.module.scss";

type MyProps = ICurrShop | any;

function Shop(props: MyProps) {
  const URL = process.env.BASE_URL + "admin/update-shop-status";

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
      className={style.shop_outer_container}
      style={{
        backgroundColor:
          props.Status === "Active" ? "" : "rgba(233, 60, 22, 0.303)",
      }}
    >
      <div className={style.shop_container}>
        {props.Image && (
          <Image
            priority
            src={props.Image}
            alt={props.ID}
            width="200"
            height="200"
            className={style.image}
          />
        )}

        <p>ID : {props.ID}</p>
        <p>Email : {props.Email}</p>
        <p>Name :{props.Name}</p>
        <p>Description : {props.Description}</p>
        <p>Status : {props.Status}</p>
        <div className={style.shop_action_container}>
          {props.Status === "Active" ? (
            <button
              className={style.banBtn}
              onClick={() => banHandler(props.ID)}
            >
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
    </div>
  );
}

export default Shop;
