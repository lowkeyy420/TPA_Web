import { IProductData } from "@/interfaces/IProduct";
import Image from "next/image";
import { useState } from "react";
import style from "../../styles/UI.module.scss";
import Backdrop from "../Backdrop";
import ModalUpdateProduct from "../modal/ModalUpdateProduct";

type MyProps = IProductData | any;

function Product(props: MyProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleModalHandler() {
    setModalIsOpen(!modalIsOpen);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function addCartHandler(ID: number) {
    console.log(ID);
  }

  function refreshPage() {
    props.reload();
  }

  return (
    <div className={style.product_outer_container}>
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      {modalIsOpen && (
        <ModalUpdateProduct
          onCancel={closeModalHandler}
          productID={props.ID}
          refreshPage={refreshPage}
        />
      )}
      <div className={style.product_container}>
        {props.Image && (
          <Image
            priority
            src={props.Image}
            alt={props.ID}
            width="200"
            height="200"
            className={style.image}
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
