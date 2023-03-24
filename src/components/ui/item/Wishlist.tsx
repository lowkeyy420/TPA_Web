import ActionButton from "@/components/actions/button/ActionButton";
import React, { useState } from "react";
import Backdrop from "../Backdrop";
import ModalUpdateWishlist from "../modal/ModalUpdateWishlist";

interface MyProps {
  data: any;
  reload: any;
}

function Wishlist({ data, reload }: MyProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function showModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "var(--tertiary-color-light)",
        color: "var(--text-color)",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      {modalIsOpen && (
        <ModalUpdateWishlist
          onCancel={closeModalHandler}
          reload={reload}
          id={data.ID}
        />
      )}

      <h2>{data.Name}</h2>
      <h3>{data && data.IsPublic ? "Public" : "Private"}</h3>
      <p>
        Promo Items : {data && data.PromoCount ? `${data.PromoCount}` : "0"}
      </p>
      <p>{data.Description}</p>
      <ActionButton text="Update" onClick={showModalHandler} />
    </div>
  );
}

export default Wishlist;
