import SendAlertButton from "@/components/actions/button/SendAlertButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import Backdrop from "@/components/ui/Backdrop";
import ModalNews from "@/components/ui/modal/ModalNews";
import UserGrid from "@/components/ui/grid/UserGrid";
import { useAxios } from "@/hooks/useAxios";
import { useAxiosPost } from "@/hooks/useAxiosPost";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let url = process.env.BASE_URL + `admin/get-all-user?page=${currentPage}`;
  let url2 = process.env.BASE_URL + `admin/send-email-to-subscriber`;

  const [loading, user, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [newsloading, response, errornews, newsrequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  useEffect(() => {
    request();
  }, [currentPage]);

  useEffect(() => {
    if (response) {
      alert(response["message"]);
    }

    if (errornews) {
      alert(errornews);
    }
  }, [response, errornews]);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function sendNews(subject: string, content: string) {
    newsrequest({
      subject: subject,
      body: content,
    });
  }

  return (
    <Layout>
      {newsloading && <h1>Loading</h1>}
      {modalIsOpen && (
        <ModalNews onCancel={closeModalHandler} onConfirm={sendNews} />
      )}
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      <div className={style.manage_top_action}>
        {user && (
          <SelectPage
            currentPage={currentPage}
            setPage={setCurrentPage}
            reload={request}
            count={user.count}
          />
        )}

        <SendAlertButton email onClick={openModalHandler} />
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
