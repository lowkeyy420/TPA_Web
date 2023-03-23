import { IProductData } from "@/interfaces/IProduct";
import style from "../../styles/UI.module.scss";
import Product from "../item/Product";

interface Mydata {
  data: IProductData[] | any;
  reload: any;
}

function ProductGrid(props: Mydata) {
  console.log(props);

  return (
    <div className={style.data_grid_container}>
      {props.data["data"].map((product: any) => {
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
