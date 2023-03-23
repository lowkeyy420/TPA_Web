import ActionButton from "@/components/actions/button/ActionButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import Backdrop from "@/components/ui/Backdrop";
import ShopGrid from "@/components/ui/grid/ShopGrid";
import ModalShop from "@/components/ui/modal/ModalShop";
import { useAxios } from "@/hooks/useAxios";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { ICurrShop, IShopData } from "@/interfaces/IShop";
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

  const [newShop, setNewShop] = useState<IShopData>();
  const [uploadStatus, setUploadStatus] = useState("");

  let url = process.env.BASE_URL + `shop/${filter}?page=${currentPage}`;
  let url2 = process.env.BASE_URL + `admin/add-shop`;
  let url3 = process.env.BASE_URL + `admin/notify-created-shop`;

  //get all shops
  const [loading, shop, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  //add shop
  const [shopLoading, successShop, errorShop, shopRequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  //notify user
  const [requestloading, successEmail, errorEmail, sendEmail] = useAxiosPost({
    method: "POST",
    url: url3,
  });

  useEffect(() => {
    request();
  }, [currentPage, successShop, filter]);

  useEffect(() => {
    if (successShop) {
      alert("Created shop for " + successShop["email"]);
      closeModalHandler();
      sendEmail({ email: successShop["email"] });
    }

    if (errorShop) {
      alert(errorShop);
    }
  }, [successShop, errorShop]);

  useEffect(() => {
    if (successEmail) {
      alert("Successfuly notified" + successShop["email"]);
    }
    if (errorEmail) {
      alert("Failed notifying");
    }
  }, [successEmail, errorEmail]);

  useEffect(() => {
    if (uploadStatus === "Success") {
      shopRequest(newShop);
    } else if (uploadStatus === "Error") {
      alert("Failed uploading image...");
    }
  }, [uploadStatus]);

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
    description: string
  ) {
    const link =
      process.env.STORAGE_URL + "shop%2F" + email + "%2Fimage?alt=media";

    setNewShop({
      Name: name,
      Email: email,
      Password: password,
      Description: description,
      Image: link,
    });
  }

  return (
    <Layout>
      {modalIsOpen && (
        <ModalShop
          onCancel={closeModalHandler}
          onConfirm={newShopHandler}
          setUploadStatus={setUploadStatus}
        />
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
