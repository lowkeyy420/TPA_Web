import SendAlertButton from "@/components/actions/button/SendAlertButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import ShopGrid from "@/components/ui/ShopGrid";
import { useAxios } from "@/hooks/useAxios";
import { ICurrShop } from "@/interfaces/IShop";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface MyProps {
  shop: ICurrShop;
  count: number;
}

interface Props {
  page: number;
}

const ManageShop: NextPage<Props> = ({ page }) => {
  const [currentPage, setCurrentPage] = useState(page);
  let url = process.env.BASE_URL + `admin/get-all-shop?page=${currentPage}`;

  const [loading, shop, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  useEffect(() => {
    request();
  }, [currentPage]);

  return (
    <Layout>
      <div className={style.top_action}>
        {shop && (
          <SelectPage
            currentPage={currentPage}
            setPage={setCurrentPage}
            reload={request}
            count={shop.count}
          />
        )}

        <SendAlertButton
          email
          foo={() => {
            console.log("test");
          }}
        />
      </div>

      <main className={style.mu_container}>
        {error && error}
        {shop && <ShopGrid data={shop} reload={request} />}
      </main>
    </Layout>
  );
};

ManageShop.getInitialProps = async ({ query }) => {
  const { page = "1" } = query;
  const pageNumber = parseInt(page as string, 10);
  return { page: pageNumber };
};

export default ManageShop;
