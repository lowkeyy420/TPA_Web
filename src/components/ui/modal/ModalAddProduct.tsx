import React, { FormEvent, useRef, useState } from "react";
import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";
import FileUpload from "../FileUploader";
import { useAxios } from "@/hooks/useAxios";

type MyProps = {
  action?: string;
  shopID: number;
  email: string;
  onConfirm?: any;
  onCancel: any;
  setUploadStatus: any;
};

function ModalAddProduct({
  action,
  shopID,
  email,
  onConfirm,
  onCancel,
  setUploadStatus,
}: MyProps) {
  const categoryInputRef = useRef<HTMLInputElement | any>();
  const [name, setName] = useState("");
  const descriptionInputRef = useRef<HTMLInputElement | any>();
  const stockInputRef = useRef<HTMLInputElement | any>();
  const priceInputRef = useRef<HTMLInputElement | any>();
  const detailsInputRef = useRef<HTMLInputElement | any>();

  const [reload, setReload] = useState(false);

  let url = process.env.BASE_URL + `product/get-categories`;

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();

    onConfirm(
      parseFloat(categoryInputRef.current.value),
      name,
      descriptionInputRef.current.value,
      parseFloat(priceInputRef.current.value),
      parseFloat(stockInputRef.current.value),
      detailsInputRef.current.value
    );

    setReload(false);
    setReload(true);
  }

  const [loading, category, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Add New Product</p>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <textarea
          placeholder="Description"
          ref={descriptionInputRef}
          required
        />
        <select required ref={categoryInputRef}>
          {category &&
            category.data.map((ctg: any) => {
              return (
                <option key={ctg["ID"]} value={ctg["ID"]}>
                  {ctg["ProductCategoryName"]}
                </option>
              );
            })}
        </select>
        <input type="number" placeholder="Stock" required ref={stockInputRef} />
        <input type="number" placeholder="Price" required ref={priceInputRef} />
        <input
          type="text"
          placeholder="Details"
          required
          ref={detailsInputRef}
        />
        <FileUpload
          email={email}
          setUploadStatus={setUploadStatus}
          reload={reload}
          product
          add
          name={name}
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

export default ModalAddProduct;
