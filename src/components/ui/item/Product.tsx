import { IProductData } from "@/interfaces/IProduct";
import axios from "axios";
import Image from "next/image";
import style from "../../styles/UI.module.scss";

type MyProps = IProductData | any;

function Product(props: MyProps) {
  const URL = process.env.BASE_URL + "admin/update-product-status";

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
    <div className={style.product_outer_container}>
      <div className={style.product_container}>
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
        <p>Name :{props.Name}</p>
        <p>Details : {props.Details}</p>
        <p>Description : {props.Description}</p>
        <p>Price : {props.Price}</p>
        <p>Stock : {props.Stock}</p>
        <div className={style.product_action_container}>
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

export default Product;
