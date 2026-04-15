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
  // {
  //   id: 2,
  //   title: "Services",
  //   image: services,
  //   route: "/services",
  // },
  {
    id: 2,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-15 w-full scroll-smooth">
        {FEATURES.map((p) => (
          <div className="space-y-3 w-full" key={p.id}>
            <Link href={p.route} className="block w-full">
              <div className="relative w-full h-[200px] sm:h-[264px] md:h-[350px] lg:h-[450px]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <p className="text-md md:text-2xl font-semibold mt-2">{p.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
