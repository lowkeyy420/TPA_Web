import AuthContext from "@/store/Authcontext";
import style from "../../styles/UI.module.scss";
import { useContext } from "react";
import { useAxios } from "@/hooks/useAxios";
import Product from "../item/Product";

function ModalSavedProduct() {
  const authCtx: any = useContext(AuthContext);
  const url =
    process.env.BASE_URL + `product/get-saved-product?id=${authCtx.user["ID"]}`;

  const [loading, success, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div className={style.modal}>
      <h1>Saved For Later</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          paddingTop: "10px",
        }}
      >
        {success &&
          success.map((item: any) => (
            <Product
              key={item.Product.ID}
              ID={item.Product.ID}
              Details={item.Product.Details}
              Name={item.Product.Name}
              Image={item.Product.Image}
              ProductCategoryName={item.Product.ProductCategoryName}
              Description={item.Product.Description}
              Stock={item.Product.Stock}
              Price={item.Product.Price}
              Quantity={item.SavedProduct.Quantity}
            />
          ))}
      </div>
    </div>
  );
}

export default ModalSavedProduct;
