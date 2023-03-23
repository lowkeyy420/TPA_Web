import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "../../styles/Transaction.module.scss";

interface MyProps {
  data: any;
  reload: any;
}

function CartItem({ data, reload }: MyProps) {
  const [quantity, setQuantity] = useState(data.Quantity);

  const url = process.env.BASE_URL + "product/update-cart";
  const url2 = process.env.BASE_URL + "product/remove-from-cart";

  const [updateloading, updatecart, updateerror, updaterequest] = useAxiosPost({
    method: "POST",
    url: url,
  });

  useEffect(() => {
    if (!updateloading) {
      if (updatecart) {
        alert(updatecart.message);
        reload();
      }
      if (updateerror) {
        alert(updateerror);
        reload();
      }
    }
  }, [updateloading]);

  function updateQuantityHandler() {
    if (quantity == data.Quantity) {
      return;
    }

    updaterequest({
      UserID: data.UserID,
      ProductID: data.ProductID,
      Quantity: quantity,
    });
  }

  return (
    <div className={style.cart_item}>
      <Image
        priority
        src={data.ProductImage}
        alt={data.ID}
        width="100"
        height="100"
        className={style.image}
      />

      <div className={style.center}>
        <div className={style.change}>
          <label style={{ paddingRight: "10px" }} htmlFor="newquantity">
            Qty
          </label>
          <input
            id="newquantity"
            type="number"
            onChange={(e: any) => {
              if (e.target.value >= data.ProductStock) {
                setQuantity(data.ProductStock);
              } else if (e.target.value <= 1) {
                setQuantity(1);
              } else {
                setQuantity(parseInt(e.target.value, 10));
              }
            }}
            value={quantity}
          />
          <ActionButton text="Change" onClick={updateQuantityHandler} />
        </div>
      </div>

      <div className={style.right}>
        <p>Name {data.ProductName}</p>
        <p>Details {data.ProductDetails}</p>
        <p>Stock {data.ProductStock}</p>
        <p>Quantity In Cart {data.Quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
