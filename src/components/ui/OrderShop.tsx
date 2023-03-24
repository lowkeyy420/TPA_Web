import AuthContext from "@/store/Authcontext";
import { useContext, useEffect, useState } from "react";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import OrderItem from "./item/OrderItem";

const OrderShopPage = () => {
  const [isOngoing, setIsOngoing] = useState(true);
  const [isCancelled, setIsCancelled] = useState(true);

  const authCtx: any = useContext(AuthContext);

  let url = process.env.BASE_URL + `get-transaction-shop`;

  const [loading, success, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  console.log(success);

  useEffect(() => {
    request({
      ShopID: authCtx.user["ID"],
      IsCancelled: isCancelled,
      IsOngoing: isOngoing,
    });
  }, [authCtx, isOngoing, isCancelled]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ alignSelf: "center" }}>Orders</h1>
      <div style={{ display: "flex", gap: "20px", alignSelf: "center" }}>
        <p>Include Order Status Ongoing</p>
        <input
          type="checkbox"
          checked={isOngoing}
          onChange={() => setIsOngoing(!isOngoing)}
        />
      </div>
      <div style={{ display: "flex", gap: "20px", alignSelf: "center" }}>
        <p>Include Order Status Cancelled</p>
        <input
          type="checkbox"
          checked={isCancelled}
          onChange={() => setIsCancelled(!isCancelled)}
        />
      </div>

      {!success ? (
        <h1>No Order Yet</h1>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {success?.map((order: any) => {
            return (
              <OrderItem key={order?.Header.ID} data={order} reload={request} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderShopPage;
