"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import logoDark from "../../public/assets/logo-dark.svg";
import logoLight from "../../public/assets/logo-light.svg";
import { SearchIcon, X } from "lucide-react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const searchBarContainerRef = useRef(null);

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

        // Replace static placeholders with real data from JSON
        const dynamicIds = new Set(
          dynamicCategories.map((c) => c.id)
        );
        const staticExcluded = (catId) => {
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

  useEffect(() => {
    if (productsDropdownOpen && productsTriggerRef.current) {
      const triggerRect = productsTriggerRef.current.getBoundingClientRect();
      const offset = triggerRect.left;
      setAlignOffset(-offset);
    }
  }, [productsDropdownOpen]);

  // Multi-phase GSAP animation for search bar toggle
  useGSAP(
    () => {
      if (!searchBarContainerRef.current) return;

      if (isSearchOpen) {
        // Opening animation
        gsap.fromTo(
          searchBarContainerRef.current,
          { height: 0, opacity: 0, visibility: "hidden" },
          {
            height: "auto",
            opacity: 1,
            visibility: "visible",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              if (searchInputRef.current) searchInputRef.current.focus();
            },
          }
        );
      } else {
        // Closing animation
        gsap.to(searchBarContainerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(searchBarContainerRef.current, { visibility: "hidden" });
          },
        });
      }
    },
    { dependencies: [isSearchOpen] }
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a search results page or filter products
      console.log("Searching for:", searchQuery);
      // window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

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
            suppressHydrationWarning
          >
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col p-2 gap-2">
          {NAV_ITEMS.map((item, idx) => {
            if (item.hasDropdown) {
              return (
                <div key={idx} className="border-b border-gray-100">
                  <button
                    onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                    className="flex items-center justify-between w-full uppercase font-primary font-bold text-xl tracking-widest text-[#0e2143]"
                    suppressHydrationWarning
                  >
                    <span>{item.name}</span>
                    <MdOutlineKeyboardArrowDown 
                      size={28} 
                      className={`transition-transform duration-300 ${productsDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`mt-6 overflow-hidden transition-all duration-300 ${
                      productsDropdownOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-8 pl-2">
                      {productCategories.map((category, catIdx) => (
                        <div key={catIdx}>
                          <Link
                            href={`/products/${category.id}`}
                            onClick={() => {
                              setExpand(false);
                              setProductsDropdownOpen(false);
                            }}
                            className="block text-base font-primary font-bold uppercase tracking-widest text-[#0e2143] mb-4"
                          >
                            {category.name}
                          </Link>

                          <div className="flex flex-col gap-3 pl-3 border-l border-gray-100">
                            {category.subcategories.map((subcat, subIdx) => (
                              <Link
                                key={subIdx}
                                href={subcat.path}
                                onClick={() => {
                                  setExpand(false);
                                  setProductsDropdownOpen(false);
                                }}
                                className="text-sm opacity-75 hover:opacity-100 font-secondary text-[#0e2143] py-1"
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
                className="font-primary font-bold text-xl tracking-widest uppercase border-b border-gray-100 pb-6 text-[#0e2143] block"
              >
                {item.name}
              </Link>
            );
          })}

          <div className="mt-4">
            <Button
              className="w-full bg-[#0e2143] text-white py-8 rounded-lg text-xl uppercase tracking-widest font-primary font-bold shadow-2xl transition-transform active:scale-95"
              onClick={() => setExpand(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <header
        className={`w-full ${bgStyle} ${
          useGradient
            ? "bg-white md:bg-gradient-to-b md:from-white md:via-white md:to-transparent"
            : ""
        } px-4 py-[14px] md:px-[50px] lg:px-[90px] xl:px-[170px] md:py-[12px] relative z-[100]`}
      >
        <div className="flex justify-between max-w-full items-center w-full">
          {/* Logo and Navigation Container */}
          <div className="flex items-center gap-[44px] md:gap-[44px] lg:gap-[44px]">
           <Link href="/"> 
            <Image
              src={useGradient ? logoDark : useLightLogo ? logoLight : logoDark}
              alt="Logo"
              width={79.373}
              height={59.522}
              className="h-[35.809px] w-[47px] md:h-[36px] md:w-[48px] lg:h-[59.522px] lg:w-[79.373px] flex-shrink-0"
            />
           </Link> 
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
                          suppressHydrationWarning
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
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`${
                useGradient
                  ? "text-[#0e2143]"
                  : useLightLogo
                  ? "text-white"
                  : "text-[#0e2143]"
              } w-6 h-6 md:w-[24px] md:h-[24px] z-10`}
              suppressHydrationWarning
            >
              {isSearchOpen ? (
                <X className="w-6 h-6 md:w-[24px] md:h-[24px]" />
              ) : (
                <SearchIcon className="w-6 h-6 md:w-[24px] md:h-[24px]" />
              )}
            </Button>

            {/* Search Bar Overlay - Slides down below nav */}
            <div
              ref={searchBarContainerRef}
              className={`absolute top-full left-0 right-0 z-40 overflow-hidden shadow-lg border-t ${
                useGradient || !isDarkBackground
                  ? "bg-white border-black/5"
                  : "bg-[#0e2143] border-white/10"
              }`}
              style={{ visibility: "hidden", height: 0 }}
            >
              <div className="px-4 py-4 md:px-[50px] lg:px-[90px] xl:px-[170px]">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-4 max-w-[1260px] mx-auto"
                >
                  <SearchIcon
                    className={`w-5 h-5 ${
                      useGradient || !isDarkBackground
                        ? "text-[#0e2143]"
                        : "text-white"
                    }`}
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products, materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 bg-transparent border-none outline-none font-primary text-base md:text-lg ${
                      useGradient || !isDarkBackground
                        ? "text-[#0e2143]"
                        : "text-white"
                    }`}
                  />
                </form>
              </div>
            </div>

            {/* Mobile Menu Icon - Only on mobile */}
            <button
              onClick={toggleMenu}
              className={`${textColor} md:hidden z-50 focus:outline-none`}
              aria-label="Toggle Menu"
              suppressHydrationWarning
            >
              {expand ? <X size={28} /> : <GiHamburgerMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
