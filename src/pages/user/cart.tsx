import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/ui/item/CartItem";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { useContext, useEffect, useState } from "react";
import style from "../../components/styles/UI.module.scss";
import ModalSavedProduct from "@/components/ui/modal/ModalSavedProduct";
import Backdrop from "@/components/ui/Backdrop";
import Loading from "@/components/ui/Loading";
import Link from "next/link";

function CartPage() {
  const authCtx: any = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let url =
    process.env.BASE_URL + `product/get-cart-item?id=${authCtx.user["ID"]}`;
  let url2 = process.env.BASE_URL + `get-cart?id=${authCtx.user["ID"]}`;

  const [loading, success, error, request] = useAxios(
    {
      method: "GET",
      url: url,
    },
    false
  );

  const [priceloading, price, priceerror, pricerequest] = useAxios(
    {
      method: "GET",
      url: url2,
    },
    false
  );

  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
      pricerequest();
    }
  }, [authCtx.user["ID"]]);

  function showModalHandler() {
    setModalIsOpen(true);
  }
  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <Layout>
      {modalIsOpen && <ModalSavedProduct />}
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      {loading && <Loading />}
      <main className={style.cart_container}>
        <div className={style.left}>
          {success &&
            success.map((item: any) => {
              return (
                <CartItem
                  key={item.ID}
                  data={item}
                  reload={request}
                  wishlist
                  pricereload={pricerequest}
                />
              );
            })}
        </div>
        <div className={style.right}>
          <h3>Summary : </h3>
          <p>Total Price : </p>
          {price && price}
          <Link href="/order/checkout">
            <ActionButton text="Checkout" />
          </Link>
          <ActionButton text="Saved" onClick={showModalHandler} />
        </div>
      </main>
    </Layout>
  );
}

export default CartPage;
