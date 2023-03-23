import SearchField from "@/components/actions/SearchField";
import Layout from "@/components/layout/Layout";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../../components/styles/Shop.module.scss";

function ShopReviewPage() {
  const authCtx: any = useContext(AuthContext);

  const [search, setSearch] = useState("");
  let url =
    process.env.BASE_URL +
    `shop/get-review?id=${authCtx.user["ID"]}?search=${search}`;
  let url2 = process.env.BASE_URL + `shop/get-shop?id=${authCtx.user["ID"]}`;

  //get reviews
  const [reviewLoading, review, reviewError, reviewRequest] = useAxios({
    method: "GET",
    url: url,
  });

  //get current shop details
  const [shopLoading, shop, shopError, shopRequest] = useAxios({
    method: "GET",
    url: url2,
  });

  useEffect(() => {
    reviewRequest();
  }, [search]);

  return (
    <Layout>
      <main className={style.myshop_container}>
        <div className={style.shop_banner_container}>
          <div className={style.left_profile}>
            {shop && (
              <Image
                className={style.image}
                src={shop["Image"]}
                alt={shop["Name"]}
                height={90}
                width={90}
              />
            )}
            <div className={style.inner_profile}>
              <p className={style.name}>{shop && shop["Name"]}</p>
              <div className={style.inner_profile_details}>
                <p>Number of Sales : {shop && shop["Sales"]}</p>
                <p>About Us : {shop && shop["Description"]}</p>
                <p>Average Rating : {shop && shop["AverageRating"]}</p>
              </div>
            </div>
          </div>
          <h2>Shop Reviews</h2>
          <SearchField reload={reviewRequest} search setSearch={setSearch} />
        </div>
        {search}
      </main>
    </Layout>
  );
}

export default ShopReviewPage;
