import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import style from "../styles/Input.module.scss";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { useRouter } from "next/router";
import Image from "next/image";

function SearchField() {
  const router = useRouter();
  useEffect(() => {
    const keyword: any = router.query.keyword;
    setKeyWord(keyword);
  }, [router.query.keyword]);

  const [keyWord, setKeyWord] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const searchRef = useRef<any>();

  let url = process.env.BASE_URL + `product/search?page=1&keyword=${keyWord}`;

  const [loading, product, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  function searchHandler(e: FormEvent) {
    e.preventDefault();

    router.push(`/product/search?page=1&keyword=${keyWord}`);
  }

  function showModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    request({
      Keyword: keyWord,
      InnerKeyword: "",
      IsAvailableOnly: false,
    });
  }, [keyWord]);

  return (
    <form className={style.searchfield_container} onSubmit={searchHandler}>
      <input
        type="text"
        className={style.searchfield_textinput}
        onChange={(e: any) => setKeyWord(e.target.value)}
        value={keyWord}
        onFocus={showModalHandler}
        onBlur={closeModalHandler}
      />
      <button className={style.searchfieldBtn}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
      </button>

      {modalIsOpen && product["data"] && (
        <div className={style.search_result_container}>
          {product["data"].map((item: any) => {
            return (
              <div
                key={item.ID}
                className={style.search_result_item}
                ref={searchRef}
              >
                <Image
                  src={item.Image}
                  alt={item.Name}
                  width={60}
                  height={60}
                />
                <p>{item.Name}</p>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
}

export default SearchField;
