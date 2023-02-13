import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type MyProps = {
  children: React.ReactNode;
};

function Layout(props: MyProps) {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
