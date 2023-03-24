import { ICurrUser } from "@/interfaces/IUser";
import style from "../../styles/UI.module.scss";
import User from "../item/User";
import WishlistCard from "../item/WishListCard";

interface Mydata {
  data: any;
  reload: any;
  follow?: boolean;
  removefollow?: boolean;
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
            follow={props.follow}
            removefollow={props.removefollow}
          />
        );
      })}
    </div>
  );
};

export default WishListGrid;
