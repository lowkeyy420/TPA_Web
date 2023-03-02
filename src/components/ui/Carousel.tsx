import { useAxios } from "@/hooks/useAxios";
import { ImageSlider, sliderAction } from "@/interfaces/ICarousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../styles/Carousel.module.scss";

const delay = 2500;

function Carousel({ slides }: ImageSlider) {
  let [currIdx, setCurrIdx] = useState(0);

  const url = process.env.BASE_URL + "getPromotion";
  const [loading, data, error, request] = useAxios(
    { method: "GET", url: url },
    false
  );

  useEffect(() => {
    setTimeout(
      () =>
        setCurrIdx((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
  }, [currIdx]);

  const changeSlideHandler = (type: sliderAction) => {
    switch (type) {
      case sliderAction.ADD:
        if (currIdx < slides.length - 1) {
          setCurrIdx(currIdx + 1);
        } else if (currIdx === slides.length - 1) {
          setCurrIdx(0);
        }
        break;
      case sliderAction.SUBTRACT:
        if (currIdx > 0) {
          setCurrIdx(currIdx - 1);
        } else if (currIdx === 0) {
          setCurrIdx(slides.length - 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.carousel_container}>
      <button
        className={style.carousel_button_left}
        onClick={() => {
          changeSlideHandler(sliderAction.SUBTRACT);
        }}
      >
        &lt;
      </button>
      <Image src={slides[currIdx].url} alt={slides[currIdx].alt} />
      {/* <div
        style={{
          backgroundImage: `url(${slides[currIdx].url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.3s ease-in-out",
          width: "100vw",
          height: "70vh",
        }}
      >
      </div> */}
      <button
        className={style.carousel_button_right}
        onClick={() => {
          changeSlideHandler(sliderAction.ADD);
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default Carousel;
