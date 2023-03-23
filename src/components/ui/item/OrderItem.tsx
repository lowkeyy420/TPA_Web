import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/Transaction.module.scss";

interface MyProps {
  data: any;
  reload?: any;
}

function OrderItem({ data, reload }: MyProps) {
  return (
    <div className={style.cart_item}>
      <Image
        priority
        src={data.Product.Image}
        alt={data.Product.ID}
        width="100"
        height="100"
      />

      <div className={style.center}>
        <p>Order ID {data.Header.ID} </p>
        <p>Order Date {data.Header.CreatedAt} </p>
        <p>Status {data.Detail.Status} </p>
        <p>Quantity {data.Detail.Quantity} </p>
      </div>

      <div className={style.right}>
        <p>Name {data.Product.Name}</p>
        <p>Details {data.Product.Details}</p>
        <p>Stock {data.Product.Stock}</p>
      </div>
    </div>
  );
}

export default OrderItem;
