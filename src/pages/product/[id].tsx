import Layout from "@/components/layout/Layout";
import { useAxios } from "@/hooks/useAxios";
import { NextPage } from "next";
import Image from "next/image";
import style from "../../components/styles/Shop.module.scss";
import { useRouter } from "next/router";
import ActionButton from "@/components/actions/button/ActionButton";
import { useContext } from "react";
import AuthContext from "@/store/Authcontext";
import { useAxiosPost } from "@/hooks/useAxiosPost";
interface Props {
  id: number;
}

const ProductPage: NextPage<Props> = ({ id }) => {
  const url = process.env.BASE_URL + `product/get-item?id=${id}`;
  const url2 = process.env.BASE_URL + `product/add-to-cart`;
  const authCtx: any = useContext(AuthContext);

  const [loading, product, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [cartloading, cart, carterror, cartrequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  function addToCartHandler() {
    console.log(authCtx.isLoggedIn);

    if (!authCtx.isLoggedIn) {
      alert("Please login first");
      return;
    }

    cartrequest({
      UserID: authCtx.user["ID"],
      ProductID: id,
    });
  }

  return (
    <Layout>
      <main>
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

        <ActionButton onClick={addToCartHandler} text="Add To Cart" />
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
