import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import style from "./Layout.module.scss";

type MyProps = {
  children: React.ReactNode;
};

function Layout(props: MyProps) {
  return (
    <>
      <Navbar />
      <main className={style.content_wrapper}>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
