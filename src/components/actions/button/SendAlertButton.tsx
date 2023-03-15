import style from "../../styles/Button.module.scss";

interface Myprops {
  name: string;
  foo?: any;
}

function SendAlertButton(props: Myprops) {
  function clickHandler() {
    props.foo();
  }

  return (
    <button onClick={clickHandler} className={style.alertBtn}>
      {props.name}
    </button>
  );
}

export default SendAlertButton;
