import { ICurrShop } from "@/interfaces/IShop";
import React from "react";
import style from "../../styles/UI.module.scss";
import Shop from "../item/Shop";

interface Mydata {
  data: ICurrShop[] | any;
  reload: any;
}

function ShopGrid(props: Mydata) {
  return (
    <div className={style.data_grid_container}>
      {props.data["data"].map((usr: any) => {
        return (
          <Shop
            key={usr.ID}
            ID={usr.ID}
            Email={usr.Email}
            Name={usr.Name}
            Image={usr.Image}
            Status={usr.Status}
            RoleID={usr.RoleID}
            reload={props.reload}
          />
        );
      })}
    </div>
  );
}

export default ShopGrid;
