import style from "../../styles/UI.module.scss";
import Image from "next/image";

interface MyProps {
  ID: string;
  Image: any;
  Name: string;
  Details: string;
  Description: string;
}

function ModalProductDetail({
  ID,
  Image,
  Name,
  Details,
  Description,
}: MyProps) {
  return (
    <div className={style.modal}>
      <div className={style.image_container}>
        {Image && (
          <img
            src={Image}
            alt={ID}
            width="10"
            height="10"
            className={style.image}
          />
        )}
      </div>
      <p>Product Name : {Name}</p>
      <p>Product Details : {Details}</p>
      <p>Product Description : {Description}</p>
    </div>
  );
}

export default ModalProductDetail;
