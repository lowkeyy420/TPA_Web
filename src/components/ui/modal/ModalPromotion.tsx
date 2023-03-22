import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";
import { FormEvent, useRef } from "react";

type MyProps = {
  add?: boolean;
  onConfirm?: any;
  onCancel: any;
  setFile: any;
};

function ModalPromotion(props: MyProps) {
  const AltInputRef = useRef<HTMLInputElement | any>();

  function exitHandler() {
    props.onCancel();
  }

  function changeHandler(e: any) {
    props.setFile(e.target.files[0]);
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();

    const alt = AltInputRef.current.value;

    props.onConfirm(alt);
  }

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Add New Promotion</p>
        <input type="file" name="file" onChange={changeHandler} required />
        <input type="text" placeholder="Details" required ref={AltInputRef} />
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

export default ModalPromotion;
