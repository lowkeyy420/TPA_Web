import style from "../styles/UI.module.scss";

type MyProps = {
  action: string;
  onConfirm?: any;
  onCancel: any;
};

function ModalPromotion(props: MyProps) {
  function exitHandler() {
    props.onCancel();
  }

  function confirmHandler() {}

  return (
    <div className={style.modal}>
      <form>
        <p></p>
        <button type="button" className={style.btn} onClick={exitHandler}>
          Cancel
        </button>
        <button
          type="button"
          className={style.btn_alt}
          onClick={confirmHandler}
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default ModalPromotion;
