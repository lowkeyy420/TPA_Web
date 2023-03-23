import { IProductData } from "@/interfaces/IProduct";
import style from "../../styles/UI.module.scss";
import Product from "../item/Product";

interface Mydata {
  data: IProductData[] | any;
  reload: any;
  update?: boolean;
  cart?: boolean;
}

function ProductGrid(props: Mydata) {
  return (
    <div className={style.product_grid_container}>
      {props.data &&
        props.data["data"] &&
        props.data["data"].map((product: any) => {
          return (
            <Product
              key={product.ID}
              ID={product.ID}
              Details={product.Details}
              Name={product.Name}
              Image={product.Image}
              ProductCategoryName={product.ProductCategoryName}
              Description={product.Description}
              Stock={product.Stock}
              Price={product.Price}
              reload={props.reload}
              update={props.update}
              cart={props.cart}
            />
          );
        })}
      {props.data &&
        props.data[0] &&
        props.data[0].ID &&
        props.data.map((product: any) => {
          return (
            <Product
              key={product.ID}
              ID={product.ID}
              Details={product.Details}
              Name={product.Name}
              Image={product.Image}
              ProductCategoryName={product.ProductCategoryName}
              Description={product.Description}
              Stock={product.Stock}
              Price={product.Price}
              reload={props.reload}
            />
          );
        })}
    </div>
  );
}

export default ProductGrid;
