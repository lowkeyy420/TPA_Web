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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let url = process.env.BASE_URL + `shop/get-all-shop?page=${currentPage}`;
  let url2 = process.env.BASE_URL + `admin/add-shop`;

  const [loading, shop, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [shoploading, response, errorshop, shoprequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  useEffect(() => {
    request();
  }, [currentPage, response]);

  useEffect(() => {
    if (response) {
      alert("Created shop for " + response["email"]);
    }

    if (errorshop) {
      alert(errorshop);
    }
  }, [response, errorshop]);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
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
        "https://www.google.co.id/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png",
    });
  }

  return (
    <Layout>
      {loading && <h1>Loading</h1>}
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
      </div>

      <main className={style.mu_container}>
        {error && error}
        {shop && <ShopGrid />}
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
