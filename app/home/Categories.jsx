"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
// import { motion, scale, stagger } from 'framer-motion';
import catOne from "../../public/assets/images/cat-1.webp";
import catTwo from "../../public/assets/images/cat-2.webp";
import catThree from "../../public/assets/images/cat-3.webp";
import catFour from "../../public/assets/images/cat-4.webp";
import catFive from "../../public/assets/images/cat-5.webp";
import catSix from "../../public/assets/images/cat-6.webp";
import heroBackgroundImg from "../../public/assets/images/splash.webp";
import logoLight from "../../public/assets/logo-light.svg";
import { ChevronDown } from "lucide-react";
import { getCategorySlug, getSubcategorySlug } from "@/lib/product-data";
import Link from "next/link";

// serviceCategories is now defined in the component state

const List = ({ items, onClick, category }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`text-lg ${
            category === item?.title ? "font-semibold" : "font-normal"
          } font-secondary text-wrap cursor-pointer`}
          onClick={() => onClick(item.title)}
        >
          {item?.title}
        </li>
      ))}
    </ul>
  );
};

const TruncatedList = ({ items, onClick, category, isStatic = false }) => {
  const MAX_ITEMS = 7;
  return (
    <ul className="space-y-1">
      {items.slice(0, MAX_ITEMS + 1).map((item, idx) => (
        <li
          key={idx}
          className={`text-md sm:text-lg ${
            category === item?.title ? "font-semibold" : "font-normal"
          } font-secondary text-wrap transition-opacity ${
            isStatic
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80 cursor-pointer"
          }`}
        >
          {isStatic ? (
            // Static category - show as non-clickable text
            <span>{item?.title}</span>
          ) : item?.to ? (
            // Real data - show as clickable link
            <Link href={item.to} onClick={() => onClick?.(item.to)}>
              {item?.title}
            </Link>
          ) : (
            <span onClick={() => onClick?.(item?.to || item.title)}>
              {item?.title}
            </span>
          )}
        </li>
      ))}

      {items.length > MAX_ITEMS && (
        <li className="mt-2 sm:mt-10">
          {isStatic ? (
            <p className="underline font-secondary font-medium opacity-50 cursor-not-allowed">
              Show all
            </p>
          ) : items[0]?.to ? (
            <Link
              href={items[0].to}
              className="underline font-secondary font-medium hover:opacity-80"
            >
              Show all
            </Link>
          ) : (
            <p className="underline font-secondary font-medium">Show all</p>
          )}
        </li>
      )}
    </ul>
  );
};

// const container = {
// 	hidden: {},
// 	show: {
// 		transition: {
// 			type: 'tween',
// 			delayChildren: stagger(0.4),
// 		},
// 	},
// };

// const item = {
// 	hidden: { opacity: 0, scaleY: 0 },
// 	show: {
// 		opacity: 1,
// 		scaleY: 1,
// 		transition: {
// 			type: 'spring',
// 			bounce: 0,
// 			visualDuration: 1,
// 			ease: 'linear',
// 		},
// 	},
// };

