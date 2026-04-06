import Image from "next/image";
import commitment from "../../../public/assets/icons/commitment.svg";
import excellence from "../../../public/assets/icons/excellence.svg";
import innovation from "../../../public/assets/icons/innovation.svg";
import integrity from "../../../public/assets/icons/integrity.svg";
import sustainability from "../../../public/assets/icons/sustainability.svg";
import teamwork from "../../../public/assets/icons/teamwork.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TIMELINE_DATA = [
  {
    id: 1,
    icon: integrity,
    title: "Integrity",
    description:
      "We believe in honest business practices and lasting relationships.",
  },
  {
    id: 2,
    icon: commitment,
    title: "Customer Commitment",
    description:
      "We believe in honest business practices and lasting relationships.",
  },
  {
    id: 3,
    icon: excellence,
    title: "Excellence",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. ",
  },
  {
    id: 4,
    icon: innovation,
    title: "Innovation",
    description:
      "We believe in honest business practices and lasting relationships.",
  },
  {
    id: 5,
    icon: sustainability,
    title: "Sustainability",
    description:
      "We believe in honest business practices and lasting relationships.",
  },
  {
    id: 6,
    icon: teamwork,
    title: "Teamwork",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. ",
  },
];

const SimpleVerticalTimeline = () => {
  const container = useRef();
  const middleLineRef = useRef();
  const itemRefs = useRef([]);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const middleLine = middleLineRef.current;
      if (!middleLine) return;

      const mm = gsap.matchMedia();

      // Animate the middle line
      gsap.set(middleLine, { scaleY: 0, transformOrigin: "top" });
      gsap.to(middleLine, {
        scaleY: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      mm.add("(max-width: 767px)", () => {
        TIMELINE_DATA.forEach((data, idx) => {
          const item = itemRefs.current[idx];
          if (!item) return;

          gsap.set(item, { opacity: 0, y: 40 });
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: idx * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      mm.add("(min-width: 768px)", () => {
        TIMELINE_DATA.forEach((data, idx) => {
          const item = itemRefs.current[idx];
          if (!item) return;

          const isLeft = idx % 2 === 0;

          gsap.set(item, {
            opacity: 0,
            x: isLeft ? -80 : 80,
            scale: 0.9,
          });
          gsap.to(item, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            delay: idx * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <div className="relative max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 md:px-8 pt-8 overflow-visible">
      <div
        ref={container}
        className="relative max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto overflow-visible pb-10 md:pb-32"
      >
        {/* Middle vertical line */}
        <div
          ref={middleLineRef}
          className="absolute left-1/2 top-0 h-full w-px bg-white transform -translate-x-1/2"
        />

        {/* Timeline items */}
        {TIMELINE_DATA.map((data, idx) => (
          <div
            key={data.id}
            id={`value-${idx}`}
            className="w-full flex"
            ref={(el) => (itemRefs.current[idx] = el)}
          >
            {idx % 2 === 0 ? (
              /* Left-side items: content in left half, right half empty */
              <>
                <div className="w-1/2 md:min-h-[140px] lg:min-h-[160px] relative text-right pr-6 md:pr-10 lg:pr-14 xl:pr-20 flex flex-col items-end justify-center">
                  <div className="flex items-center gap-[6px] md:gap-3 lg:gap-4 justify-end">
                    <Image
                      src={data.icon}
                      alt={data.title}
                      className="h-7 w-7 md:h-10 md:w-10 lg:h-13 lg:w-13"
                    />
                    <h5 className="font-secondary font-semibold text-sm md:text-xl lg:text-[28px] xl:text-[32px] text-white">
                      {data.title}
                    </h5>
                  </div>
                  <p className="text-right text-[10px] md:text-base lg:text-xl xl:text-2xl text-white mt-1">
                    {data.description}
                  </p>
                  {/* Connector line from content to center */}
                  <div className="bg-white w-5 md:w-8 lg:w-10 xl:w-14 h-px absolute top-1/2 md:-right-px -right-[0px]" />
                </div>
                <div className="w-1/2" />
              </>
            ) : (
              /* Right-side items: left half empty, content in right half */
              <>
                <div className="w-1/2" />
                <div className="w-1/2 md:min-h-[140px] lg:min-h-[160px] relative text-left pl-6 md:pl-10 lg:pl-14 xl:pl-20 flex flex-col items-start justify-center">
                  <div className="flex items-center gap-[6px] md:gap-3 lg:gap-4 justify-start">
                    <Image
                      src={data.icon}
                      alt={data.title}
                      className="h-7 w-7 md:h-10 md:w-10 lg:h-13 lg:w-13"
                    />
                    <h5 className="font-secondary font-semibold text-sm md:text-xl lg:text-[28px] xl:text-[32px] text-white">
                      {data.title}
                    </h5>
                  </div>
                  <p className="text-left text-[10px] md:text-base lg:text-xl xl:text-2xl text-white mt-1">
                    {data.description}
                  </p>
                  {/* Connector line from center to content */}
                  <div className="bg-white w-5 md:w-8 lg:w-10 xl:w-14 h-px absolute top-1/2 md:-left-px -left-[0px]" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleVerticalTimeline;
