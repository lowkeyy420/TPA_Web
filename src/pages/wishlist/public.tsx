import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";
import Link from "next/link";
import { useAxios } from "@/hooks/useAxios";
import ActionButton from "@/components/actions/button/ActionButton";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Wishlist from "@/components/ui/item/Wishlist";
import SelectPage from "@/components/actions/SelectPage";
import { NextPage, NextPageContext } from "next";
import WishListGrid from "@/components/ui/grid/WishListGrid";

interface Props {
  page: number;
  limit: number;
}

const PublicWishListPage: NextPage<Props> = ({ page, limit }) => {
  const authCtx: any = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(page);
  const [perpage, setPerpage] = useState(limit);

  let url =
    process.env.BASE_URL +
    `wishlist/get-public-wishlist?page=${currentPage}&limit=${perpage}`;

  const [loading, success, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
    }
  }, [authCtx.user["ID"]]);

  return (
    <Layout>
      <main className={style.cart_container}>
        <div className={style.left}>
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p>Item Per Page</p>
            <select
              style={{ width: "4rem" }}
              onChange={(e) => setPerpage(parseInt(e.target.value, 10))}
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
            </select>
          </div>
        </div>
        <ActionButton text="Price" />
        <ActionButton text="Date" />
        <ActionButton text="Rating" />

        <div className={style.right}>
          <h2 style={{ paddingBottom: "10px" }}>Public WishList</h2>
          <Link href="/user/wishlist">My Wishlist</Link>
          <Link href="/wishlist/following">Followed Wishlist</Link>
        </div>
      </main>
      {success && (
        <SelectPage
          currentPage={currentPage}
          setPage={setCurrentPage}
          reload={request}
          count={success.count}
          perpage={perpage}
        />
      )}

      {success && success.data && (
        <WishListGrid data={success} reload={request} follow />
      )}
    </Layout>
  );
};

PublicWishListPage.getInitialProps = async ({
  query,
}: NextPageContext): Promise<Props> => {
  const { page = "1", limit = "15" } = query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  return { page: pageNumber, limit: limitNumber };
};

export default PublicWishListPage;
