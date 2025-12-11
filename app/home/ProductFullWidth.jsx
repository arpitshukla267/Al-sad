"use client";

import productImg from "../../public/assets/images/product-1.webp";
import product2 from "../../public/assets/images/pre-cast.webp";
import PrimaryBtn from "../shared/Buttons/PrimaryBtn";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

const PRODUCTS = [
  {
    id: 1,
    image: productImg,
    title: "Pre-cast concrete cladding tiles",
    onClick: () => {},
  },
  {
    id: 2,
    image: product2,
    title: "Slide 2",
    onClick: () => {},
  },
  {
    id: 3,
    image: productImg,
    title: "Slide 3",
    onClick: () => {},
  },
];
const Slide = ({ image, title, onClick }) => {
  return (
    <div className="relative h-[70vh] w-screen overflow-hidden">
      <Image
        src={image}
        alt={title}
        className="object-cover z-10"
        fill
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-bl from-black/70 via-black/50 to-transparent z-20" />

      <div className="relative z-30 text-white max-w-full px-4 py-10 sm:max-w-[516px] sm:px-20 space-y-2">
        <p className="text-xs font-semibold sm:text-md uppercase">New launch</p>
        <h3 className="text-xl sm:text-4xl font-semibold max-w-[516px]">
          {title}
        </h3>
        <PrimaryBtn
          title="Know more"
          styles="bg-white text-black text-md font-normal font-secondary hover:bg-gray-500"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

const ProductFullWidth = () => {
  return (
    <section className="w-screen overflow-hidden max-h-[50vh] sm:max-h-[70vh] h-[50vh] sm:h-[70vh]">
      <Swiper
        modules={[EffectFade, Autoplay]}
        autoplay={{
          delay: 5_000,
        }}
        effect="fade"
        speed={2000}
        spaceBetween={10}
        slidesPerView={1}
        className="h-[50vh] sm:h-[70vh] w-screen"
      >
        {PRODUCTS.map((product) => (
          <SwiperSlide key={product.id} className="h-[50vh] sm:h-[70vh] w-full">
            <Slide
              image={product?.image}
              title={product?.title}
              onClick={product.onClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductFullWidth;
