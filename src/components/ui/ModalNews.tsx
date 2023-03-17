import { FormEvent, useRef } from "react";
import style from "../styles/UI.module.scss";
import btn from "../styles/Button.module.scss";

type MyProps = {
  action?: string;
  onConfirm?: any;
  onCancel: any;
};

function ModalNews({ action = "add", onConfirm, onCancel }: MyProps) {
  const subjectInputRef = useRef<HTMLInputElement | any>();
  const contentInputRef = useRef<HTMLInputElement | any>();

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();

    onConfirm(subjectInputRef.current.value, contentInputRef.current.value);
  }

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>send news</p>

        <input
          type="text"
          placeholder="Subject"
          ref={subjectInputRef}
          required
        />

        <textarea placeholder="Content" ref={contentInputRef} required />

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

export default ModalNews;
