import Layout from "@/components/layout/Layout";
import { useAxios } from "@/hooks/useAxios";
import { NextPage } from "next";
import Image from "next/image";
import style from "../../components/styles/Product.module.scss";
import { useRouter } from "next/router";
import ActionButton from "@/components/actions/button/ActionButton";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/Authcontext";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Banned from "@/components/ui/Banned";
import HomeHeader from "@/components/ui/HomeHeader";
import PopularDisplayer from "@/components/ui/grid/PopularDisplayer";
interface Props {
  id: number;
}

const ProductPage: NextPage<Props> = ({ id }) => {
  const url = process.env.BASE_URL + `product/get-item?id=${id}`;
  const url2 = process.env.BASE_URL + `product/add-to-cart`;
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const authCtx: any = useContext(AuthContext);

  const [loading, product, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [cartloading, cart, carterror, cartrequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  useEffect(() => {
    if (!cartloading) {
      if (cart) {
        alert(cart.message);
      }
      if (carterror) {
        alert(carterror);
      }
    }
  }, [cartloading]);

  function addToCartHandler() {
    if (!authCtx.user["ID"]) {
      alert("Please login first");
      return;
    }

    cartrequest({
      UserID: authCtx.user["ID"],
      ProductID: id,
      Quantity: quantity,
    });
  }

  function redirectShopHandler(ID: number) {
    router.push(`/shop/${ID}`);
  }

  return (
    <Layout>
      <main className={style.product_page_container}>
        <div className={style.upper}>
          <div className={style.left}>
            {product && product["data"] && product["data"].Image && (
              <Image
                priority
                src={product["data"].Image}
                alt={product["data"].ID}
                width="200"
                height="200"
                className={style.image}
              />
            )}
            {product && product["shop"].Status === "Banned" && <Banned />}

            {product && product["data"] && product["data"].Stock > 0 ? (
              <p>Stock : {product["data"].Stock}</p>
            ) : (
              <p style={{ fontWeight: "bold", color: "red" }}>
                Out Of Stock...
              </p>
            )}

            {product && product["data"] && product["data"].Stock > 0 && (
              <input
                type="number"
                onChange={(e: any) => {
                  if (e.target.value >= product["data"].Stock) {
                    setQuantity(product["data"].Stock);
                  } else if (e.target.value <= 1) {
                    setQuantity(1);
                  } else {
                    setQuantity(parseInt(e.target.value, 10));
                  }
                }}
                value={quantity}
              />
            )}

            {product && product["data"] && product["data"].Stock <= 0 && (
              <input type="number" disabled />
            )}

            <ActionButton onClick={addToCartHandler} text="Add To Cart" />
          </div>

          <div className={style.right}>
            {product && product["shop"] && (
              <p>Shop Name : {product["shop"].Name}</p>
            )}
            {product && product["shop"] && product["shop"].Image && (
              <Image
                priority
                src={product["shop"].Image}
                alt={product["shop"].ID}
                width="100"
                height="100"
                className={style.imageShop}
                onClick={() => {
                  redirectShopHandler(product["shop"].ID);
                }}
              />
            )}

            {product && product["data"] && <p>Name : {product["data"].Name}</p>}
            {product && product["data"] && (
              <p>Details : {product["data"].Details}</p>
            )}
            {product && product["data"] && (
              <p>Description : {product["data"].Description}</p>
            )}
            {product && product["data"] && (
              <p>Category : {product["data"].ProductCategoryName}</p>
            )}
          </div>
        </div>
        <div className={style.bottom}></div>
        <div className={style.popular}>
          <HomeHeader text="Similar Products" />
          <PopularDisplayer type="similar" />
          <HomeHeader text="Frequently Bought With" />
          <PopularDisplayer type="frequently" />
        </div>
      </main>
    </Layout>
  );
};

ProductPage.getInitialProps = async ({ query }) => {
  const { id = "1" } = query;
  const idNum = parseInt(id as string, 10);
  return { id: idNum };
};

export default ProductPage;
