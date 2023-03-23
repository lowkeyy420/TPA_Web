import { ImageSlider, sliderAction } from "@/interfaces/ICarousel";
import {
  faAngleLeft,
  faAngleRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import style from "../styles/Carousel.module.scss";
import emptypic from "../../assets/emptycarousel.jpg";
import AuthContext from "@/store/Authcontext";
import Backdrop from "./Backdrop";
import ModalPromotion from "./modal/ModalPromotion";
import axios from "axios";
import { useAxiosPost } from "@/hooks/useAxiosPost";

const delay = 15000;

function Carousel({ slides, reload }: ImageSlider) {
  let [currIdx, setCurrIdx] = useState(0);
  let [modalIsOpen, setModalIsOpen] = useState(false);
  let [file, setFile] = useState<any>();
  let [timeoutRefresh, setTimeoutRefresh] = useState(false);

  const url = process.env.BASE_URL + "promotion/insert-new-promotion";
  const url2 = process.env.BASE_URL + "promotion/remove-promotion";

  const [promotionLoading, successPromotion, errorPromotion, promotionRequest] =
    useAxiosPost({
      method: "POST",
      url: url,
    });

  const [deleteLoading, successDelete, errorDelete, deleteRequest] =
    useAxiosPost({
      method: "POST",
      url: url2,
    });

  const authCtx: any = useContext(AuthContext);

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

  useEffect(() => {
    if (successPromotion) {
      alert("Successfully Added New Promotion");
      setCurrIdx(0);
      reload();
      closeModalHandler();
    } else if (errorPromotion) {
      alert("Failed To Add New Promotion...");
    }
  }, [successPromotion, errorPromotion]);

  useEffect(() => {
    if (successDelete) {
      alert("Successfully Deleted");
      setCurrIdx(0);
      reload();
    } else if (errorDelete) {
      alert("Failed To Delete");
    }
  }, [successDelete, errorDelete]);

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

  function showModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function uploadHandler(Alt: string) {
    const formData = new FormData();
    formData.append("image", file);

    const storageURL: any = process.env.STORAGE_URL + "promotion%2F" + Alt;
    const newURL = storageURL + "?alt=media";

    axios({
      method: "POST",
      url: storageURL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res: any) => {
        promotionRequest({
          url: newURL,
          alt: Alt,
        });
      })
      .catch((err: any) => alert("Failed Uploading Picture"));
  }

  function deletePromotionHandler(ID: number) {
    deleteRequest({ id: ID });
  }

  return (
    <div className={style.carousel_container}>
      {modalIsOpen && <Backdrop exitHandler={closeModalHandler} />}
      {modalIsOpen && (
        <ModalPromotion
          add
          onConfirm={uploadHandler}
          onCancel={closeModalHandler}
          setFile={setFile}
        />
      )}
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

      {authCtx.user["RoleID"] === 4 && (
        <div className={style.carousel_adminBtn_container}>
          <button onClick={showModalHandler}>
            <FontAwesomeIcon icon={faPlus} height={70} className={style.icon} />
          </button>
          <button onClick={() => deletePromotionHandler(slides[currIdx].ID)}>
            <FontAwesomeIcon
              icon={faMinus}
              height={70}
              className={style.icon}
            />
          </button>
        </div>
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
