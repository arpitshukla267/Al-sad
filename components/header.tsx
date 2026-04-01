"use client";

import Image from "next/image";

import React, { useState, useEffect } from "react";

import logoDark from "../../public/assets/logo-dark.svg";

import logoLight from "../../public/assets/logo-light.svg";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

import { getCategorySlug, getSubcategorySlug } from "@/lib/product-data";

export const NAV_ITEMS = [
  { name: "Home", path: "/" },

  { name: "About us", path: "/about-us" },

  { name: "Products", path: "#", hasDropdown: true },

  { name: "Blogs", path: "/blogs" },

  { name: "Contact us", path: "/contact-us" },
];

// Static categories (without Excel data yet) - marked with isStatic flag

const STATIC_CATEGORIES = [
  {
    id: "architectural",

    name: "Architectural Components",

    isStatic: true,

    subcategories: [
      {
        name: "Architectural hardware",

        path: "/products/architectural/architecture-hardware",
      },

      {
        name: "Glass hardware",

        path: "/products/architectural/glass-hardware",
      },

      {
        name: "Furniture hardware",

        path: "/products/architectural/furniture-hardware",
      },

      {
        name: "Aluminium hardware",

        path: "/products/architectural/aluminium-hardware",
      },
    ],
  },

  {
    id: "retail-home",

    name: "Retail & Home Solutions",

    isStatic: true,

    subcategories: [
      { name: "Home Hardware", path: "/products/retail-home/home-hardware" },

      {
        name: "Retail Solutions",

        path: "/products/retail-home/retail-solutions",
      },

      {
        name: "Consumer Products",

        path: "/products/retail-home/consumer-products",
      },
    ],
  },

  {
    id: "electrical",

    name: "Electrical & Plumbing Solutions",

    isStatic: true,

    subcategories: [
      {
        name: "Electrical Components",

        path: "/products/electrical/electrical-components",
      },

      {
        name: "Plumbing Solutions",

        path: "/products/electrical/plumbing-solutions",
      },

      { name: "Wiring & Cables", path: "/products/electrical/wiring-cables" },
    ],
  },

  {
    id: "specials",

    name: "Specials",

    isStatic: true,

    subcategories: [
      { name: "Special Offers", path: "/products/specials/special-offers" },

      { name: "Limited Edition", path: "/products/specials/limited-edition" },
    ],
  },
];

