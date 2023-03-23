import Backdrop from "@/components/ui/Backdrop";
import ModalShopPassword from "@/components/ui/modal/ModalShopPassword";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import React, { useEffect, useState } from "react";
import style from "../../styles/Button.module.scss";

interface MyProps {
  email: string;
}

function ShopPasswordButton({ email }: MyProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const url = process.env.BASE_URL + "shop/change-password";

  const [loading, success, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  useEffect(() => {
    if (success) {
      alert(success.message);
      closeModalHandler();
    } else if (error) {
      alert(error);
    }
  }, [success, error]);

  function toggleModalHandler() {
    setModalIsOpen(!modalIsOpen);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function updatePasswordHandler(oldPassword: string, newPassword: string) {
    request({
      Email: email,
      OldPassword: oldPassword,
      NewPassword: newPassword,
    });
  }

  return (
    <>
      {modalIsOpen && (
        <ModalShopPassword
          onCancel={closeModalHandler}
          onConfirm={updatePasswordHandler}
        />
      )}
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      <button onClick={toggleModalHandler} className={style.shop_actionBtn}>
        Change Password
      </button>
    </>
  );
}

export default ShopPasswordButton;
