import { useAxios } from "@/hooks/useAxios";
import style from "../../styles/UI.module.scss";
import Product from "../item/Product";

interface MyProps {
  type: string;
  id?: number;
}

function PopularDisplayer({ type, id }: MyProps) {
  let url = "";
  if (type === "category") {
    url = process.env.BASE_URL + "product/popular-categories";
  }
  if (type === "shop") {
    url = process.env.BASE_URL + "shop/get-top-three";
  }

  if (type === "similar") {
    url = process.env.BASE_URL + "product/similar-product";
  }

  if (type === "frequently") {
    url = process.env.BASE_URL + "product/frequently-bought";
  }

  if (type === "query") {
    url = process.env.BASE_URL + "get-popular-query";
  }

  if (type === "recommendedbyshop") {
    url = process.env.BASE_URL + `shop/get-recommended?id=${id}`;
  }

  const [loading, data, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div className={style.popular_container}>
      {data && type === "category" && (
        <div className={style.popular_grid}>
          {data["data"] &&
            data["data"].map((item: any) => {
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

      {data && type === "query" && (
        <div className={style.popular_grid}>
          {data["data"].map((item: any) => {
            return <h3 key={item.ID}>{item.Keyword}</h3>;
          })}
        </div>
      )}

      {data && type === "similar" && (
        <div className={style.prod_popular_grid}>
          {data["data"].map((item: any) => {
            return (
              <Product
                key={item.ID}
                ID={item.ID}
                Details={item.Details}
                Name={item.Name}
                Image={item.Image}
                Description={item.Description}
                Stock={item.Stock}
                Price={item.Price}
              />
            );
          })}
        </div>
      )}

      {data && type === "frequently" && (
        <div className={style.prod_popular_grid}>
          {data["data"].map((item: any) => {
            return (
              <Product
                key={item.ID}
                ID={item.ID}
                Details={item.Details}
                Name={item.Name}
                Image={item.Image}
                Description={item.Description}
                Stock={item.Stock}
                Price={item.Price}
              />
            );
          })}
        </div>
      )}

      {data && type === "recommendedbyshop" && (
        <div className={style.prod_popular_grid}>
          {data["data"].map((item: any) => {
            return (
              <Product
                key={item.ID}
                ID={item.ID}
                Details={item.Details}
                Name={item.Name}
                Image={item.Image}
                Description={item.Description}
                Stock={item.Stock}
                Price={item.Price}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PopularDisplayer;
