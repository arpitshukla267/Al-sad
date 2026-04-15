"use client";

import { useEffect, useRef, useState } from "react";

import map from "../../../public/assets/images/map-gray.webp";
import timelineOne from "../../../public/assets/images/timeline-1.webp";
import timelineTwo from "../../../public/assets/images/timeline-2.webp";
import timelineThree from "../../../public/assets/images/timeline-3.webp";
import timelineFour from "../../../public/assets/images/timeline-4.webp";
import timelineFive from "../../../public/assets/images/timeline-5.webp";
import timelineSix from "../../../public/assets/images/timeline-6.webp";

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TIMELINE = [
  {
    id: 1,
    title: "Established in year 1994",
    description: "Al Sad Building Material LLC, Al Sabkha St,Deira Dubai - UAE",
    image: [
      { src: timelineOne, position: "top-40 left-10" },
      { src: timelineTwo, position: "top-10 right-5" },
    ],
  },
  {
    id: 2,
    title: "2nd Branch in 1998",
    description:
      "Al Sad Building Material LLC,Br Nakheel St, Naif Road Deira Dubai - UAE",
    image: [{ src: timelineThree, position: "top-80 left-10" }],
    imageDes:
      "We were the leading importer & supplier for Brass Product (made in India)",
  },
  {
    id: 3,
    title: "3rd Branch in 2004",
    description: "Al Sad Building Material LLC,Br Al Quoz Industrial Area 3",
    image: [{ src: timelineFour, position: "-bottom-25 right-40" }],
    imageDes:
      "Our first 3000sq Shop cum Store and one of the first few shop in Al Quoz  Ind 3",
  },
  {
    id: 4,
    title: "4th Branch in 2007",
    description:
      "Al Sad Al Jadid Building Material LLC, Al Quoz Industrial Area 4",
    image: [{ src: timelineFive, position: "top-50 -left-4" }],
    imageDes:
      "We became one of leading importer from India, China and stocklist from Germany & Turkey",
  },
  {
    id: 5,
    title: "5th Branch in 2024",
    description:
      "Al Sad Al Arabi Building Material LLC, Dubai Investment Park 2",
    image: [{ src: timelineSix, position: "-bottom-25 right-0" }],
    imageDes: "Our first 10000Sq Shop cum Store",
  },
];

