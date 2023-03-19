import { ImageSlider, sliderAction } from "@/interfaces/ICarousel";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../styles/Carousel.module.scss";
import emptypic from "../../assets/emptycarousel.jpg";

const delay = 15000;

function Carousel({ slides }: ImageSlider) {
  let [currIdx, setCurrIdx] = useState(0);
  let [timeoutRefresh, setTimeoutRefresh] = useState(false);

  useEffect(() => {
    setTimeout(
      () =>
        setCurrIdx((prevIndex) => {
          setTimeoutRefresh(!timeoutRefresh);
          return prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
        }),
      delay
    );
  }, [timeoutRefresh]);

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
        onClick={() => {
          changeSlideHandler(sliderAction.SUBTRACT);
        }}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          height={70}
          className={style.carousel_button_left}
        />
        <span>
          <FontAwesomeIcon
            icon={faAngleLeft}
            height={70}
            className={style.left_abs}
          />
        </span>
      </button>

      {slides && slides.length > 0 ? (
        <Image
          priority
          src={slides[currIdx].URL}
          alt={slides[currIdx].Alt}
          className={style.image}
          height={1920}
          width={1080}
        />
      ) : (
        <Image
          priority
          src={emptypic}
          alt="No Promotions Yet.."
          className={style.image}
          height={1920}
          width={1080}
          quality={100}
        />
      )}

      <button
        onClick={() => {
          changeSlideHandler(sliderAction.ADD);
        }}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          height={70}
          className={style.carousel_button_right}
        />
        <span>
          <FontAwesomeIcon
            icon={faAngleRight}
            height={70}
            className={style.right_abs}
          />
        </span>
      </button>
    </div>
  );
}

export default Carousel;
