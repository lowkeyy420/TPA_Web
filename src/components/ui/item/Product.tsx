import { IProductData } from "@/interfaces/IProduct";
import AuthContext from "@/store/Authcontext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import style from "../../styles/UI.module.scss";
import Backdrop from "../Backdrop";
import ModalProductDetail from "../modal/ModalProductDetail";
import ModalUpdateProduct from "../modal/ModalUpdateProduct";

type MyProps = IProductData | any;

function Product(props: MyProps) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const authCtx: any = useContext(AuthContext);

  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  let timeout: any = null;

  function toggleModalHandler() {
    setModalIsOpen(!modalIsOpen);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function addCartHandler(ID: number) {
    if (!authCtx.isLoggedIn) {
      alert("Please login first");
      return;
    }

    console.log(ID);
  }

  function redirectPageHandler(ID: number) {
    router.push(`/product/${ID}`);
  }

  function refreshPage() {
    props.reload();
  }

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setDetailModalIsOpen(true);
    }, 2000); // Show modal after 2 seconds
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setDetailModalIsOpen(false);
  };

  return (
    <div
      className={style.product_outer_container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      {modalIsOpen && (
        <ModalUpdateProduct
          onCancel={closeModalHandler}
          productID={props.ID}
          refreshPage={refreshPage}
        />
      )}

      <div className={style.product_container}>
        {detailModalIsOpen && (
          <ModalProductDetail
            ID={props.ID}
            Details={props.Details}
            Image={props.Image}
            Name={props.Name}
            Description={props.Description}
          />
        )}
        {props.Image && (
          <Image
            priority
            src={props.Image}
            alt={props.ID}
            width="200"
            height="200"
            className={style.image}
            onClick={() => redirectPageHandler(props.ID)}
          />
        )}
        <p>{props.ProductCategoryName}</p>

        <p>{props.Name}</p>
        <p>{props.Details}</p>
        <p className={style.price}>${props.Price}</p>
        {props.Stock < 1 && (
          <p style={{ color: "red", fontWeight: "bolder" }}>Out Of Stock</p>
        )}
        {props.Stock >= 1 && <p>Stock : {props.Stock}</p>}

        <div className={style.product_action_container}>
          {props.update && (
            <button className={style.updateBtn} onClick={toggleModalHandler}>
              Update
            </button>
          )}
          {props.cart && (
            <button
              className={style.cartBtn}
              onClick={() => addCartHandler(props.ID)}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
