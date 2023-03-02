import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type MyProps = {
  children: React.ReactNode;
};

function Layout(props: MyProps) {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
