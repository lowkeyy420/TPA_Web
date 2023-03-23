import Backdrop from "@/components/ui/Backdrop";
import ModalChangeShop from "@/components/ui/modal/ModalChangeShop";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import React, { useEffect, useState } from "react";
import style from "../../styles/Button.module.scss";

interface MyProps {
  email: string;
  reload: any;
}

function ShopInfoButton({ email, reload }: MyProps) {
  const url = process.env.BASE_URL + "shop/update-shop";

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [uploadStatus, setUploadStatus] = useState("");

  const [shop, setShop] = useState<any>();

  const [loading, success, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  useEffect(() => {
    if (success) {
      alert(success.message);
      closeModalHandler();
      reload();
    } else if (error) {
      alert(error);
    }
  }, [success, error]);

  useEffect(() => {
    if (uploadStatus === "Success") {
      request(shop);
    } else if (uploadStatus === "Error") {
      alert("Failed uploading image...");
    }
  }, [uploadStatus]);

  function toggleModalHandler() {
    setModalIsOpen(!modalIsOpen);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function updateHandler(name: string, description: string) {
    const link =
      process.env.STORAGE_URL + "shop%2F" + email + "%2Fimage?alt=media";
    setShop({
      Name: name,
      Email: email,
      Description: description,
      Image: link,
    });
  }

  return (
    <>
      {modalIsOpen && (
        <ModalChangeShop
          onConfirm={updateHandler}
          onCancel={closeModalHandler}
          setUploadStatus={setUploadStatus}
          email={email}
        />
      )}
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      <button onClick={toggleModalHandler} className={style.shop_actionBtn}>
        Change Information
      </button>
    </>
  );
}

export default ShopInfoButton;
