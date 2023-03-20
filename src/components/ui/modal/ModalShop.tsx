import React, { FormEvent, useRef } from "react";
import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";

type MyProps = {
  action?: string;
  onConfirm?: any;
  onCancel: any;
};

function ModalShop({ action = "add", onConfirm, onCancel }: MyProps) {
  const nameInputRef = useRef<HTMLInputElement | any>();
  const emailInputRef = useRef<HTMLInputElement | any>();
  const passwordInputRef = useRef<HTMLInputElement | any>();
  const descriptionInputRef = useRef<HTMLInputElement | any>();

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();
    console.log(nameInputRef.current.value);
    console.log(emailInputRef.current.value);
    console.log(passwordInputRef.current.value);
    console.log(descriptionInputRef.current.value);

    onConfirm(
      nameInputRef.current.value,
      emailInputRef.current.value,
      passwordInputRef.current.value,
      descriptionInputRef.current.value
    );
  }

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Add New Shop</p>

        <input type="text" placeholder="Name" ref={nameInputRef} required />
        <input type="email" placeholder="Email" ref={emailInputRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
          required
        />

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

export default ModalShop;
