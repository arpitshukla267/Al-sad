import React from "react";
import Hero from "./components/Hero";
import BrandTimeline from "./components/BrandTimeline";
import BrandValues from "./components/BrandValues";
import Products from "./components/Products";
import People from "./components/People";
import Explore from "./components/Explore";

const page = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="w-full max-w-full mx-auto h-full">
        <Hero />
        <BrandTimeline />
        <BrandValues />
        <Products />
        <People />
        <Explore />
      </div>
    </div>
  );
};

export default page;
