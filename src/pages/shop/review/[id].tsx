import Layout from "@/components/layout/Layout";
import Banned from "@/components/ui/Banned";
import PopularDisplayer from "@/components/ui/grid/PopularDisplayer";
import HomeHeader from "@/components/ui/HomeHeader";
import { useAxios } from "@/hooks/useAxios";
import AuthContext from "@/store/Authcontext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import style from "../../../components/styles/Shop.module.scss";

interface Props {
  id: number;
}

const ShopInfoPage: NextPage<Props> = ({ id }) => {
  const authCtx: any = useContext(AuthContext);

  let url = process.env.BASE_URL + `shop/get-shop?id=${id}`;

  const [loading, shop, error, request] = useAxios({
    method: "GET",
    url: url,
  });

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
        <Link href={`/shop/about/${id}`} style={{ textAlign: "center" }}>
          <h2 style={{ padding: "20px", background: "orange" }}>About Us</h2>
        </Link>
        <HomeHeader text="Popular Categories" />
        <PopularDisplayer type="category" />

        <HomeHeader text="Shop Recommendation" />
        {shop && <PopularDisplayer id={shop["ID"]} type="recommendedbyshop" />}
      </main>
    </Layout>
  );
};

ShopInfoPage.getInitialProps = async ({ query }) => {
  const { id = "1" } = query;
  const idNum = parseInt(id as string, 10);
  return { id: idNum };
};

export default ShopInfoPage;
