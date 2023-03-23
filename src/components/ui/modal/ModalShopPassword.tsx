import { FormEvent, useRef } from "react";
import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";

type MyProps = {
  action?: string;
  onConfirm?: any;
  onCancel: any;
};

function ModalShopPassword({ action = "add", onConfirm, onCancel }: MyProps) {
  const oldPassInputRef = useRef<HTMLInputElement | any>();
  const newPassInputRef = useRef<HTMLInputElement | any>();

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();

    onConfirm(oldPassInputRef.current.value, newPassInputRef.current.value);
  }

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Change Shop Password</p>

        <input
          type="password"
          placeholder="Old Password"
          ref={oldPassInputRef}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          ref={newPassInputRef}
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

export default ModalShopPassword;
