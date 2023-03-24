import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/Transaction.module.scss";
import AuthContext from "@/store/Authcontext";
import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";

interface MyProps {
  data: any;
  reload?: any;
}

function OrderItem({ data, reload }: MyProps) {
  const url = process.env.BASE_URL + `product/add-to-cart`;
  const url2 = process.env.BASE_URL + `transaction/mark-as-finished`;

  const [cartloading, cart, carterror, cartrequest] = useAxiosPost({
    method: "POST",
    url: url,
  });

  const [markloading, mark, markerror, markrequest] = useAxiosPost({
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

  useEffect(() => {
    if (!markloading) {
      if (mark) {
        alert(mark.message);
        reload();
      }
      if (markerror) {
        alert(markerror);
      }
    }
  }, [markloading]);

  function buyAgainHandler() {
    const id = authCtx.user["ID"];
    cartrequest({
      UserID: id,
      ProductID: data.Product.ID,
      Quantity: data.Detail.Quantity,
    });
  }

  function markFinishHandler() {
    const id = data.Detail.ID;
    markrequest({
      TransactionDetailID: id,
    });
  }

  const authCtx: any = useContext(AuthContext);

  return (
    <div className={style.cart_item}>
      {data.Product && data.Product.Image && (
        <Image
          priority
          src={data.Product.Image}
          alt={data.Product.ID}
          width="100"
          height="100"
        />
      )}

      <div className={style.center}>
        <p>Order ID {data.Header.ID} </p>
        <p>Order Date {data.Header.CreatedAt} </p>
        <p>Status {data.Detail.Status} </p>
        <p>Quantity {data.Detail.Quantity} </p>
        {authCtx && authCtx.user && authCtx.user["RoleID"] == 1 && (
          <ActionButton text="Buy Again" onClick={buyAgainHandler} />
        )}
        {authCtx && authCtx.user && authCtx.user["RoleID"] == 2 && (
          <ActionButton text="Mark Finished" onClick={markFinishHandler} />
        )}
      </div>

      <div className={style.right}>
        {data.Product && <p>Product ID {data.Product.ID}</p>}
        {data.Product && <p>Product Name {data.Product.Name}</p>}
        {data.Product && <p>Product Details {data.Product.Details}</p>}
        {data.Product && <p>Product Stock {data.Product.Stock}</p>}
        {data.Address && <p>Address To : {data.Address.Address}</p>}
        {data.Header && <p>User ID {data.Header?.UserID}</p>}
      </div>
    </div>
  );
}

export default OrderItem;
