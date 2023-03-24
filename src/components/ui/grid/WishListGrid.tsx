import { ICurrUser } from "@/interfaces/IUser";
import style from "../../styles/UI.module.scss";
import User from "../item/User";
import WishlistCard from "../item/WishListCard";

interface Mydata {
  data: any;
  reload: any;
}

const WishListGrid = (props: Mydata) => {
  return (
    <div className={style.data_grid_container}>
      {props.data["data"].map((item: any) => {
        return (
          <WishlistCard
            key={item.ID}
            ID={item.ID}
            Name={item.Name}
            Description={item.Description}
            IsPublic={item.IsPublic}
            reload={props.reload}
          />
        );
      })}
    </div>
  );
};

export default WishListGrid;
