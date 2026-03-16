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
      "Al Sad Building Material L.L.C offers extensive trading and import/export services, sourcing quality materials from trusted global partners. Our experience ensures timely procurement, competitive pricing, and full compliance with international standards. Whether it's a specific product or bulk order, we deliver with precision and reliability. With decades of industry knowledge and a strong global network, we help businesses access the materials they need — efficiently and affordably — across the Middle East and beyond.",
  },
  {
    id: 2,
    heading: "Warehousing & Logistics Support",
    image: serTwo,
    description:
      "Our central warehouse in Al Quoz, Dubai, provides organized, secure storage and fast dispatch of materials. Backed by an efficient logistics network, we ensure timely deliveries across the UAE and surrounding regions. From inventory management to last-mile delivery, our team handles every detail with care. Whether you're sourcing materials for a project or managing stock for your store, Al Sad's warehousing and logistics services keep your operations running smoothly and without delays.",
  },
  {
    id: 3,
    heading: "Bulk Supply & Retail Support",
    image: serThree,
    description:
      "Al Sad supports both large construction projects and retail outlets with tailored supply solutions. Our bulk services ensure consistent stock for contractors and developers, while retail partners benefit from curated selections, merchandising support, and timely restocking. We understand the pace and pressure of the industry, and our responsive service helps you stay ahead. Whether supplying a job site or storefront, Al Sad delivers reliability, flexibility, and the personal touch that defines our legacy.",
  },
];

const HEADER_HEIGHT_MOBILE = 64;

const Service = ({ heading, image, description, index }) => {
  return (
    <div
      className="bg-white px-4 pt-16 pb-5 sm:py-5 md:py-28 md:px-16 h-full slide sticky top-0 snap-top"
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
        <div className="w-full sm:w-1/2 flex flex-col md:justify-between items-start gap-3 sm:gap-10 h-full sm:h-full">
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

          <PrimaryBtn
            title="View more"
            styles="bg-light-blue hover:bg-blue-800"
            onClick={() => {}}
          />
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
          { isMobile: "(max-width: 640px)", isDesktop: "(min-width: 768px)" },
          (context) => {
            const { isDesktop } = context.conditions;

            gsap.to(card, {
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: card,
                start: isDesktop
                  ? "100vh-=185px top"
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
