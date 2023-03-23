import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/Transaction.module.scss";
import WishlistSelector from "@/components/actions/WishlistSelector";
import AuthContext from "@/store/Authcontext";

interface MyProps {
  data: any;
  reload: any;
}

function CartItem({ data, reload }: MyProps) {
  const [quantity, setQuantity] = useState(data.Quantity);
  const authCtx: any = useContext(AuthContext);

  const url = process.env.BASE_URL + "product/update-cart";
  const url2 = process.env.BASE_URL + "product/save-for-later";

  const [updateloading, updatecart, updateerror, updaterequest] = useAxiosPost({
    method: "POST",
    url: url,
  });

  const [saveloading, savecart, saveerror, saverequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  useEffect(() => {
    if (!updateloading) {
      if (updatecart) {
        alert(updatecart.message);
        reload();
      }
      if (updateerror) {
        alert(updateerror);
      }
    }
  }, [updateloading]);

  useEffect(() => {
    if (!saveloading) {
      if (savecart) {
        alert(savecart.message);
        reload();
      }
      if (saveerror) {
        alert(saveerror);
      }
    }
  }, [saveloading]);

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

  function saveForLaterHandler() {
    const userId = authCtx.user["ID"];

    saverequest({
      UserID: userId,
      ProductID: data.ProductID,
      Quantity: data.Quantity,
      CartID: data.CartID,
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
        <WishlistSelector />
      </div>

      <div className={style.right}>
        <p>Name {data.ProductName}</p>
        <p>Details {data.ProductDetails}</p>
        <p>Stock {data.ProductStock}</p>
        <p>Quantity In Cart {data.Quantity}</p>
      </div>
      <ActionButton text="Save" onClick={saveForLaterHandler} />
    </div>
  );
}

export default CartItem;
