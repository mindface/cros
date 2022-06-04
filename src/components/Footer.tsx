import React from "react";
import FooterSelect from "./FooterSelect";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <FooterSelect />
        <small className="copyright">&copy; setFlowr</small>
      </div>
    </footer>
  );
}

export default Footer;
