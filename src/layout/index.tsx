import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterBase from "../components/FooterBase";

type Props = {
  children?: ReactNode;
  footerName?: string;
};

const Layout = ({ children, footerName }: Props) => {

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
    {footerName === 'base' ? <FooterBase /> : <Footer />}
    </>
  );
};

export default Layout;