const Categories = ({ onAnimationComplete }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const sectionRef = useRef(null);
  const categoryCardRefs = useRef([]);
  const [cardsReady, setCardsReady] = useState(false);
  const mobileHeroRef = useRef(null);
  const mobileCategoryRefs = useRef([]);
  const mobileGridRef = useRef(null);
  const [serviceCategories, setServiceCategories] = useState([
    {
      id: "architectural",
      title: "Architectural Components",
      backgroundImage: catOne,
      isStatic: true,
      dropdown: [
        {
          title: "Architecture Hardware",
          items: [
            { title: "Door Control", to: "" },
            { title: "Door Hinges", to: "" },
            { title: "Door Handle", to: "" },
            { title: "Door Bolts", to: "" },
            { title: "Door Security", to: "" },
            { title: "Door Stoppers", to: "" },
            { title: "Door Accessories", to: "" },
            { title: "Door Locks", to: "" },
            { title: "Door Holes", to: "" },
          ],
        },
        {
          title: "Furniture Hardware",
          items: [
            { title: "Door Hinges", to: "" },
            { title: "Door Handle", to: "" },
          ],
        },
        {
          title: "Glass Hardware",
          items: [{ title: "Door Hinges", to: "" }],
        },
        {
          title: "Aluminium Hardware",
          items: [],
        },
      ],
    },
    {
      id: "structural",
      title: "Structural Materials",
      backgroundImage: catTwo,
      isStatic: false, // Will be updated with real data
      dropdown: [],
    },
    {
      id: "professional-tools-gear",
      title: "Professional tools & gear",
      backgroundImage: catThree,
      isStatic: false, // Will be updated with real data
      dropdown: [],
    },
    {
      id: "retail-home",
      title: "Retail & Home Solutions",
      backgroundImage: catFour,
      isStatic: true,
      dropdown: [
        {
          title: "Architecture Hardware",
          items: [
            { title: "Door Control", to: "" },
            { title: "Door Hinges", to: "" },
            { title: "Door Handle", to: "" },
            { title: "Door Bolts", to: "" },
            { title: "Door Security", to: "" },
            { title: "Door Stoppers", to: "" },
            { title: "Door Accessories", to: "" },
            { title: "Door Locks", to: "" },
            { title: "Door Holes", to: "" },
          ],
        },
        {
          title: "Furniture Hardware",
          items: [
            { title: "Door Hinges", to: "" },
            { title: "Door Handle", to: "" },
          ],
        },
        {
          title: "Glass Hardware",
          items: [{ title: "Door Hinges", to: "" }],
        },
        {
          title: "Aluminium Hardware",
          items: [],
        },
      ],
    },
    {
      id: "electrical",
      title: "Electrical & Plumbing Solutions",
      backgroundImage: catFive,
      isStatic: true,
      dropdown: [
       {
        title: "Coming Soon", to: ""
       }
      ],
    },
    {
      id: "specials",
      title: "Specials",
      backgroundImage: catSix,
      isStatic: true,
      dropdown: [
       {
        title: "Coming Soon", to: ""
       }
      ],
    },
  ]);

  // Load product data and transform it
  useEffect(() => {
    const loadProductData = async () => {
      try {
        const { getCachedProductData } = await import(
          "@/lib/product-data-cache"
        );
        const data = await getCachedProductData();

        setServiceCategories((prevCategories) => {
          return prevCategories.map((category) => {
            // Update Structural Materials
            if (category.id === "structural") {
              const structuralData = data.categories?.find(
                (cat) => cat.category === "Structural Materials"
              );
              if (structuralData) {
                const dropdown =
                  structuralData.subcategories?.map((subcat) => {
                    const categorySlug = getCategorySlug(
                      "Structural Materials"
                    );
                    const subcategorySlug = getSubcategorySlug(subcat.name);

                    // Extract product types/sections for items
                    const items = [];
                    if (subcat.products) {
                      // For Structural Materials, use unique product types/sections
                      const uniqueTypes = new Set();
                      subcat.products.forEach((product) => {
                        if (product.type && !uniqueTypes.has(product.type)) {
                          uniqueTypes.add(product.type);
                          items.push({
                            title: product.type,
                            to: `/products/${categorySlug}/${subcategorySlug}`,
                          });
                        } else if (
                          product.section &&
                          !uniqueTypes.has(product.section)
                        ) {
                          uniqueTypes.add(product.section);
                          items.push({
                            title: product.section,
                            to: `/products/${categorySlug}/${subcategorySlug}`,
                          });
                        }
                      });
                    }

                    return {
                      title: subcat.name.trim(),
                      items:
                        items.length > 0
                          ? items
                          : [
                              {
                                title: "View All",
                                to: `/products/${categorySlug}/${subcategorySlug}`,
                              },
                            ],
                    };
                  }) || [];

                return { ...category, dropdown, isStatic: false };
              }
            }

            // Update Professional Tools & Gear
            if (category.id === "professional-tools-gear") {
              const toolsData = data.categories?.find(
                (cat) => cat.category === "Professional Tools & Gear"
              );
              if (toolsData) {
                const dropdown =
                  toolsData.subcategories?.map((subcat) => {
                    const categorySlug = getCategorySlug(
                      "Professional Tools & Gear"
                    );
                    const subcategorySlug = getSubcategorySlug(subcat.name);

                    // Extract product types for items
                    const items = [];
                    if (subcat.productTypes) {
                      subcat.productTypes.forEach((productType) => {
                        items.push({
                          title: productType.name,
                          to: `/products/${categorySlug}/${subcategorySlug}`,
                        });
                      });
                    }

                    return {
                      title: subcat.name.trim(),
                      items:
                        items.length > 0
                          ? items
                          : [
                              {
                                title: "View All",
                                to: `/products/${categorySlug}/${subcategorySlug}`,
                              },
                            ],
                    };
                  }) || [];

                return { ...category, dropdown, isStatic: false };
              }
            }

            // Update Architectural Components
            if (category.id === "architectural") {
              const archData = data.categories?.find(
                (cat) => cat.category === "Architectural Components"
              );
              if (archData) {
                const dropdown =
                  archData.subcategories?.map((subcat) => {
                    const categorySlug = getCategorySlug(
                      "Architectural Components"
                    );
                    const subcategorySlug = getSubcategorySlug(subcat.name);
                    const items = subcat.products?.slice(0, 5).map((p) => ({
                      title: p.name,
                      to: `/products/${categorySlug}/${subcategorySlug}`,
                    })) || [];
                    return {
                      title: subcat.name.trim(),
                      items:
                        items.length > 0
                          ? [...items, { title: "Show all", to: `/products/${categorySlug}/${subcategorySlug}` }]
                          : [{ title: "View All", to: `/products/${categorySlug}/${subcategorySlug}` }],
                    };
                  }) || [];
                return { ...category, dropdown, isStatic: false };
              }
            }

            // Update Retail & Home Solutions
            if (category.id === "retail-home") {
              const retailData = data.categories?.find(
                (cat) => cat.category === "Retail & Home Solutions"
              );
              if (retailData) {
                const dropdown =
                  retailData.subcategories?.map((subcat) => {
                    const categorySlug = getCategorySlug(
                      "Retail & Home Solutions"
                    );
                    const subcategorySlug = getSubcategorySlug(subcat.name);
                    const items = subcat.products?.slice(0, 5).map((p) => ({
                      title: p.name,
                      to: `/products/${categorySlug}/${subcategorySlug}`,
                    })) || [];
                    return {
                      title: subcat.name.trim(),
                      items:
                        items.length > 0
                          ? [...items, { title: "Show all", to: `/products/${categorySlug}/${subcategorySlug}` }]
                          : [{ title: "View All", to: `/products/${categorySlug}/${subcategorySlug}` }],
                    };
                  }) || [];
                return { ...category, dropdown, isStatic: false };
              }
            }

            return category;
          });
        });
      } catch (error) {
        console.error("Error loading product data:", error);
      }
    };

    loadProductData();
  }, []);

  const handleSectionClick = (categoryId) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    if (category?.dropdown) {
      setExpandedSection(expandedSection === categoryId ? null : categoryId);
      setActiveCategory(null);
      setItems([]);
    }
  };

  useEffect(() => {
    getCategoryItems();
  }, [activeCategory]);

  useEffect(() => {
    if (expandedSection) {
      const category = serviceCategories.find(
        (cat) => cat.id === expandedSection
      );
      console.log(category);
      setActiveCategory(category?.dropdown[0]?.title);
    }
  }, [expandedSection]);

  const getCategoryItems = () => {
    const category = serviceCategories.filter(
      (cat) => cat.id === expandedSection
    )[0];
    const catItems = category?.dropdown?.filter(
      (item) => item.title === activeCategory
    )[0]?.items;
    setItems(catItems || []);
  };

  // Trigger animation when component mounts (after splash screen)
  useEffect(() => {
    setCardsReady(true);
  }, []);

  // On mobile, show header after hero is visible
  useEffect(() => {
    if (!cardsReady || !onAnimationComplete) return;
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      const timer = setTimeout(() => onAnimationComplete(true), 800);
      return () => clearTimeout(timer);
    }
  }, [cardsReady, onAnimationComplete]);

  // GSAP animation for category cards sliding up from bottom (desktop)
  useGSAP(
    () => {
      if (!cardsReady) return;
      if (typeof window !== "undefined" && window.innerWidth < 640) return;

      gsap.fromTo(
        categoryCardRefs.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          onComplete: () => {
            if (onAnimationComplete) onAnimationComplete(true);
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [cardsReady] }
  );

  // Mobile: Hero entrance animation + scroll-triggered category reveal
  useGSAP(
    () => {
      if (
        !cardsReady ||
        typeof window === "undefined" ||
        window.innerWidth >= 640
      )
        return;
      if (!mobileHeroRef.current) return;

      // Hero entrance: fade in the content
      gsap.fromTo(
        mobileHeroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Animate logo + tagline with slight delay
      const heroContent = mobileHeroRef.current?.querySelector(
        "[data-hero-content]"
      );
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
          }
        );
      }

      // Scroll-triggered: animate 6 category cards when grid scrolls into view
      const gridEl = mobileGridRef.current;
      const cardEls = mobileCategoryRefs.current.filter(Boolean);
      if (gridEl && cardEls.length > 0) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridEl,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [cardsReady, serviceCategories] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden md:h-screen"
    >
      {/* Interactive Categories Grid */}
      <div className="hidden sm:flex h-full">
        {serviceCategories.map((category, idx) => (
          <div
            key={category.id}
            ref={(el) => (categoryCardRefs.current[idx] = el)}
            className={`group relative cursor-pointer overflow-hidden origin-bottom strip-${
              idx + 1
            } ${
              expandedSection === category.id
                ? "flex-[3]"
                : expandedSection
                ? "flex-[0.5]"
                : "flex-1"
            } transition-all duration-500 ease-out hover:brightness-110`}
          >
            {expandedSection === category.id ? (
              <div
                className="grid h-full w-full bg-[#19417c] overflow-hidden"
                style={{
                  gridTemplateColumns: items.length !== 0
                    ? "77px 1fr 1fr"
                    : "77px 1fr",
                }}
              >
                {/* Column 1 - Title */}
                <div
                  className="relative h-full w-[77px] min-w-[77px] flex items-end pb-10 ml-4 justify-center"
                  onClick={() => handleSectionClick(category.id)}
                >
                  <h3
                    className="font-bold leading-tight text-4xl whitespace-nowrap text-white"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {category.title}
                  </h3>
                  <div className="absolute -right-10 bottom-[25px] h-[80%] w-[1px] bg-white" />
                </div>

                {/* Column 2 - Subcategories */}
                <div className="flex items-end justify-center pr-4 pl-5 pb-10 min-w-0 overflow-hidden">
                  <List
                    items={category?.dropdown}
                    onClick={(title) => setActiveCategory(title)}
                    category={activeCategory}
                  />
                </div>

                {/* Column 3 - Items */}
                {items.length !== 0 && (
                  <div className="flex items-end justify-center px-4 pb-10 relative min-w-0 overflow-hidden">
                    <div className="absolute left-0 bottom-[25px] h-[80%] w-[1px] bg-white" />
                    <TruncatedList
                      items={items}
                      onClick={() => {}}
                      isStatic={category.isStatic}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Background Image with Overlay */}
                <div
                  style={{
                    backgroundImage: `url(${category.backgroundImage.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 transition-all duration-500 ease-out group-hover:scale-105"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[rgba(14,33,67,0.4)] transition-opacity duration-500 group-hover:opacity-30" />

                {/* Title - Rotated 270deg, bottom-aligned */}
                <div
                  className="relative h-full w-full flex items-end pb-10 justify-center"
                  onClick={() => handleSectionClick(category.id)}
                >
                  <h3
                    className="font-primary font-bold text-[36px] leading-[normal] text-white whitespace-nowrap transition-all duration-500 pb-10"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      textShadow: "rgba(25,65,124,0.2) 0px 2px 4px",
                    }}
                  >
                    {category.title}
                  </h3>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Hero Section (full viewport) + Category Grid (revealed on scroll) */}
      <div className="sm:hidden w-screen flex flex-col">
        {/* Hero Section - full viewport, same image as desktop */}
        <div
          ref={mobileHeroRef}
          id="mobile-hero"
          className="relative w-full flex flex-col overflow-hidden"
          style={{ height: "100dvh", minHeight: "100dvh" }}
        >
          <div className="absolute inset-0">
            <Image
              src={heroBackgroundImg}
              alt="Al Sad Building Materials"
              className="object-cover w-full h-full object-center"
              fill
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40" />
          </div>

          <div
            data-hero-content
            className="relative flex-1 flex flex-col items-center justify-center px-4 pb-24"
            style={{
              paddingTop:
                "max(5rem, calc(env(safe-area-inset-top, 0px) + 4rem))",
            }}
          >
            <Image
              src={logoLight}
              alt="Al Sad"
              width={120}
              height={120}
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] mb-4"
            />
            <p className="text-white text-center text-base sm:text-lg font-secondary font-medium tracking-wide">
              Strength You Can Build On
            </p>
          </div>

          {/* Scroll indicator */}
          <button
            type="button"
            onClick={() => {
              document
                .getElementById("mobile-category-grid")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-[72px] left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-white/30 flex items-center justify-center"
            aria-label="Scroll to categories"
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </button>

          {/* Enquire Now CTA */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <Link
              href="/contact-us"
              className="block w-full py-3.5 bg-primary-green text-white text-center font-secondary font-semibold text-base rounded-lg hover:bg-primary-green/90 transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* Floating WhatsApp Icon - fixed for easy access while scrolling */}
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-4 z-[99] w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform sm:hidden"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Category Grid - 2x3, revealed on scroll with proper padding */}
        <div
          ref={mobileGridRef}
          id="mobile-category-grid"
          className="grid grid-cols-2 gap-3 sm:gap-4 bg-white px-4 py-6 sm:px-6 sm:py-8"
        >
          {[
            serviceCategories[0],
            serviceCategories[1],
            serviceCategories[3],
            serviceCategories[2],
            serviceCategories[4],
            serviceCategories[5],
          ]
            .filter(Boolean)
            .map((cat, idx) => (
              <Link
                key={cat.id}
                ref={(el) => (mobileCategoryRefs.current[idx] = el)}
                href={`/products/${cat.id}`}
                className="relative aspect-[4/3] overflow-hidden group rounded-lg"
              >
                <Image
                  src={cat.backgroundImage}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-primary/50" />
                <h3 className="absolute inset-0 flex items-end p-3 text-white font-primary font-bold text-[18px] sm:text-base">
                  {cat.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
