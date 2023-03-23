import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/ui/item/CartItem";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { useContext } from "react";
import style from "../../components/styles/UI.module.scss";

function CartPage() {
  const authCtx: any = useContext(AuthContext);

  let url =
    process.env.BASE_URL + `product/get-cart-item?id=${authCtx.user["ID"]}`;

  const [loading, success, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const url2 = process.env.BASE_URL + `get-cart?id=${authCtx.user["ID"]}`;
  const [priceloading, price, priceerror, pricerequest] = useAxios({
    method: "GET",
    url: url2,
  });

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          {success &&
            success.map((item: any) => {
              return <CartItem key={item.ID} data={item} reload={request} />;
            })}
        </div>
        <div className={style.right}>
          <h3>Summary : </h3>
          <p>Total Price : </p>
          {price && price}
          <ActionButton text="Order" />
          <ActionButton text="Saved" />
        </div>
      </main>
    </Layout>
  );
}

export default CartPage;
