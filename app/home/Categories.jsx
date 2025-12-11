"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { motion, scale, stagger } from 'framer-motion';
import catOne from "../../public/assets/images/cat-1.webp";
import catTwo from "../../public/assets/images/cat-2.webp";
import catThree from "../../public/assets/images/cat-3.webp";
import catFour from "../../public/assets/images/cat-4.webp";
import catFive from "../../public/assets/images/cat-5.webp";
import catSix from "../../public/assets/images/cat-6.webp";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// import { Button } from '@/components/ui/button';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { getCategorySlug, getSubcategorySlug } from "@/lib/product-data";
import Link from "next/link";

// serviceCategories is now defined in the component state

const List = ({ items, onClick, category }) => {
  return (
    <ul className="space-y-10">
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`text-xl ${
            category === item?.title ? "font-semibold" : "font-normal"
          } font-secondary text-wrap`}
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
      id: "specials",
      title: "Specials",
      backgroundImage: catSix,
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

  // GSAP animation for category cards sliding up from bottom
  useGSAP(
    () => {
      if (!cardsReady) return;

      // Animate category cards sliding up from bottom
      gsap.fromTo(
        categoryCardRefs.current,
        {
          opacity: 0,
          y: 100, // Start from 100px below
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15, // Stagger each card by 0.15s
          onComplete: () => {
            if (onAnimationComplete) {
              onAnimationComplete(true);
            }
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [cardsReady] }
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
                ? "flex-[2]"
                : expandedSection
                ? "flex-[0.3]"
                : "flex-1"
            } opacity-0 transition-all duration-500 ease-out hover:brightness-110`}
          >
            {expandedSection === category.id ? (
              <div className="grid grid-flow-col-dense h-full w-full bg-[#19417c]">
                {/* Column 1 */}
                <div
                  className="relative h-full max-w-[77px]"
                  onClick={() => handleSectionClick(category.id)}
                >
                  <h3 className="absolute top-1/2 left-1/2 font-bold leading-tight origin-center transform -rotate-90 -translate-x-1/2 -translate-y-1/2 text-4xl whitespace-nowrap text-white">
                    {category.title}
                  </h3>
                  <div className="absolute -right-10 bottom-[25px] h-[80%] w-[1px] bg-white" />
                </div>

                {/* Column 2 */}
                <div className="flex-1 flex items-end justify-center pr-4 pl-5 pb-10">
                  <List
                    items={category?.dropdown}
                    onClick={(title) => setActiveCategory(title)}
                    category={activeCategory}
                  />
                </div>

                {items.length !== 0 && (
                  <div className="flex items-end justify-center px-4 pb-10 relative">
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

                {/* Title - Rotated 270deg, positioned at center */}
                <div
                  className="relative h-full w-full"
                  onClick={() => handleSectionClick(category.id)}
                >
                  <h3
                    className="absolute top-1/2 left-1/2 font-primary  font-bold text-[36px] leading-[normal] text-white whitespace-nowrap origin-center transform -rotate-90 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 "
                    style={{
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

      <div className="sm:hidden w-screen bg-light-blue">
        <Collapsible
          className="flex w-full flex-col"
          onOpenChange={(open) => {
            if (!open && expandedSection !== null) {
              setExpandedSection(null);
              setActiveCategory(null);
              setItems([]);
            }
          }}
        >
          {serviceCategories.map((cat) => (
            <div
              className={`border-b-1 w-full px-4 py-2 ${
                expandedSection === cat.id ? "bg-light-blue" : "bg-primary"
              }`}
              key={cat.id}
            >
              <CollapsibleTrigger
                className="my-3 w-full"
                onClick={() => setExpandedSection(cat.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl font-semibold font-primary">
                    {cat.title}
                  </h3>
                  {expandedSection === cat.id ? (
                    <MdOutlineKeyboardArrowUp className="size-8" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="size-8" />
                  )}
                  <span className="sr-only">Toggle</span>
                </div>
              </CollapsibleTrigger>
              {expandedSection === cat.id && (
                <CollapsibleContent>
                  <div className="overflow-hidden w-full space-y-5">
                    <div className="flex gap-4 w-full overflow-x-auto scrollbar-hide text-white">
                      {cat.dropdown.map((dp) => (
                        <h5
                          key={dp.title}
                          className={`py-1 px-3 rounded-full  text-sm text-nowrap ${
                            activeCategory === dp.title
                              ? "bg-white text-primary"
                              : "bg-transparent text-white"
                          }`}
                          onClick={() => {
                            setActiveCategory(dp.title);
                            setItems(dp.items);
                          }}
                        >
                          {dp.title}
                        </h5>
                      ))}
                    </div>
                    <div className="px-3 pb-4">
                      <TruncatedList items={items} />
                    </div>
                  </div>
                </CollapsibleContent>
              )}
            </div>
          ))}
        </Collapsible>
      </div>
    </section>
  );
};

export default Categories;
