import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext } from "react";
import style from "../../components/styles/Shop.module.scss";

function ShopInfoPage() {
  const authCtx: any = useContext(AuthContext);

  return (
    <Layout>
      <main className={style.myshop_container}>
        <div className={style.shop_banner_container}>
          <div className={style.left_profile}>
            <Image
              className={style.image}
              src={authCtx.user["Image"]}
              alt={authCtx.user["Name"]}
              height={90}
              width={90}
            />
            <div className={style.inner_profile}>
              <p className={style.name}>{authCtx.user["Name"]}</p>
              <div className={style.inner_profile_details}>Old Egg</div>

              <div className={style.inner_profile_button_container}>
                <button className={style.innerBtn}>Follow</button>
                <button className={style.innerBtn}>Contact</button>
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
        <div className={style.shop_banner_bottom}></div>
        <Image
          priority
          className={style.banner_img}
          src={authCtx.user["Image"]}
          alt={authCtx.user["Name"]}
          height={1920}
          width={1080}
        />
        Something
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
      </main>
    </Layout>
  );
}

export default ShopInfoPage;