const Header = ({ isDarkBackground = false, useGradient = false }) => {
  const [expand, setExpand] = useState(false);

  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const [productCategories, setProductCategories] = useState(STATIC_CATEGORIES);

  // Load dynamic product data

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const { getCachedProductData } = await import(
          "@/lib/product-data-cache"
        );

        const data = await getCachedProductData();

        // Build categories from JSON data

        const dynamicCategories =
          data.categories?.map((category) => {
            const categorySlug = getCategorySlug(category.category);

            const subcategories =
              category.subcategories?.map((subcat: { name: string }) => {
                const subcategorySlug = getSubcategorySlug(subcat.name);

                return {
                  name: subcat.name.trim(),

                  path: `/products/${categorySlug}/${subcategorySlug}`,
                };
              }) || [];

            return {
              id: categorySlug,

              name: category.category,

              isStatic: false, // Real data from Excel

              subcategories: subcategories,
            };
          }) || [];

        // Merge dynamic categories with static ones

        // Replace static placeholders with real data from JSON
        const dynamicIds = new Set(
          dynamicCategories.map((c: { id: string }) => c.id)
        );
        const staticExcluded = (catId: string) => {
          if (catId === "structural" && dynamicIds.has("structural-materials"))
            return true;
          if (catId === "professional-tools-gear" && dynamicIds.has("professional-tools-gear"))
            return true;
          if (catId === "architectural" && dynamicIds.has("architectural-components"))
            return true;
          if (catId === "retail-home" && dynamicIds.has("retail-and-home-solutions"))
            return true;
          return false;
        };

        const mergedCategories = [
          ...STATIC_CATEGORIES.filter((cat) => !staticExcluded(cat.id)),
          ...dynamicCategories,
        ].sort((a, b) => {
          const order = [
            "architectural-components",
            "architectural",
            "structural-materials",
            "structural",
            "professional-tools-gear",
            "retail-and-home-solutions",
            "retail-home",
            "electrical",
            "specials",
          ];

          return (
            (order.indexOf(a.id) === -1 ? 999 : order.indexOf(a.id)) -
            (order.indexOf(b.id) === -1 ? 999 : order.indexOf(b.id))
          );
        });

        setProductCategories(mergedCategories);
      } catch (error) {
        console.error("Error loading product data:", error);

        // Fallback to static categories

        setProductCategories(STATIC_CATEGORIES);
      }
    };

    loadProductData();
  }, []);

  // For gradient, use dark logo and dark text (gradient starts with white)

  const useLightLogo = isDarkBackground && !useGradient;

  const textColor = useGradient
    ? "text-[#0e2143]"
    : useLightLogo
    ? "text-white"
    : "text-[#0e2143]";

  // Determine background color or gradient

  let bgStyle = "";

  if (useGradient) {
    // Use custom CSS gradient class for precise control

    bgStyle = "";
  } else {
    bgStyle = isDarkBackground ? "bg-[#0e2143]" : "bg-white";
  }

  const toggleMenu = () => setExpand((prev) => !prev);

  return (
    <>
      {/* Mobile Menu Slider (Full Screen White) */}
      <div
        className={`fixed inset-0 z-[200] md:hidden bg-white transition-all duration-500 ease-in-out ${
          expand ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } overflow-y-auto`}
      >
        {/* Mobile Menu Header (Logo + Close icon) */}
        <div className="flex justify-between items-center px-4 py-[14px] border-b border-gray-100">
          <Image
            src={logoDark}
            alt="Logo"
            width={79.373}
            height={59.522}
            className="h-[35.809px] w-[47px]"
          />
          <button
            onClick={() => setExpand(false)}
            className="text-[#0e2143] focus:outline-none p-2"
          >
            <IoClose size={32} />
          </button>
        </div>

        <div className="flex flex-col p-8 gap-6">
          {NAV_ITEMS.map((item, idx) => {
            if (item.hasDropdown) {
              return (
                <div key={idx} className="border-b border-gray-100 pb-4">
                  <button
                    onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                    className="flex items-center justify-between w-full uppercase font-primary font-bold text-lg tracking-widest text-[#0e2143]"
                  >
                    <span>{item.name}</span>
                    <MdOutlineKeyboardArrowDown 
                      size={24} 
                      className={`transition-transform duration-300 ${productsDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`mt-4 overflow-hidden transition-all duration-300 ${
                      productsDropdownOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-6 pl-2">
                      {productCategories.map((category, catIdx) => (
                        <div key={catIdx}>
                          <Link
                            href={`/products/${category.id}`}
                            onClick={() => {
                              setExpand(false);
                              setProductsDropdownOpen(false);
                            }}
                            className="block text-sm font-primary font-bold uppercase tracking-widest text-[#0e2143] mb-3"
                          >
                            {category.name}
                          </Link>

                          <div className="flex flex-col gap-2 pl-2">
                            {category.subcategories.map((subcat, subIdx) => (
                              <Link
                                key={subIdx}
                                href={subcat.path}
                                onClick={() => {
                                  setExpand(false);
                                  setProductsDropdownOpen(false);
                                }}
                                className="text-sm opacity-70 hover:opacity-100 font-secondary text-[#0e2143] py-1"
                              >
                                {subcat.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                href={item?.path}
                key={idx}
                onClick={() => setExpand(false)}
                className="font-primary font-bold text-lg tracking-widest uppercase border-b border-gray-100 pb-4 text-[#0e2143]"
              >
                {item.name}
              </Link>
            );
          })}

          <div className="mt-4">
            <Button
              className="w-full bg-[#0e2143] text-white py-8 rounded-none text-lg uppercase tracking-widest font-primary font-bold shadow-lg"
              onClick={() => setExpand(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <header
        className={`${bgStyle} ${
          useGradient
            ? "bg-gradient-to-b from-white via-white to-transparent"
            : ""
        } px-4 py-[14px] md:px-[50px] lg:px-[90px] xl:px-[170px] md:py-[17px] flex flex-col flex-1 h-full relative`}
      >
        <div className="flex justify-between max-w-full items-center w-full">
          {/* Logo and Navigation Container */}

          <div className="flex items-center gap-[44px] md:gap-[44px] lg:gap-[44px] flex-shrink-0">
            <Image
              src={useGradient ? logoDark : useLightLogo ? logoLight : logoDark}
              alt="Logo"
              width={79.373}
              height={59.522}
              className="h-[35.809px] w-[47px] md:h-[36px] md:w-[48px] lg:h-[59.522px] lg:w-[79.373px] flex-shrink-0"
            />

            {/* Desktop/Tablet Navigation */}

            <nav
              className={`hidden md:flex ${textColor} font-primary font-semibold text-[18px] md:text-[16px] lg:text-[18px] tracking-[0.36px] md:tracking-[0.32px] lg:tracking-[0.36px] uppercase items-center gap-[32px] flex-shrink-0`}
            >
              {NAV_ITEMS.map((item, idx) => {
                if (item.hasDropdown) {
                  return (
                    <Popover
                      key={idx}
                      open={productsDropdownOpen}
                      onOpenChange={setProductsDropdownOpen}
                    >
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-[8px] cursor-pointer hover:opacity-80">
                          <span className="uppercase">{item.name}</span>

                          <MdOutlineKeyboardArrowDown
                            className={`${
                              useGradient
                                ? "text-[#0e2143]"
                                : useLightLogo
                                ? "text-white"
                                : "text-[#0e2143]"
                            } rotate-[-90deg] w-6 h-6 transition-transform duration-200 ${
                              productsDropdownOpen ? "rotate-0" : ""
                            }`}
                          />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        sideOffset={8}
                        className={`w-[90vw] max-w-[1200px] p-0 ${
                          useGradient || !isDarkBackground
                            ? "bg-white"
                            : "bg-[#0e2143]"
                        }`}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 py-4">
                          {productCategories.map((category, catIdx) => (
                            <div
                              key={catIdx}
                              className="px-4 py-2 border-r border-opacity-10 last:border-r-0"
                              style={{
                                borderColor:
                                  useGradient || !isDarkBackground
                                    ? "rgba(14, 33, 67, 0.1)"
                                    : "rgba(255, 255, 255, 0.1)",
                              }}
                            >
                              {/* Category Title - Clickable to Layer 1 */}

                              <Link
                                href={`/products/${category.id}`}
                                onClick={() => setProductsDropdownOpen(false)}
                                className={`block text-sm font-primary font-semibold uppercase tracking-[0.28px] mb-3 pb-2 border-b hover:opacity-80 transition-opacity ${
                                  useGradient || !isDarkBackground
                                    ? "text-[#0e2143] border-[#0e2143] border-opacity-20"
                                    : "text-white border-white border-opacity-20"
                                }`}
                              >
                                {category.name}
                              </Link>

                              {/* Subcategories */}

                              <ul className="space-y-2">
                                {category.subcategories.map((subcat, subIdx) => {
                                  const isStatic = category.isStatic;

                                  if (isStatic) {
                                    // Static category - show as non-clickable text

                                    return (
                                      <li key={subIdx}>
                                        <span
                                          className={`block text-xs font-secondary font-normal opacity-50 cursor-not-allowed ${
                                            useGradient || !isDarkBackground
                                              ? "text-[#0e2143]"
                                              : "text-white"
                                          }`}
                                        >
                                          {subcat.name}
                                        </span>
                                      </li>
                                    );
                                  }

                                  // Real data - show as clickable link

                                  return (
                                    <li key={subIdx}>
                                      <Link
                                        href={subcat.path}
                                        onClick={() =>
                                          setProductsDropdownOpen(false)
                                        }
                                        className={`block text-xs font-secondary font-normal hover:opacity-80 transition-opacity ${
                                          useGradient || !isDarkBackground
                                            ? "text-[#0e2143]"
                                            : "text-white"
                                        }`}
                                      >
                                        {subcat.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }

                return (
                  <Link href={item?.path} key={idx}>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search and Menu Icons */}

          <div className="flex items-center gap-4 md:gap-0">
            {/* Search Icon - Always visible */}

            <Button
              variant="ghost"
              size="icon"
              className={`${
                useGradient
                  ? "text-[#0e2143]"
                  : useLightLogo
                  ? "text-white"
                  : "text-[#0e2143]"
              } w-6 h-6 md:w-[24px] md:h-[24px]`}
            >
              <SearchIcon className="w-6 h-6 md:w-[24px] md:h-[24px]" />
            </Button>

            {/* Mobile Menu Icon - Only on mobile */}
            <button
              onClick={toggleMenu}
              className={`${textColor} md:hidden z-50 focus:outline-none`}
              aria-label="Toggle Menu"
            >
              {expand ? <IoClose size={28} /> : <GiHamburgerMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
