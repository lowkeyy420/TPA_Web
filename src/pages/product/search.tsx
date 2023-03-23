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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import style from "../../components/styles/Shop.module.scss";

interface Props {
  page: number;
  keyword: any;
}

const Search: NextPage<Props> = ({ page, keyword }) => {
  const authCtx: any = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(page);
  const [keyWord, setkeyWord] = useState(keyword);
  const [innerKeyWord, setInnerKeyWord] = useState("");
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  let url = process.env.BASE_URL + `product/search?page=${currentPage}`;

  let url2 = process.env.BASE_URL + `save-query`;

  const [loading, product, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  const [saveloading, save, saveerror, saverequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  useEffect(() => {
    request({
      Keyword: keyword,
      InnerKeyword: innerKeyWord,
      IsAvailableOnly: isAvailableOnly,
    });
  }, [currentPage, keyWord, innerKeyWord, isAvailableOnly]);

  useEffect(() => {
    if (!saveloading) {
      if (save) {
        alert(save.message);
      }
      if (saveerror) {
        alert(saveerror);
      }
    }
  }, [saveloading]);

  function saveQueryHandler() {
    saverequest({
      Email: authCtx.user["Email"],
      Keyword: keyword,
      InnerKeyword: innerKeyWord,
      IsAvailableOnly: isAvailableOnly,
    });
  }

  function reload() {
    request({
      Keyword: keyword,
      InnerKeyword: innerKeyWord,
      IsAvailableOnly: isAvailableOnly,
    });
  }

  return (
    <Layout>
      <main className={style.searchpage_container}>
        <div className={style.top_action_container}>
          {product && (
            <SelectPage
              currentPage={currentPage}
              setPage={setCurrentPage}
              count={product["count"]}
              reload={reload}
            />
          )}

          <div className={style.search}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search Results.."
              onChange={(e) => setInnerKeyWord(e.target.value)}
            />
            <label htmlFor="search">
              <FontAwesomeIcon icon={faSearch} className={style.logo} />
            </label>
          </div>
          <button
            className={style.filterBtn}
            onClick={() => setIsAvailableOnly(!isAvailableOnly)}
          >
            Filter By Availability
          </button>

          <button className={style.filterBtn} onClick={saveQueryHandler}>
            Save Search Query
          </button>
        </div>

        {product && product["data"] && (
          <ProductGrid data={product} reload={request} cart />
        )}
      </main>
    </Layout>
  );
};

Search.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const { page = "1", keyword = "" } = query;
  const pageNumber = parseInt(page as string, 10);
  const searchKeyword = Array.isArray(keyword) ? keyword[0] : keyword;
  return { page: pageNumber, keyword: searchKeyword };
};

export default Search;
