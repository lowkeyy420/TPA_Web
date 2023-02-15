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
      <Head>
        <title>OldEgg</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
