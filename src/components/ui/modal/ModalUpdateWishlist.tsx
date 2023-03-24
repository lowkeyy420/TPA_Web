import React, { FormEvent, useEffect, useRef, useState } from "react";
import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";
import { useAxiosPost } from "@/hooks/useAxiosPost";

type MyProps = {
  onCancel: any;
  reload: any;
  id: any;
};

function ModalUpdateWishlist({ onCancel, reload, id }: MyProps) {
  const nameInputRef = useRef<HTMLInputElement | any>();
  const privacyInputRef = useRef<HTMLInputElement | any>();
  const descriptionInputRef = useRef<HTMLInputElement | any>();

  let url = process.env.BASE_URL + `wishlist/update-wishlist`;

  const [updateloading, updatesuccess, updateerror, updaterequest] =
    useAxiosPost({
      method: "POST",
      url: url,
    });

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();

    updaterequest({
      ID: id,
      Name: nameInputRef.current.value,
      IsPublic: privacyInputRef.current?.checked,
      Description: descriptionInputRef.current.value,
    });
  }

  useEffect(() => {
    if (!updateloading) {
      if (updatesuccess) {
        alert(updatesuccess.message);
        exitHandler();
        reload();
      }
      if (updateerror) {
        alert(updateerror);
      }
    }
  }, [updateloading]);

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Update Wishlist</p>

        <input type="name" placeholder="Name" ref={nameInputRef} required />
        <div>
          <p style={{ textAlign: "center" }}>Privacy</p>
          <label htmlFor="private">Private</label>
          <input
            type="radio"
            placeholder="Private"
            id="private"
            name="privacy"
            defaultChecked
            style={{ marginLeft: "5px" }}
            ref={privacyInputRef}
          />
          <label htmlFor="public">Public</label>
          <input
            id="public"
            type="radio"
            placeholder="Public"
            name="privacy"
            style={{ marginLeft: "5px" }}
            ref={privacyInputRef}
          />
        </div>
        <textarea
          placeholder="Description"
          ref={descriptionInputRef}
          required
        />
        <div className={style.modal_form_action}>
          <button type="button" className={btn.modalBtn} onClick={exitHandler}>
            Cancel
          </button>
          <button className={btn.modalBtn_ok}>Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default ModalUpdateWishlist;
