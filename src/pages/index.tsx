import HomeCategory from "@/components/actions/HomeCategory";
import Layout from "@/components/layout/Layout";
import Carousel from "@/components/ui/Carousel";
import Loading from "@/components/ui/Loading";
import { useAxios } from "@/hooks/useAxios";
import style from "../components/styles/UI.module.scss";

//icons
import computer from "../assets/categories/computer.png";
import laptop from "../assets/categories/laptop.png";
import keyboard from "../assets/categories/keyboard.png";
import appliances from "../assets/categories/appliances.png";
import tv from "../assets/categories/tv.png";
import headphone from "../assets/categories/headphones.png";
import gaming from "../assets/categories/console.png";
import network from "../assets/categories/wifi-router.png";
import smart_home from "../assets/categories/smart-home.png";
import office from "../assets/categories/printer.png";
import software from "../assets/categories/software.png";
import automotive from "../assets/categories/automotive.png";
import home from "../assets/categories/house.png";
import sport from "../assets/categories/sport.png";
import drone from "../assets/categories/camera-drone.png";

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
          <HomeCategory logo={computer} title="Components & Storage" />
          <HomeCategory logo={laptop} title="Computer Systems" />
          <HomeCategory logo={keyboard} title="Computer Peripherals" />
          <HomeCategory logo={appliances} title="Appliances" />
          <HomeCategory logo={tv} title="TV & Home Theater" />
          <HomeCategory logo={headphone} title="Electronics" />
          <HomeCategory logo={gaming} title="Gaming & VR" />
          <HomeCategory logo={network} title="Networking" />
          <HomeCategory logo={smart_home} title="Smart Home & Security" />
          <HomeCategory logo={office} title="Office Solutions" />
          <HomeCategory logo={software} title="Software & Services" />
          <HomeCategory logo={automotive} title="Automotive & Tools" />
          <HomeCategory logo={home} title="Home & Outdoors" />
          <HomeCategory logo={sport} title="Health & Sports" />
          <HomeCategory logo={drone} title="Toys, Drones & Maker" />
        </div>
        {slides && <Carousel slides={slides} reload={request} />}
        {error && <h1>{error}</h1>}
        {loading && <Loading />}
        <h1>Home Page</h1>
      </Layout>
    </>
  );
}
