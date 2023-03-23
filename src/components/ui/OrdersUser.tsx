import AuthContext from "@/store/Authcontext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import OrderItem from "./item/OrderItem";

const OrderuserPage = () => {
  const [isOngoing, setIsOngoing] = useState(true);
  const [isCancelled, setIsCancelled] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState<any>("");

  const authCtx: any = useContext(AuthContext);

  let url = process.env.BASE_URL + `get-transaction-user`;

  const [loading, success, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  useEffect(() => {
    request({
      UserID: authCtx.user["ID"],
      IsOngoing: isOngoing,
      IsCancelled: isCancelled,
      Keyword: keyword,
      TransactionNumber: orderNumber,
      TransactionDate: orderDate,
    });
  }, [authCtx, isOngoing, isCancelled, keyword, orderNumber, orderDate]);

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
      <div style={{ display: "flex", gap: "20px", alignSelf: "center" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          height={34}
          width={400}
          placeholder="Search Product Name"
        />
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          height={34}
          width={400}
          placeholder="Search Transaction Number"
        />
        <input
          type="date"
          value={orderDate}
          onChange={(e: any) => {
            setOrderDate(e.target.value);
          }}
        />
      </div>

      {!success ? (
        <h1>No Order Yet</h1>
      ) : (
        <div>
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

export default OrderuserPage;
