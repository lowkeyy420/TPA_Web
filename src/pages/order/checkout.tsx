import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import style from "../../components/styles/UI.module.scss";
import AuthContext from "@/store/Authcontext";
import { useAxios } from "@/hooks/useAxios";
import CartItem from "@/components/ui/item/CartItem";
import { useAxiosPost } from "@/hooks/useAxiosPost";

function CheckoutPage() {
  const authCtx: any = useContext(AuthContext);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [deliveryType, setDeliveryType] = useState(1);

  const [newAddress, setNewAddress] = useState("");

  let url =
    process.env.BASE_URL + `product/get-cart-item?id=${authCtx.user["ID"]}`;
  let url2 = process.env.BASE_URL + `get-cart?id=${authCtx.user["ID"]}`;

  let url3 = process.env.BASE_URL + `get-delivery`;
  let url4 = process.env.BASE_URL + `get-payment`;
  let url5 = process.env.BASE_URL + `get-all-address?id=${authCtx.user["ID"]}`;
  let url6 = process.env.BASE_URL + `checkout`;
  let url7 = process.env.BASE_URL + `add-address`;
  let url8 = process.env.BASE_URL + `remove-address`;

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

  const [deliveryloading, deliverysuccess, deliveryerror, deliveryrequest] =
    useAxios({
      method: "GET",
      url: url3,
    });

  const [paymentloading, paymentsuccess, paymenterror, paymentrequest] =
    useAxios({
      method: "GET",
      url: url4,
    });

  const [addressloading, addresssuccess, addresserror, addressrequest] =
    useAxios(
      {
        method: "GET",
        url: url5,
      },
      false
    );

  const [orderloading, ordersuccess, ordererror, orderrequest] = useAxiosPost({
    method: "POST",
    url: url6,
  });

  const [
    addaddressloading,
    addaddresssuccess,
    addaddresserror,
    addaddressrequest,
  ] = useAxiosPost({
    method: "POST",
    url: url7,
  });

  const [
    removeaddressloading,
    removeaddresssuccess,
    removeaddresserror,
    removeaddressrequest,
  ] = useAxiosPost({
    method: "POST",
    url: url8,
  });

  useEffect(() => {
    if (!orderloading) {
      if (ordersuccess) {
        alert(ordersuccess.message);
        request();
        pricerequest();
      } else if (ordererror) {
        alert(ordererror);
      }
    }
  }, [orderloading]);

  useEffect(() => {
    if (!addaddressloading) {
      if (addaddresssuccess) {
        alert(addaddresssuccess.message);
        addressrequest();
      } else if (addaddresserror) {
        alert(addaddresserror);
      }
    }
  }, [addaddressloading]);

  useEffect(() => {
    if (!removeaddressloading) {
      if (removeaddresssuccess) {
        alert(removeaddresssuccess.message);
        addressrequest();
      } else if (removeaddresserror) {
        alert(removeaddresserror);
      }
    }
  }, [removeaddressloading]);

  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
      pricerequest();
      addressrequest();
    }
  }, [authCtx.user["ID"]]);

  function orderHandler() {
    orderrequest({
      AddressID: selectedAddress,
      DeliveryTypeID: deliveryType,
      PaymentMethodID: paymentMethod,
      UserID: authCtx.user["ID"],
    });
  }

  function addHandler() {
    addaddressrequest({
      UserID: authCtx.user["ID"],
      Address: newAddress,
    });
  }

  function removeAddressHandler(ID: number) {
    removeaddressrequest({
      AddressID: ID,
    });
  }

  function addressChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedAddress(parseInt(event.target.value, 10));
  }

  function paymentMethodChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setPaymentMethod(parseInt(event.target.value, 10));
  }

  function deliveryTypeChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setDeliveryType(parseInt(event.target.value, 10));
  }

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          <div className={style.method_container}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>Address</p>
                <input
                  type="text"
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="New Address.."
                />
                <ActionButton text="Add Address" onClick={addHandler} />
              </div>

              {addresssuccess &&
                addresssuccess.length > 0 &&
                addresssuccess.map((item: any) => {
                  return (
                    <div
                      key={item.ID}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {item.Address}{" "}
                      <ActionButton
                        text="remove"
                        onClick={() => removeAddressHandler(item.ID)}
                      />
                    </div>
                  );
                })}

              <select
                style={{ padding: "5px 10px" }}
                onChange={addressChangeHandler}
              >
                {addresssuccess &&
                  addresssuccess.length > 0 &&
                  addresssuccess.map((item: any) => {
                    return (
                      <option key={item.ID} value={item.ID}>
                        {item.Address}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <p>Payment Method</p>
              <select
                style={{ padding: "5px 10px" }}
                onChange={paymentMethodChangeHandler}
              >
                {paymentsuccess &&
                  paymentsuccess.length > 0 &&
                  paymentsuccess.map((item: any) => {
                    return (
                      <option key={item.ID} value={item.ID}>
                        {item.Name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <p>Delivery Type</p>
              <select
                style={{ padding: "5px 10px" }}
                onChange={deliveryTypeChangeHandler}
              >
                {deliverysuccess &&
                  deliverysuccess.length > 0 &&
                  deliverysuccess.map((item: any) => {
                    return (
                      <option key={item.ID} value={item.ID}>
                        {item.Name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

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
            <ActionButton text="Checkout" onClick={orderHandler} />
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export default CheckoutPage;
