import React, { FormEvent, useRef, useState } from "react";
import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";
import FileUpload from "../FileUploader";

type MyProps = {
  action?: string;
  onConfirm?: any;
  onCancel: any;
  setUploadStatus: any;
  email: string;
};

function ModalShop({
  action = "update",
  onConfirm,
  onCancel,
  setUploadStatus,
  email,
}: MyProps) {
  const nameInputRef = useRef<HTMLInputElement | any>();
  const descriptionInputRef = useRef<HTMLInputElement | any>();

  const [reload, setReload] = useState(false);

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();

    onConfirm(nameInputRef.current.value, descriptionInputRef.current.value);

    setReload(!reload);
  }

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Update Shop Info</p>

        <input type="text" placeholder="Name" ref={nameInputRef} required />

        <textarea
          placeholder="Description"
          ref={descriptionInputRef}
          required
        />

        <FileUpload
          email={email}
          setUploadStatus={setUploadStatus}
          reload={reload}
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

export default ModalShop;
