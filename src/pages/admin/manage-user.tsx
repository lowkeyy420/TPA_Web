import SendAlertButton from "@/components/actions/button/SendAlertButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import Loading from "@/components/ui/Loading";
import UserGrid from "@/components/ui/UserGrid";
import { useAxios } from "@/hooks/useAxios";
import { ITEM_PER_PAGE } from "@/interfaces/IGlobal";
import { ICurrUser } from "@/interfaces/IUserData";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MyProps {
  user: ICurrUser;
  count: number;
}

interface Props {
  page: number;
}

const ManageUser: NextPage<Props> = ({ page }) => {
  const [currentPage, setCurrentPage] = useState(page);
  let url = process.env.BASE_URL + `admin/get-all-user?page=${currentPage}`;

  const [loading, user, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  useEffect(() => {
    request();
  }, [currentPage]);

  return (
    <Layout>
      {user && (
        <SelectPage
          currentPage={currentPage}
          setPage={setCurrentPage}
          reload={request}
          count={user.count}
        />
      )}

      <main className={style.mu_container}>
        {loading && <Loading />}
        {error && error}
        {user && <UserGrid data={user} reload={request} />}
      </main>
      <SendAlertButton
        name="Button"
        foo={() => {
          console.log("test");
        }}
      />
    </Layout>
  );
};

ManageUser.getInitialProps = async ({ query }) => {
  const { page = "1" } = query;
  const pageNumber = parseInt(page as string, 10);
  return { page: pageNumber };
};

export default ManageUser;
