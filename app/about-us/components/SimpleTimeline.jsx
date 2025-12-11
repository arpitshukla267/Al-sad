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
import { useRef, useEffect } from "react";

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

const SimpleVerticalTimeline = ({ masterTimeline, isMobile = false }) => {
  const container = useRef();
  const middleLineRef = useRef();
  const itemRefs = useRef([]);
  const setupTimelineRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !masterTimeline) {
      setupTimelineRef.current = null;
      return;
    }

    const middleLine = middleLineRef.current;
    if (!middleLine) return;

    // Only set up animations once per timeline instance
    if (setupTimelineRef.current === masterTimeline) return;

    setupTimelineRef.current = masterTimeline;

    const totalItems = TIMELINE_DATA.length;

    if (isMobile) {
      // Set initial states for mobile
      gsap.set(middleLine, { scaleY: 0, transformOrigin: "top" });
      itemRefs.current.forEach((item) => {
        if (item) {
          gsap.set(item, { opacity: 0, y: 30 });
        }
      });

      // Step 1: Animate middle line first
      masterTimeline.to(middleLine, {
        scaleY: 1,
        duration: 0.1,
        ease: "power1.out",
      });

      // Step 2: Animate items one by one (vertical on mobile)
      TIMELINE_DATA.forEach((data, idx) => {
        const item = itemRefs.current[idx];
        if (!item) return;

        const startProgress = 0.1 + (idx / totalItems) * 0.85;
        const itemDuration = 0.1;

        // Animate item coming in from bottom
        masterTimeline.to(
          item,
          {
            opacity: 1,
            y: 0,
            duration: itemDuration,
            ease: "power1.out",
          },
          startProgress
        );
      });
    } else {
      // Desktop animation
      // Step 1: Animate middle line first (from top to bottom)
      gsap.set(middleLine, { scaleY: 0, transformOrigin: "top" });
      masterTimeline.to(middleLine, {
        scaleY: 1,
        duration: 0.1,
        ease: "power1.out",
      });

      // Step 2: Animate items one by one, alternating left and right
      TIMELINE_DATA.forEach((data, idx) => {
        const item = itemRefs.current[idx];
        if (!item) return;

        const isLeft = idx % 2 === 0;
        // Distribute items evenly across the timeline
        const startProgress = 0.1 + (idx / totalItems) * 0.85;
        const itemDuration = 0.1;

        // Set initial state - items start from their side
        if (isLeft) {
          gsap.set(item, {
            opacity: 0,
            x: -100,
            scale: 0.8,
          });
        } else {
          gsap.set(item, {
            opacity: 0,
            x: 100,
            scale: 0.8,
          });
        }

        // Animate item coming in
        masterTimeline.to(
          item,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: itemDuration,
            ease: "power1.out",
          },
          startProgress
        );
      });
    }

    return () => {
      setupTimelineRef.current = null;
    };
  }, [masterTimeline, isMobile]);

  return (
    <div className="relative max-w-3xl mx-auto p-8 overflow-visible pb-[150px]">
      <div
        ref={container}
        className="relative max-w-3xl mx-auto overflow-visible"
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
            ref={(el) => (itemRefs.current[idx] = el)}
          >
            {idx % 2 === 0 ? (
              <div className="h-fit md:h-[130px] max-w-[153px] md:max-w-[450px] w-full relative -left-15 md:-left-70">
                <div className="flex items-center gap-[6px] md:gap-4 justify-end">
                  <Image
                    src={data.icon}
                    alt={data.title}
                    className="h-7 w-7 md:h-13 md:w-13"
                  />
                  <h5 className="font-secondary font-semibold text-md md:text-[32px] text-white">
                    {data.title}
                  </h5>
                </div>
                <p className="text-right text-xs md:text-2xl text-white">
                  {data.description}
                </p>
                <div className="bg-white w-5 md:w-[106px] h-px absolute top-1/2 -right-[30px] md:-right-[40%]" />
              </div>
            ) : (
              <div className="h-fit md:h-[130px] max-w-[153px] md:max-w-[450px] relative -right-38 md:-right-133 space-x-3">
                <div className="flex items-center gap-4 justify-start">
                  <Image
                    src={data.icon}
                    alt={data.title}
                    className="h-7 w-7 md:h-13 md:w-13"
                  />
                  <h5 className="font-secondary font-semibold text-md md:text-[32px] text-white">
                    {data.title}
                  </h5>
                </div>
                <p className="text-left text-xs md:text-2xl text-white">
                  {data.description}
                </p>
                <div className="bg-white w-5 md:w-[106px] h-px absolute top-1/2 -left-[30px] md:-left-[40%]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleVerticalTimeline;
