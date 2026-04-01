import React from "react";

import products from "../../../public/assets/images/products.webp";
import services from "../../../public/assets/images/services.webp";
import blog from "../../../public/assets/images/blog.webp";
import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    id: 1,
    title: "Products",
    image: products,
    route: "/products",
  },
  {
    id: 2,
    title: "Services",
    image: services,
    route: "/services",
  },
  {
    id: 3,
    title: "Blog",
    image: blog,
    route: "/blogs",
  },
];

const Explore = () => {
  return (
    <div className="py-10 px-4 md:py-20 w-full md:w-full space-y-4 md:space-y-9 max-w-[1260px] mx-auto">
      <h3 className="text-2xl md:text-5xl font-semibold md:font-bold font-primary">
        Explore
      </h3>
      <div className="flex gap-6 md:gap-15 overflow-x-auto w-full scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {FEATURES.map((p) => (
          <div className="space-y-3 flex-shrink-0 snap-center" key={p.id}>
            <Link href={p.route}>
            <Image
              src={p.image}
              alt="People"
              className="w-[329px]  h-[264px] object-cover rounded-md"
              priority
            />

            <p className="text-md md:text-2xl font-semibold">{p.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
