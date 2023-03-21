import ActionButton from "@/components/actions/button/ActionButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import Backdrop from "@/components/ui/Backdrop";
import ShopGrid from "@/components/ui/grid/ShopGrid";
import ModalShop from "@/components/ui/modal/ModalShop";
import { useAxios } from "@/hooks/useAxios";
import { useAxiosPost } from "@/hooks/useAxiosPost";
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
  const [filter, setFilter] = useState("get-all-shop");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let url = process.env.BASE_URL + `shop/${filter}?page=${currentPage}`;
  let url2 = process.env.BASE_URL + `admin/add-shop`;
  let url3 = process.env.BASE_URL + `admin/notify-created-shop`;

  const [loading, shop, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [shoploading, response, errorshop, shoprequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  const [requestloading, sucess, failed, sendemail] = useAxiosPost({
    method: "POST",
    url: url3,
  });

  useEffect(() => {
    request();
  }, [currentPage, response, filter]);

  useEffect(() => {
    if (response) {
      alert("Created shop for " + response["email"]);
      closeModalHandler();
      sendemail({ email: response["email"] });
    }

    if (errorshop) {
      alert(errorshop);
    }
  }, [response, errorshop]);

  useEffect(() => {
    if (sucess) {
      alert("Successfuly notified" + response["email"]);
    }
    if (failed) {
      alert("Failed notifying");
    }
  }, [sucess, failed]);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function filterByBanned() {
    setFilter("get-banned-shop");
    setCurrentPage(1);
  }

  function filterByActive() {
    setFilter("get-active-shop");
    setCurrentPage(1);
  }

  function unsetFilter() {
    setFilter("get-all-shop");
    setCurrentPage(1);
  }

  function newShopHandler(
    name: string,
    email: string,
    password: string,
    description: string,
    image: string
  ) {
    shoprequest({
      Name: name,
      Email: email,
      Password: password,
      Description: description,
      Image:
        "https://firebasestorage.googleapis.com/v0/b/tpa-web-a33b2.appspot.com/o/promotions%2Ffilename?alt=media",
    });
  }

  return (
    <Layout>
      {modalIsOpen && (
        <ModalShop onCancel={closeModalHandler} onConfirm={newShopHandler} />
      )}
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      <div className={style.manage_top_action}>
        {shop && (
          <SelectPage
            currentPage={currentPage}
            setPage={setCurrentPage}
            reload={request}
            count={shop.count}
          />
        )}

        <ActionButton onClick={openModalHandler} add />
        <div className={style.filter_container}>
          <ActionButton onClick={unsetFilter} text="Unset" />
          <ActionButton onClick={filterByBanned} text="Banned" />
          <ActionButton onClick={filterByActive} text="Active" />
        </div>
      </div>

      <main className={style.manage_container}>
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
