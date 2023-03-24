import ActionButton from "@/components/actions/button/ActionButton";
import SelectPage from "@/components/actions/SelectPage";
import Layout from "@/components/layout/Layout";
import Banned from "@/components/ui/Banned";
import PopularDisplayer from "@/components/ui/grid/PopularDisplayer";
import ProductGrid from "@/components/ui/grid/ProductGrid";
import HomeHeader from "@/components/ui/HomeHeader";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import style from "../../../components/styles/Shop.module.scss";

interface Props {
  id: number;
  page: number;
}

const ShopProductPage: NextPage<Props> = ({ id, page }) => {
  const authCtx: any = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(page);

  let url = process.env.BASE_URL + `shop/get-shop?id=${id}`;
  let url2 = process.env.BASE_URL + `product/get?id=${id}&page=${currentPage}`;

  const [loading, shop, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  const [productloading, product, producterror, productrequest] = useAxios({
    method: "GET",
    url: url2,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  let filteredProduct;

  if (product) {
    filteredProduct = product.data.filter((item: any) => {
      return (
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  function filerByPrice() {
    filteredProduct = product.data.sort((a: any, b: any) => {
      if (sortOrder) {
        return a.Price - b.Price;
      } else {
        return b.Price - a.Price;
      }
    });
    setSortOrder(!sortOrder);
  }

  return (
    <Layout>
      {shop && shop["Status"] === "Banned" && <Banned />}
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

              <div className={style.inner_profile_button_container}>
                <button className={style.innerBtn}>Follow</button>
                <button className={style.innerBtn}>Contact</button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.shop_banner_bottom}></div>
        {shop && (
          <Image
            className={style.banner_img}
            src={shop["Image"]}
            alt={shop["Name"]}
            height={1920}
            width={1080}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link href={`/shop/${id}`} style={{ padding: "30px 0px" }}>
            <h2 style={{ padding: "20px", background: "orange" }}>Shop Home</h2>
          </Link>
          <Link href={`/shop/about/${id}`} style={{}}>
            <h2 style={{ padding: "20px", background: "orange" }}>About Us</h2>
          </Link>
          <Link href={`/shop/product/${id}`} style={{}}>
            <h2 style={{ padding: "20px", background: "orange" }}>Products</h2>
          </Link>
        </div>
        <div className={style.shop_banner_bottom}>
          {product && (
            <SelectPage
              currentPage={currentPage}
              setPage={setCurrentPage}
              reload={productrequest}
              count={product.count}
              shop
            />
          )}

          <p>
            {"Products : "}
            {product && product.count}
            {!product && "0"}
          </p>

          <Link href={`/shop/review/${id}`}>Shop Review</Link>
          <ActionButton text="Price" onClick={filerByPrice} />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search Products"
        />

        {product && (
          <ProductGrid data={filteredProduct} reload={request} cart />
        )}
      </main>
    </Layout>
  );
};

ShopProductPage.getInitialProps = async ({ query }) => {
  const { id = "1", page = "1" } = query;
  const idNum = parseInt(id as string, 10);
  const pageNum = parseInt(page as string, 10);
  return { id: idNum, page: pageNum };
};

export default ShopProductPage;
