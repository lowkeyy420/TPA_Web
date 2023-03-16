import SendAlertButton from "@/components/actions/button/SendAlertButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import UserGrid from "@/components/ui/UserGrid";
import { useAxios } from "@/hooks/useAxios";
import { ICurrUser } from "@/interfaces/IUser";
import { NextPage } from "next";
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
      <div className={style.manage_top_action}>
        {user && (
          <SelectPage
            currentPage={currentPage}
            setPage={setCurrentPage}
            reload={request}
            count={user.count}
          />
        )}

        <SendAlertButton
          email
          foo={() => {
            console.log("test");
          }}
        />
      </div>

      <main className={style.manage_container}>
        {error && error}
        {user && <UserGrid data={user} reload={request} />}
      </main>
    </Layout>
  );
};

ManageUser.getInitialProps = async ({ query }) => {
  const { page = "1" } = query;
  const pageNumber = parseInt(page as string, 10);
  return { page: pageNumber };
};

export default ManageUser;
