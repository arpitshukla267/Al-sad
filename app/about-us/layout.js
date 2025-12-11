import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="h-max sm:h-[85px] w-full flex items-center fixed top-0 z-[100]">
        <Header isDarkBackground={true} />
      </div>
      <main className="mt-[85px]">{children}</main>
    </>
  );
};

export default Layout;
