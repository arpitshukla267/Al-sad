"use client";

import Image from "next/image";

import serOne from "../../public/assets/images/service-1.webp";
import serTwo from "../../public/assets/images/service-2.webp";
import serThree from "../../public/assets/images/service-3.webp";
import PrimaryBtn from "../shared/Buttons/PrimaryBtn";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const SERVICES = [
  {
    id: 1,
    heading: "Trading, Import/Export Capabilities",
    image: serOne,
    description:
      "At Al Sad Building Material LLC, we are engaged in the trading, import, and export of high-quality building materials and fittings. With strong global partnerships across the Middle East, Asia, and Africa, we deliver quality, reliability, and competitive pricing, ensuring our partners’ projects are completed without compromise.",
  },
  {
    id: 2,
    heading: "Warehousing & Logistics Support",
    image: serTwo,
    description:
      "Backed by reliable warehousing and logistics capabilities, and with over 10,000 sq. ft. of dedicated warehouse space, Al Sad Building Material LLC ensures seamless stock management and quick dispatch. We minimize delays, maximize reliability, and our logistics team ensures products reach clients on schedule — helping them save time and maintain smooth project operations.",
  },
  {
    id: 3,
    heading: "Bulk Supply & Retail Support",
    image: serThree,
    description:
      "At Al Sad Building Material LLC, we understand that every customer has unique needs. We cater to both bulk supply and retail clients. Whether it’s large project requirements or individual fittings, we maintain excellent stock levels and competitive pricing. Our one-stop solution ensures contractors, wholesalers, and walk-in buyers receive the same commitment to quality and timely service.",
  },
];

const HEADER_HEIGHT_MOBILE = 64;

const Service = ({ heading, image, description, index }) => {
  return (
    <div
      className="bg-white px-4 pt-16 pb-5 sm:py-5 md:py-28 md:px-16 h-full slide sticky top-0 lg:-top-15 xl:-top-10 snap-top"
      id={`slide-${index}`}
    >
      <div className="mx-auto max-w-[1260px] flex flex-col sm:flex-row gap-5 md:gap-12 w-full text-black items-center h-[619px] justify-center">
        <div className="w-full sm:w-1/2 flex-1 h-[204px] sm:h-full">
          <Image
            src={image}
            alt={heading}
            className="object-cover h-full rounded-sm"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col items-start gap-3 sm:gap-10 sm:h-full">
          <div className="min-w-full space-y-3">
            <p className="uppercase text-xs sm:text-[18px] font-normal">
              Services we offer
            </p>
            <div className="border-b-1 border-[#6E6E6E]" />
          </div>

          <div className="space-y-3 sm:space-y-5">
            <h2 className="text-xl sm:text-4xl font-bold font-primary">
              {heading}
            </h2>
            <p className="text-sm sm:text-xl font-normal">{description}</p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  useGSAP(() => {
    const slides = document.querySelectorAll(".slide");
    let mm = gsap.matchMedia();
    ScrollTrigger.refresh();

    slides.forEach((card, idx) => {
      if (idx < 2) {
        mm.add(
          { 
            isMobile: "(max-width: 640px)", 
            isLg: "(min-width: 1024px) and (max-width: 1279px)",
            isXl: "(min-width: 1280px)"
          },
          (context) => {
            const { isLg, isXl } = context.conditions;
            const isDesktop = isLg || isXl;

            gsap.to(card, {
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: card,
                start: isXl
                  ? "100vh-=185px top"
                  : isLg
                  ? "100vh-=150px top"
                  : `top top+=${HEADER_HEIGHT_MOBILE - 20}px`,
                end: isDesktop ? "bottom 15%" : "bottom top",
                scrub: true,
                pin: true,
                pinSpacing: false,
                snap: {
                  snapTo: 1,
                  directional: true,
                  ease: "power2.out",
                },
              },
            });
          }
        );
      }
    });
  });

  return (
    <section className="bg-white relative overflow-hidden scrollbar-hide flex flex-col md:gap-0 scroll-smooth items-center snap-y snap-mandatory">
      {SERVICES.map((service, idx) => (
        <Service
          key={service.id}
          image={service.image}
          heading={service.heading}
          description={service.description}
          index={idx + 1}
        />
      ))}
    </section>
  );
};

export default Services;
