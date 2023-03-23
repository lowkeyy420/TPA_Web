import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import Backdrop from "@/components/ui/Backdrop";
import Banned from "@/components/ui/Banned";
import Loading from "@/components/ui/Loading";
import ModalAddProduct from "@/components/ui/modal/ModalAddProduct";
import ModalUpdateProduct from "@/components/ui/modal/ModalUpdateProduct";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import style from "../../components/styles/Shop.module.scss";

function MyShop() {
  const authCtx: any = useContext(AuthContext);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let url =
    process.env.BASE_URL +
    `product/get?id=${authCtx.user["ID"]}&page=${currentPage}`;

  let url2 = process.env.BASE_URL + `shop/get-shop?id=${authCtx.user["ID"]}`;

  const [loading, product, error, request] = useAxios(
    {
      method: "GET",
      url: url,
    },
    false
  );

  const [shopLoading, shop, shopError, shopRequest] = useAxios(
    {
      method: "GET",
      url: url2,
    },
    false
  );

  useEffect(() => {
    if (authCtx.user["ID"]) {
      request();
    }
  }, [authCtx.user["ID"], currentPage]);

  useEffect(() => {
    if (authCtx.user["ID"]) {
      shopRequest();
    }
  }, [authCtx.user["ID"]]);

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
          <div className={style.search_contaier}>
            <div className={style.search}>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search Store.."
              />
              <label htmlFor="search">
                <FontAwesomeIcon icon={faSearch} className={style.logo} />
              </label>
            </div>
          </div>
        </div>
        <div className={style.shop_banner_bottom}>
          <p>
            {"Products : "}
            {product && product.count}
            {!product && "0"}
          </p>
          <ActionButton add onClick={showAddModalHandler} />
        </div>
        {shop && shop["Status"] === "Banned" && <Banned />}

        {loading && <Loading />}
        {shop && (
          <Image
            priority
            className={style.banner_img}
            src={shop["Image"]}
            alt={shop["Name"]}
            height={1920}
            width={1080}
          />
        )}

        {(addModalIsOpen || updateModalIsOpen) && (
          <Backdrop
            exitHandler={
              addModalIsOpen ? closeAddModalHandler : closeUpdateModalHandler
            }
          />
        )}
        {/* {addModalIsOpen && <ModalAddProduct/>} */}
        {updateModalIsOpen && <ModalUpdateProduct />}
        {error && error}
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
      </main>
    </Layout>
  );
}

export default MyShop;
