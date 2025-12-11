"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import logo from "../../../public/assets/logo-light.svg";
import SimpleVerticalTimeline from "./SimpleTimeline";
import people from "../../../public/assets/images/people.webp";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BrandValues = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const [masterTimeline, setMasterTimeline] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const section = sectionRef.current;
      const logo = logoRef.current;
      if (!section || !logo) return;

      const mm = gsap.matchMedia();

      // Desktop animation
      mm.add("(min-width: 768px)", () => {
        setIsMobile(false);
        const scrollDistance = window.innerHeight * 2.5;

        // Create master timeline with pinning
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 100px",
            end: () => `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        setMasterTimeline(timeline);

        // Keep logo visible throughout
        gsap.set(logo, { opacity: 1, y: 0 });

        return () => {
          setMasterTimeline(null);
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars?.trigger === section) {
              trigger.kill();
            }
          });
        };
      });

      // Mobile animation
      mm.add("(max-width: 767px)", () => {
        setIsMobile(true);
        const scrollDistance = window.innerHeight * 2.5;

        // Create master timeline with pinning
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 100px",
            end: () => `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        setMasterTimeline(timeline);

        // Keep logo visible throughout
        gsap.set(logo, { opacity: 1, y: 0 });

        return () => {
          setMasterTimeline(null);
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars?.trigger === section) {
              trigger.kill();
            }
          });
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center p-10 bg-gradient-to-b from-primary via-light-blue to-light-blue"
    >
      <div ref={logoRef} id="brand-value">
        <Image
          src={logo}
          alt="Logo White"
          className="object-cover h-[120px] w-[133px] md:h-[287px] md:w-[343px]"
        />
      </div>
      <div className="space-y-10">
        <SimpleVerticalTimeline
          masterTimeline={masterTimeline}
          isMobile={isMobile}
        />
        <div className="flex flex-col items-center space-y-8 pb-[60px]">
          <Image
            src={people}
            alt="People"
            className="h-[139px] md:h-[554px] w-[316px] md:w-[1250px] rounded-sm object-fill"
          />
          <p className="sm:max-w-[997px] text-center w-full text-sm md:text-lg font-secondary">
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

export default BrandValues;
