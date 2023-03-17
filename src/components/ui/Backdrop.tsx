import style from "../styles/UI.module.scss";

type MyProps = {
  exitHandler: any;
};

function Backdrop(props: MyProps) {
  function closeModalHandler() {
    props.exitHandler();
  }

  return <div className={style.backdrop} onClick={closeModalHandler} />;
}

export default Backdrop;
