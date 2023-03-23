import ActionButton from "@/components/actions/button/ActionButton";
import ShopInfoButton from "@/components/actions/button/ShopInfoButton";
import ShopPasswordButton from "@/components/actions/button/ShopPasswordButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import Backdrop from "@/components/ui/Backdrop";
import Banned from "@/components/ui/Banned";
import ProductGrid from "@/components/ui/grid/ProductGrid";
import Loading from "@/components/ui/Loading";
import ModalAddProduct from "@/components/ui/modal/ModalAddProduct";
import { useAxios } from "@/hooks/useAxios";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { IProductData } from "@/interfaces/IProduct";
import AuthContext from "@/store/Authcontext";
import { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import style from "../../components/styles/Shop.module.scss";

interface Props {
  page: number;
}

const MyShop: NextPage<Props> = ({ page }) => {
  const authCtx: any = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(page);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const [newProduct, setNewProduct] = useState<IProductData>();
  const [uploadStatus, setUploadStatus] = useState("");

  let url =
    process.env.BASE_URL +
    `product/get?id=${authCtx.user["ID"]}&page=${currentPage}`;

  let url2 = process.env.BASE_URL + `shop/get-shop?id=${authCtx.user["ID"]}`;
  let url3 =
    process.env.BASE_URL +
    `product/insert-new-product?id=${authCtx.user["ID"]}`;
  let url4 =
    process.env.BASE_URL + `product/update-product?id=${authCtx.user["ID"]}`;

  let url5 = process.env.BASE_URL + `product/remove-product`;

  //get all products
  const [loading, product, error, request] = useAxios(
    {
      method: "GET",
      url: url,
    },
    false
  );

  //get current shop details
  const [shopLoading, shop, shopError, shopRequest] = useAxios(
    {
      method: "GET",
      url: url2,
    },
    false
  );

  //add product
  const [
    addProductLoading,
    successAddProduct,
    errorAddProduct,
    addProductRequest,
  ] = useAxiosPost({
    method: "POST",
    url: url3,
  });

  //update product
  const [
    updateProductLoading,
    successUpdateProduct,
    errorUpdateProduct,
    updateProductRequest,
  ] = useAxiosPost({
    method: "POST",
    url: url4,
  });

  const [
    deleteProductLoading,
    successDeleteProduct,
    errorDeleteProduct,
    deleteProductRequest,
  ] = useAxiosPost({
    method: "POST",
    url: url5,
  });

  //get all products
  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
    }
  }, [
    authCtx.user["ID"],
    currentPage,
    successAddProduct,
    successUpdateProduct,
    successDeleteProduct,
  ]);

  //get current shop details
  useEffect(() => {
    if (authCtx.user["ID"]) {
      shopRequest();
    }
  }, [authCtx.user["ID"]]);

  //successfully added product
  useEffect(() => {
    if (successAddProduct) {
      alert("Successfully Added Product...");
      closeAddModalHandler();
      setNewProduct(undefined);
    }

    if (errorAddProduct) {
      alert(errorAddProduct);
    }
  }, [successAddProduct, errorAddProduct]);

  //successfully updated product
  useEffect(() => {
    if (successUpdateProduct) {
      alert("Successfully Update Product...");
      closeUpdateModalHandler();
      setNewProduct(undefined);
    }

    if (errorUpdateProduct) {
      alert(errorUpdateProduct);
    }
  }, [successUpdateProduct, errorUpdateProduct]);

  //image upload
  useEffect(() => {
    if (uploadStatus === "Success Add") {
      addProductRequest(newProduct);
    } else if (uploadStatus === "Success Update") {
      updateProductRequest(newProduct);
    } else if (uploadStatus === "Error") {
      alert("Failed uploading image...");
    }
  }, [uploadStatus]);

  function showAddModalHandler() {
    setAddModalIsOpen(true);
  }

  function closeAddModalHandler() {
    setAddModalIsOpen(false);
  }

  function showUpdateModalHandler() {
    setUpdateModalIsOpen(true);
  }

  function closeUpdateModalHandler() {
    setAddModalIsOpen(false);
  }

  function addHandler(
    ProductCategoryID: number,
    Name: string,
    Description: string,
    Price: number,
    Stock: number,
    Details: string
  ) {
    const link =
      process.env.STORAGE_URL +
      "product%2F" +
      authCtx.user["Email"] +
      "%2F" +
      Name +
      "%2Fimage?alt=media";

    setNewProduct({
      ShopID: authCtx.user["ID"],
      ProductCategoryID: ProductCategoryID,
      Name: Name,
      Image: link,
      Description: Description,
      Price: Price,
      Stock: Stock,
      Details: Details,
    });
  }

  function updateHandler({
    ID,
    ShopID,
    ProductCategoryID,
    Name,
    Image,
    Description,
    Price,
    Stock,
    Details,
  }: IProductData) {
    const link =
      process.env.STORAGE_URL +
      "product%2F" +
      authCtx.user["Email"] +
      "%2F" +
      Name +
      "%2Fimage?alt=media";

    setNewProduct({
      ID: ID,
      ShopID: ShopID,
      ProductCategoryID: ProductCategoryID,
      Name: Name,
      Image: Image,
      Description: Description,
      Price: Price,
      Stock: Stock,
      Details: Details,
    });
  }

  function deleteHandler({ ID, ShopID }: IProductData) {
    deleteProductRequest({ id: ID, shopid: ShopID });
  }

  return (
    <Layout>
      <main className={style.myshop_container}>
        <div className={style.shop_banner_container}>
          <div className={style.left_profile}>
            {shop && (
              <Image
                className={style.image}
                src={shop["Image"]}
                alt={shop["Name"]}
                height={90}
                width={90}
              />
            )}

            <div className={style.inner_profile}>
              <p className={style.name}>{shop && shop["Name"]}</p>
              <div className={style.inner_profile_details}>
                <p>Number of Sales : {shop && shop["Sales"]}</p>
                <p>About Us : {shop && shop["Description"]}</p>
                <p>Average Rating : {shop && shop["AverageRating"]}</p>
              </div>
            </div>
          </div>
          <div className={style.shop_action_container}>
            <ShopPasswordButton email={authCtx.user["Email"]} />
            <ShopInfoButton
              email={authCtx.user["Email"]}
              reload={shopRequest}
            />
          </div>
        </div>
        <div className={style.shop_banner_bottom}>
          {product && (
            <SelectPage
              currentPage={currentPage}
              setPage={setCurrentPage}
              reload={request}
              count={product.count}
              shop
            />
          )}

          <p>
            {"Products : "}
            {product && product.count}
            {!product && "0"}
          </p>
          <ActionButton add onClick={showAddModalHandler} />
        </div>
        {shop && shop["Status"] === "Banned" && <Banned />}

        {loading && <Loading />}

        {(addModalIsOpen || updateModalIsOpen) && (
          <Backdrop
            exitHandler={
              addModalIsOpen ? closeAddModalHandler : closeUpdateModalHandler
            }
          />
        )}
        {addModalIsOpen && (
          <ModalAddProduct
            onCancel={closeAddModalHandler}
            onConfirm={addHandler}
            setUploadStatus={setUploadStatus}
            shopID={authCtx.user["ID"]}
            email={authCtx.user["Email"]}
          />
        )}
        {/* {updateModalIsOpen && <ModalUpdateProduct />} */}
        {error && error}

        {product && <ProductGrid data={product} reload={request} />}
      </main>
    </Layout>
  );
};

MyShop.getInitialProps = async ({ query }) => {
  const { page = "1" } = query;
  const pageNumber = parseInt(page as string, 10);
  return { page: pageNumber };
};

export default MyShop;
