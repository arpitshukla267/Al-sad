"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
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
  const productsTriggerRef = useRef(null);
  const [alignOffset, setAlignOffset] = useState(0);

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
              category.subcategories?.map((subcat) => {
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
        // Replace Structural Materials and Professional Tools & Gear with real data
        const mergedCategories = [
          ...STATIC_CATEGORIES.filter(
            (cat) =>
              cat.id !== "structural" && cat.id !== "professional-tools-gear"
          ),
          ...dynamicCategories,
        ].sort((a, b) => {
          // Sort to maintain consistent order
          const order = [
            "architectural",
            "structural",
            "professional-tools-gear",
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

  // Calculate offset to position dropdown from left edge of viewport
  useEffect(() => {
    if (productsDropdownOpen && productsTriggerRef.current) {
      const triggerRect = productsTriggerRef.current.getBoundingClientRect();
      const offset = triggerRect.left;
      setAlignOffset(-offset);
    }
  }, [productsDropdownOpen]);

  return (
    <header
      className={`${bgStyle} ${
        useGradient
          ? "bg-white md:bg-gradient-to-b md:from-white md:via-white md:to-transparent"
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
                      <button
                        ref={productsTriggerRef}
                        className="flex items-center gap-[8px] cursor-pointer hover:opacity-80"
                      >
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
                      side="bottom"
                      align="start"
                      sideOffset={0}
                      alignOffset={alignOffset}
                      className={`w-screen max-w-none p-0 rounded-none border-0 ${
                        useGradient || !isDarkBackground
                          ? "bg-white"
                          : "bg-[#0e2143]"
                      }`}
                      style={{
                        width: "100vw",
                        maxWidth: "100vw",
                      }}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 py-4 max-w-[1260px] mx-auto px-4 md:px-[50px] lg:px-[90px] xl:px-[170px]">
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
          <GiHamburgerMenu
            size={24}
            className={`${textColor} md:hidden`}
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${textColor} text-lg font-medium ${
          expand ? "flex" : "hidden"
        } md:hidden flex flex-col items-end gap-3 transition-all ease-in pt-4`}
      >
        {NAV_ITEMS.map((item, idx) => {
          if (item.hasDropdown) {
            return (
              <div key={idx} className="w-full">
                <button
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  className="flex items-center gap-2 w-full justify-end uppercase"
                >
                  {item.name}
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform duration-200 ${
                      productsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {productsDropdownOpen && (
                  <div className="flex flex-col items-end gap-3 mt-2 pr-4">
                    {productCategories.map((category, catIdx) => (
                      <div key={catIdx} className="w-full">
                        <h4 className="text-sm font-semibold mb-1">
                          {category.name}
                        </h4>
                        <div className="flex flex-col gap-1 pl-2">
                          {category.subcategories.map((subcat, subIdx) => {
                            const isStatic = category.isStatic;
                            if (isStatic) {
                              // Static category - show as non-clickable text
                              return (
                                <span
                                  key={subIdx}
                                  className="text-xs opacity-50 cursor-not-allowed"
                                >
                                  {subcat.name}
                                </span>
                              );
                            }
                            // Real data - show as clickable link
                            return (
                              <Link
                                key={subIdx}
                                href={subcat.path}
                                onClick={() => {
                                  setProductsDropdownOpen(false);
                                  setExpand(false);
                                }}
                                className="text-xs opacity-80 hover:opacity-100"
                              >
                                {subcat.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link href={item?.path} key={idx} onClick={() => setExpand(false)}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
