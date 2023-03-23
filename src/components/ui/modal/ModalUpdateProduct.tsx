import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "../../styles/UI.module.scss";
import btn from "../../styles/Button.module.scss";
import FileUpload from "../FileUploader";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { useAxiosPost } from "@/hooks/useAxiosPost";

type MyProps = {
  action?: string;
  productID: number;
  onConfirm?: any;
  onCancel: any;
  refreshPage: any;
};

function ModalUpdateProduct({
  action,
  productID,
  onConfirm,
  onCancel,
  refreshPage,
}: MyProps) {
  const categoryInputRef = useRef<HTMLInputElement | any>();
  const [name, setName] = useState("");
  const descriptionInputRef = useRef<HTMLInputElement | any>();
  const stockInputRef = useRef<HTMLInputElement | any>();
  const priceInputRef = useRef<HTMLInputElement | any>();
  const detailsInputRef = useRef<HTMLInputElement | any>();

  const [reload, setReload] = useState(false);
  const authCtx: any = useContext(AuthContext);

  const [uploadStatus, setUploadStatus] = useState("");

  const [updatedProduct, setUpdatedProduct] = useState<any>();

  let url = process.env.BASE_URL + `product/get-categories`;
  let url2 = process.env.BASE_URL + "product/update-product";

  function exitHandler() {
    onCancel();
  }

  function confirmHandler(e: FormEvent) {
    e.preventDefault();
    const storageURL =
      process.env.STORAGE_URL +
      "product%2F" +
      authCtx.user["Email"] +
      "%2F" +
      name +
      "%2Fimage?alt=media";

    setUpdatedProduct({
      ID: productID,
      ShopID: authCtx.user["ID"],
      ProductCategoryID: parseFloat(categoryInputRef.current.value),
      Name: name,
      Image: storageURL,
      Description: descriptionInputRef.current.value,
      Price: parseFloat(priceInputRef.current.value),
      Stock: parseFloat(stockInputRef.current.value),
      Details: detailsInputRef.current.value,
    });

    setReload(false);
    setReload(true);
  }

  const [loading, category, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  //update product

  const [
    updateProductLoading,
    successUpdateProduct,
    errorUpdateProduct,
    updateProductRequest,
  ] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  //successfully updated product
  useEffect(() => {
    if (uploadStatus === "Success Update") {
      updateProductRequest(updatedProduct);
    }

    if (uploadStatus === "Error") {
      alert("Failed updating product");
    }
  }, [uploadStatus]);

  //successfully updated product
  useEffect(() => {
    if (successUpdateProduct) {
      alert("Successfully Update Product...");
      exitHandler();
      refreshPage();
    }

    if (errorUpdateProduct) {
      alert(errorUpdateProduct);
    }
  }, [successUpdateProduct, errorUpdateProduct]);

  return (
    <div className={style.modal}>
      <form className={style.modal_form_container} onSubmit={confirmHandler}>
        <p>Update Product</p>

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

        {authCtx.user && (
          <FileUpload
            email={authCtx.user["Email"]}
            setUploadStatus={setUploadStatus}
            reload={reload}
            product
            update
            name={name}
          />
        )}

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

export default ModalUpdateProduct;
