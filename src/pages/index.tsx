import HomeCategory from "@/components/actions/HomeCategory";
import Layout from "@/components/layout/Layout";
import Carousel from "@/components/ui/Carousel";
import { useAxios } from "@/hooks/useAxios";
import style from "../components/styles/UI.module.scss";

export default function HomePage() {
  const url = process.env.BASE_URL + "promotion/get-all-promotion";
  const [loading, slides, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <>
      <Layout>
        <div className={style.category_outer_container}>
          <HomeCategory title="Components & Storage" />
          <HomeCategory title="Computer Systems" />
          <HomeCategory title="Computer Peripherals" />
          <HomeCategory title="Appliances" />
          <HomeCategory title="TV & Home Theater" />
          <HomeCategory title="Electronics" />
          <HomeCategory title="Gaming & VR" />
          <HomeCategory title="Networking" />
          <HomeCategory title="Smart Home & Security" />
          <HomeCategory title="Office Solutions" />
          <HomeCategory title="Software & Services" />
          <HomeCategory title="Automotive & Tools" />
          <HomeCategory title="Home & Outdoors" />
          <HomeCategory title="Health & Sports" />
          <HomeCategory title="Toys, Drones & Maker" />
        </div>
        {slides && <Carousel slides={slides} />}
        {error && <h1>{error}</h1>}
        {loading && <h1>Loading...</h1>}
        <h1>Home Page</h1>
      </Layout>
    </>
  );
}
