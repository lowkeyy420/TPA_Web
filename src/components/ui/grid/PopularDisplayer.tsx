import { useAxios } from "@/hooks/useAxios";
import style from "../../styles/UI.module.scss";

interface MyProps {
  type: string;
}

function PopularDisplayer({ type }: MyProps) {
  let url = "";
  if (type === "category") {
    url = process.env.BASE_URL + "product/popular-categories";
  }
  if (type === "shop") {
    url = process.env.BASE_URL + "shop/get-top-three";
  }

  const [loading, data, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div className={style.popular_container}>
      {data && type === "category" && (
        <div className={style.popular_grid}>
          {data["data"].map((item: any) => {
            return <h3 key={item.ID}>{item.ProductCategoryName}</h3>;
          })}
        </div>
      )}
      {data && type === "shop" && (
        <div className={style.popular_grid}>
          {data["data"].map((item: any) => {
            return <h3 key={item.i}>{item.Name}</h3>;
          })}
        </div>
      )}
    </div>
  );
}

export default PopularDisplayer;
