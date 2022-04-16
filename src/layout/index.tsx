import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {

  // if ("/think") {
  //   return (
  //     <>
  //       <Header />
  //       <div className="wrapper">{children}</div>
  //       <Footer />
  //     </>
  //   );
  // }

  return (
    <>
    <Header />
    <div className="wrapper">{children}</div>
    <Footer />
    </>
  );
};

export default Layout;
