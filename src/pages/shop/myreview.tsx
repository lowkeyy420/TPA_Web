import SearchField from "@/components/actions/SearchField";
import Layout from "@/components/layout/Layout";
import { useAxios } from "@/hooks/useAxios";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import AuthContext from "@/store/Authcontext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../../components/styles/Shop.module.scss";

function ShopReviewPage() {
  const authCtx: any = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  let url = process.env.BASE_URL + "shop/get-review";
  let url2 = process.env.BASE_URL + `shop/get-shop?id=${authCtx.user["ID"]}`;

  //get reviews
  const [reviewLoading, review, reviewError, reviewRequest] = useAxiosPost({
    method: "POST",
    url: url,
  });

  //get current shop details
  const [shopLoading, shop, shopError, shopRequest] = useAxios({
    method: "GET",
    url: url2,
  });

  useEffect(() => {
    reviewRequest({
      ShopID: authCtx.user["ID"],
      ReviewDate: date,
      ReviewKeyword: search,
    });
  }, [search, date, authCtx.user["ID"]]);

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
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <div className={style.search}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search Store.."
              onChange={(e) => setSearch(e.target.value)}
            />
            <label htmlFor="search">
              <FontAwesomeIcon icon={faSearch} className={style.logo} />
            </label>
          </div>
        </div>
        {search}
        {review && review.data === null && <h2>No Reviews yet...</h2>}
      </main>
    </Layout>
  );
}

export default ShopReviewPage;
