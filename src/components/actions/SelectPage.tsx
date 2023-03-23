import { ITEM_PER_PAGE } from "@/interfaces/Config";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles/Action.module.scss";

interface MyProps {
  currentPage: number;
  setPage: any;
  reload: any;
  count: number;
  shop?: boolean;
}

function SelectPage(props: MyProps) {
  let totalPage: number = Math.ceil(props.count / ITEM_PER_PAGE);
  const PRODUCT_PER_PAGE = 50;

  if (props.shop) {
    totalPage = Math.ceil(props.count / PRODUCT_PER_PAGE);
  }

  function previousPageHandler(jump?: boolean | any) {
    if (props.currentPage === 1) {
      return;
    }

    if (jump === true) {
      if (props.currentPage === 1) return;
      props.setPage(1);
      props.reload();
      return;
    }
    props.setPage(props.currentPage - 1);
  }

  function nextPageHandler(jump?: boolean | any) {
    if (props.currentPage >= totalPage) {
      props.setPage(totalPage);
      return;
    }

    if (jump === true) {
      if (props.currentPage === totalPage) return;
      props.setPage(totalPage);
      props.reload();
      return;
    }

    props.setPage(props.currentPage + 1);
  }

  return (
    <div className={style.page_action_container}>
      <button
        className={style.page_prev}
        onClick={() => previousPageHandler(true)}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} height="25" />
      </button>
      <button
        className={style.page_prev}
        onClick={() => previousPageHandler(false)}
      >
        <FontAwesomeIcon icon={faAngleLeft} height="25" />
      </button>
      {props.currentPage}
      <button
        className={style.page_next}
        onClick={() => nextPageHandler(false)}
      >
        <FontAwesomeIcon icon={faAngleRight} height="25" />
      </button>
      <button className={style.page_next} onClick={() => nextPageHandler(true)}>
        <FontAwesomeIcon icon={faAngleDoubleRight} height="25" />
      </button>
    </div>
  );
}

export default SelectPage;