const BrandTimeline = () => {
  // All state hooks first
  const [activeEventId, setActiveEventId] = useState(1);
  const [activeEvent, setActiveEvent] = useState(TIMELINE[0]);
  const [active, setActive] = useState(0);

  // All refs together
  const sectionRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const imageContainerRef = useRef(null);
  const imageRefs = useRef([]);
  const descriptionRef = useRef(null);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const mobileSectionRef = useRef(null);
  const mobileContainerRef = useRef(null);

  // All useEffect hooks
  useEffect(() => {
    const event = TIMELINE.find((evt) => evt.id === activeEventId);
    if (event) {
      setActiveEvent(event);
    }
  }, [activeEventId]);

  // GSAP Horizontal Scroll for Mobile
  useGSAP(() => {
    if (typeof window === "undefined") return;

    const section = mobileSectionRef.current;
    const container = mobileContainerRef.current;
    if (!section || !container) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const itemWidth = window.innerWidth;
      const totalWidth = itemWidth * TIMELINE.length;

      gsap.set(container, { width: totalWidth });

      // Use a shorter scroll distance so the user isn't trapped forever
      const scrollDistance = itemWidth * (TIMELINE.length - 1);

      const horizontalScroll = gsap.to(container, {
        x: () => -(totalWidth - itemWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Use centered thresholds so each item activates in the middle of its segment
            const segmentSize = 1 / TIMELINE.length;
            let activeIndex = 0;
            for (let i = TIMELINE.length - 1; i >= 0; i--) {
              if (progress >= i * segmentSize) {
                activeIndex = i;
                break;
              }
            }
            activeIndex = Math.min(activeIndex, TIMELINE.length - 1);
            if (activeIndex !== active) {
              setActive(activeIndex);
              setActiveEventId(TIMELINE[activeIndex].id);
            }
          },
        },
      });

      return () => {
        horizontalScroll.kill();
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
  });

  // GSAP ScrollTrigger Animation (Desktop)
  useGSAP(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Control how much scroll advances one point (px per step).
      const perStepPx = 100;
      const scrollDistance = Math.max(
        perStepPx,
        perStepPx * Math.max(1, TIMELINE.length - 1)
      );

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85px", // Account for fixed header height
          end: () => `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / Math.max(1, TIMELINE.length - 1),
            duration: 3,
            delay: 1,
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalEntries = TIMELINE.length;
            // Use proper segment thresholds so items only activate when truly current
            const segmentSize = 1 / totalEntries;
            let activeIndex = 0;
            for (let i = totalEntries - 1; i >= 0; i--) {
              if (progress >= i * segmentSize) {
                activeIndex = i;
                break;
              }
            }
            activeIndex = Math.min(activeIndex, totalEntries - 1);
            const newActiveId = TIMELINE[activeIndex].id;

            if (newActiveId !== activeEventId) {
              setActiveEventId(newActiveId);
            }
          },
        },
      });

      // Compute responsive font sizes based on viewport
      const vw = window.innerWidth;
      const activeFontSize = vw >= 1280 ? "28px" : vw >= 1024 ? "20px" : "16px";
      const inactiveFontSize = vw >= 1280 ? "20px" : vw >= 1024 ? "16px" : "14px";

      // Animate each timeline entry
      TIMELINE.forEach((timeline, index) => {
        const item = timelineItemsRef.current[index];
        if (!item) return;

        const title = item.querySelector("h4");
        const description = item.querySelector("p");

        const startProgress = index / TIMELINE.length;
        const endProgress = (index + 1) / TIMELINE.length;
        const duration = 1 / TIMELINE.length;

        // Set initial state for inactive items
        if (index !== 0) {
          gsap.set(item, { opacity: 0.25 });
          gsap.set(title, { fontSize: inactiveFontSize, fontWeight: 400 });
          gsap.set(description, { opacity: 0.5 });
        }

        // Animate to active state
        masterTimeline.to(
          item,
          {
            opacity: 1,
            duration: duration * 0.3,
            ease: "power1.out",
          },
          startProgress
        );

        masterTimeline.to(
          title,
          {
            fontSize: activeFontSize,
            fontWeight: 700,
            duration: duration * 0.3,
            ease: "power1.out",
          },
          startProgress
        );

        masterTimeline.to(
          description,
          {
            opacity: 1,
            duration: duration * 0.3,
            ease: "power1.out",
          },
          startProgress
        );

        // Animate to inactive state (for next entry)
        if (index < TIMELINE.length - 1) {
          masterTimeline.to(
            item,
            {
              opacity: 0.25,
              duration: duration * 0.2,
              ease: "power1.in",
            },
            endProgress - duration * 0.2
          );

          masterTimeline.to(
            title,
            {
              fontSize: inactiveFontSize,
              fontWeight: 400,
              duration: duration * 0.2,
              ease: "power1.in",
            },
            endProgress - duration * 0.2
          );

          masterTimeline.to(
            description,
            {
              opacity: 0.5,
              duration: duration * 0.2,
              ease: "power1.in",
            },
            endProgress - duration * 0.2
          );
        }
      });

      // Animate images and containers
      TIMELINE.forEach((timeline, index) => {
        const startProgress = index / TIMELINE.length;
        const endProgress = (index + 1) / TIMELINE.length;
        const duration = 1 / TIMELINE.length;

        const imageContainer = imageRefs.current[index];
        if (!imageContainer) return;

        if (index !== 0) {
          gsap.set(imageContainer, { opacity: 0 });
        }

        masterTimeline.to(
          imageContainer,
          {
            opacity: 1,
            duration: duration * 0.3,
            ease: "power1.out",
          },
          startProgress
        );

        if (index < TIMELINE.length - 1) {
          masterTimeline.to(
            imageContainer,
            {
              opacity: 0,
              duration: duration * 0.2,
              ease: "power1.in",
            },
            endProgress - duration * 0.2
          );
        }

        // Animate individual images
        timeline.image.forEach((img, imgIndex) => {
          const imageWrapper =
            imageContainer.querySelectorAll(".image-wrapper")[imgIndex];
          if (!imageWrapper) return;

          if (index !== 0) {
            gsap.set(imageWrapper, { opacity: 0, scale: 0.8, y: 20 });
          }

          masterTimeline.to(
            imageWrapper,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: duration * 0.3,
              ease: "power1.out",
            },
            startProgress
          );

          if (index < TIMELINE.length - 1) {
            masterTimeline.to(
              imageWrapper,
              {
                opacity: 0,
                scale: 0.8,
                y: -20,
                duration: duration * 0.2,
                ease: "power1.in",
              },
              endProgress - duration * 0.2
            );
          }
        });

        // Animate description box
        if (timeline.imageDes) {
          const descBox = imageContainer.querySelector(".description-box");
          if (descBox) {
            if (index !== 0) {
              gsap.set(descBox, { opacity: 0, y: 20 });
            }

            masterTimeline.to(
              descBox,
              {
                opacity: 1,
                y: 0,
                duration: duration * 0.3,
                ease: "power1.out",
              },
              startProgress
            );

            if (index < TIMELINE.length - 1) {
              masterTimeline.to(
                descBox,
                {
                  opacity: 0,
                  y: -20,
                  duration: duration * 0.2,
                  ease: "power1.in",
                },
                endProgress - duration * 0.2
              );
            }
          }
        }
      });

      return () => {
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
  }, []);

  return (
    <>
      {/* Desktop & Tablet Timeline */}
      <div
        className="hidden md:flex py-5 md:pl-6 lg:pl-10 xl:pl-[77px] p-10 pr-0 w-full flex-nowrap h-screen max-w-[1260px] mx-auto"
        ref={sectionRef}
      >
        {/* Vertical Timeline */}
        <div className="flex flex-col items-start md:p-4 lg:p-8 pr-0 w-fit shrink-0">
          <ul
            className="list-disc! marker:text-2xl md:space-y-8! lg:space-y-12! relative"
            ref={containerRef}
          >
            <div className="w-px bg-white h-full absolute -left-[18px]" />
            {TIMELINE.map((timeline, idx) => (
              <li
                key={timeline.id}
                ref={(el) => (timelineItemsRef.current[idx] = el)}
                className="cursor-pointer md:w-[200px] lg:w-[260px] xl:w-[329px]"
              >
                <h4 className="font-secondary md:text-base lg:text-xl xl:text-[28px] font-bold">
                  {timeline.title}
                </h4>
                <p className="md:text-sm lg:text-base xl:text-xl mt-2 lg:mt-3">{timeline.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Image Container */}
        <div className="relative! w-1/2 h-[630px] flex-1 min-w-0">
          <Image
            src={map}
            alt="Timeline map"
            className="object-contain absolute h-full w-full"
          />
          <div className="absolute top-0 bg-gradient-to-r from-[#0e2143]/90 via-[#0e2143]/70 to-white/0 h-full w-full" />

          {/* Render all timeline images - GSAP will control visibility */}
          {TIMELINE.map((timeline, timelineIdx) => (
            <div
              key={timeline.id}
              ref={(el) => (imageRefs.current[timelineIdx] = el)}
              className="timeline-image-container w-full h-full absolute"
            >
              {timeline.imageDes && (
                <div className="description-box bg-[#19417C] rounded-tl-sm rounded-bl-sm md:p-3 lg:p-4 xl:p-6 md:max-w-[280px] lg:max-w-[400px] xl:max-w-[569px] absolute right-0 top-10">
                  <p className="font-secondary font-semibold md:text-sm lg:text-lg xl:text-2xl text-right">
                    {timeline.imageDes}
                  </p>
                </div>
              )}
              {timeline.image.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className={`image-wrapper bg-white md:w-[160px] lg:w-[220px] xl:w-[300px] md:h-[120px] lg:h-[160px] xl:h-[200px] p-2 rounded-sm absolute ${img?.position}`}
                >
                  <Image
                    src={img.src}
                    alt="Timeline Photo"
                    className="md:h-[85px] lg:h-[120px] xl:h-[150px] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Timeline (Mobile) - Full Screen */}
      <div
        ref={mobileSectionRef}
        className="md:hidden w-screen h-screen relative overflow-hidden bg-[#0e2143]"
      >
        {/* Section Title - Fixed at top */}
        <div className="absolute top-20 left-0 right-0 z-20 text-center">
          <h2 className="font-primary mt-6 font-bold text-2xl text-white uppercase tracking-wide px-6 md:px-0">
            AL SAD THROUGH THE YEARS
          </h2>
          <div className="w-24 h-px bg-gray-400 mx-auto mt-2" />
        </div>

        <div
          ref={mobileContainerRef}
          className="flex flex-nowrap h-full relative pt-24"
        >
          {TIMELINE.map((tl, idx) => (
            <div
              key={tl.id}
              className="timeline-item shrink-0 w-screen h-full flex flex-col px-6 pb-20 justify-between relative"
            >
              {/* Main Content Card - Takes up available space and centers content */}
              <div className="flex-1 flex flex-col justify-center items-center space-y-6 pt-10">
                {/* Image */}
                {tl.image[0] && (
                  <div className="relative w-full max-w-sm h-64 rounded-lg overflow-hidden">
                    <Image
                      src={tl.image[0].src}
                      alt={tl.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Title and Description */}
                <div className="text-center space-y-3 max-w-md">
                  <h4 className="font-primary font-bold text-2xl text-white">
                    {tl.title}
                  </h4>
                  <p className="font-secondary text-base text-white leading-relaxed px-4">
                    {tl.description}
                  </p>
                </div>
              </div>

              {/* Timeline Progress Indicator */}
              <div className="flex justify-center items-center gap-2 px-6 pb-8">
                <div className="flex-1 h-px border-t-2 border-dashed border-white/30" />
                {TIMELINE.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`rounded-full transition-all ${
                      idx === dotIdx
                        ? "w-3 h-3 bg-white"
                        : "w-2 h-2 bg-white/50"
                    }`}
                  />
                ))}
                <div className="flex-1 h-px border-t-2 border-dashed border-white/30" />
              </div>

              {/* Description Box - Fixed at bottom */}
              {tl.imageDes && (
                <div className="px-6">
                  <div className="bg-[#19417C] rounded-lg p-4">
                    <p className="font-secondary font-semibold text-sm text-white italic text-center">
                      {tl.imageDes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandTimeline;
