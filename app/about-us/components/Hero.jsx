"use client";

import Image from "next/image";
import aboutUsImg from "../../../public/assets/images/about-us.webp";
import logo from "../../../public/assets/logo-light.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      // Set initial state - hide intro section
      gsap.set("#intro", { opacity: 0, visibility: "hidden" });

      // Play animation immediately on page load (not scroll-triggered)
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to("#logo", {
        scale: 10,
        opacity: 0,
        display: "none",
        duration: 1,
      }).to(
        "#intro",
        {
          opacity: 1,
          visibility: "visible",
          y: -10,
          duration: 0.8,
        },
        "-=0.5" // Start slightly before logo animation ends for smoother transition
      );
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="flex flex-col justify-center items-center h-[calc(100vh-85px)] min-h-[600px] w-full relative"
    >
      <Image
        src={aboutUsImg}
        alt="about us"
        className="object-cover h-full w-full"
      />
      {/* overlay */}
      <div className="h-full w-full absolute bg-black opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-12 lg:gap-20">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={logo}
            alt="Logo"
            className="h-[120px] md:h-[220px] lg:h-[340px] w-auto"
            id="logo"
          />
        </div>
        <div
          className="relative xl:left-[10%] bg-primary py-8 px-6 sm:p-10 space-y-3 rounded-lg w-[92%] sm:w-[90%] xl:w-[1090px] mx-auto lg:mx-0 opacity-0"
          id="intro"
        >
          <h4 className="font-primary font-bold text-[28px] sm:text-4xl">
            Who are we
          </h4>
          <p className="text-sm sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
            nibh nibh, at maximus ante fermentum sit amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
