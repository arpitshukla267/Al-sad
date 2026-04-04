"use client";

import React, { use, useState, useEffect } from "react";
import Header from "../../../Header";
import Footer from "../../../Footer";
import { LuSettings2, LuX } from "react-icons/lu";
import Breadcrumb from "./components/Breadcrumb";
import PageTitle from "./components/PageTitle";
import ProductCount from "./components/ProductCount";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import FilterPills from "./components/FilterPills";
import HelpSection from "./components/HelpSection";
import Link from "next/link";
import {
  getCategoryBySlug,
  getSubcategoryBySlugs,
  getCategoryNameFromSlug,
} from "@/lib/get-product-data";
import { flattenProducts } from "@/lib/filter-config";

const Layer2Page = ({ params }) => {
  const { category: categorySlug, subcategory: subcategorySlug } = use(
    params || Promise.resolve({ category: "", subcategory: "" })
  );
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [subcategoryData, setSubcategoryData] = useState({
    title: "",
    breadcrumb: [{ name: "Home", path: "/" }],
    products: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubcategoryData = async () => {
      try {
        const category = await getCategoryBySlug(categorySlug);
        const categoryName = category
          ? category.category
          : getCategoryNameFromSlug(categorySlug);

        if (category) {
          const subcategory = await getSubcategoryBySlugs(
            categorySlug,
            subcategorySlug
          );

          if (subcategory) {
            const products = flattenProducts(subcategory);
            const subcategoryName = subcategory.name.trim();

            setSubcategoryData({
              title: subcategoryName,
              breadcrumb: [
                { name: "Home", path: "/" },
                { name: categoryName, path: `/products/${categorySlug}` },
                {
                  name: subcategoryName,
                  path: `/products/${categorySlug}/${subcategorySlug}`,
                },
              ],
              products,
              subcategory,
              categoryName,
            });
          } else {
            // Fallback if subcategory not found
            setSubcategoryData({
              title: subcategorySlug,
              breadcrumb: [
                { name: "Home", path: "/" },
                { name: categoryName, path: `/products/${categorySlug}` },
                {
                  name: subcategorySlug,
                  path: `/products/${categorySlug}/${subcategorySlug}`,
                },
              ],
              products: [],
              subcategory: null,
              categoryName,
            });
          }
        } else {
          // Fallback if category not found
          setSubcategoryData({
            title: subcategorySlug,
            breadcrumb: [
              { name: "Home", path: "/" },
              {
                name: getCategoryNameFromSlug(categorySlug),
                path: `/products/${categorySlug}`,
              },
              {
                name: subcategorySlug,
                path: `/products/${categorySlug}/${subcategorySlug}`,
              },
            ],
            products: [],
            subcategory: null,
            categoryName: getCategoryNameFromSlug(categorySlug),
          });
        }
      } catch (error) {
        console.error("Error loading subcategory data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubcategoryData();
  }, [categorySlug, subcategorySlug]);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const productCount = subcategoryData.products?.length || 0;

  return (
    <div className="flex flex-col overflow-x-hidden min-h-screen">
      <div className="h-max w-full flex items-center fixed top-0 z-[100]">
        <Header isDarkBackground={true} />
      </div>
      <main className="flex flex-col flex-1 justify-start items-center relative min-h-screen mt-[63px] md:mt-[83px] overflow-x-hidden pb-[60px] md:pb-0">
        <div className="w-full max-w-full mx-auto h-full">
          <div className="bg-white w-full py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="max-w-[1260px] mx-auto px-4 ">
              <Breadcrumb items={subcategoryData.breadcrumb} />
              <PageTitle title={subcategoryData.title} />
              <ProductCount count={productCount} />
              <SearchBar />
              {activeFilters.length > 0 && (
                <FilterPills
                  filters={activeFilters}
                  onRemove={handleFilterChange}
                  onClearAll={handleClearFilters}
                />
              )}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-6">
                {/* Filter Sidebar - Hidden on mobile, shown on desktop */}
                <div className="hidden md:block md:w-[280px] lg:w-[280px] flex-shrink-0">
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    activeFilters={activeFilters}
                    category={subcategoryData.categoryName}
                    subcategory={
                      subcategoryData.subcategory?.name || subcategoryData.title
                    }
                    products={subcategoryData.products}
                    subcategoryData={subcategoryData.subcategory}
                  />
                </div>
                {/* Product Grid */}
                <div className="flex-1 min-w-0">
                  <ProductGrid
                    products={subcategoryData.products}
                    filters={activeFilters}
                    categorySlug={categorySlug}
                    subcategorySlug={subcategorySlug}
                  />
                </div>
              </div>
            </div>
          </div>
          <HelpSection />
        </div>
      </main>

      {/* Mobile Filter & Enquire Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-[60px] flex z-[1000] border-t border-gray-200">
        <button
          onClick={() => setShowFilters(true)}
          className="flex-1 bg-[#0E2143] text-white flex items-center justify-center gap-3 font-primary font-semibold"
        >
          <LuSettings2 size={24} />
          <span className="text-[18px] uppercase tracking-wide">Filters</span>
        </button>
        <Link
          href="/contact-us"
          className="flex-1 bg-[#04724D] text-white flex items-center justify-center font-primary font-semibold"
        >
          <span className="text-[18px] uppercase tracking-wide">Enquire Now</span>
        </Link>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-[1001] transition-opacity duration-300 ${
          showFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0 backdrop-blur-xs bg-opacity-50"
          onClick={() => setShowFilters(false)}
        />
        
        <div 
          className={`absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5 border-b flex items-center justify-between bg-[#0E2143] text-white">
            <h3 className="font-primary font-bold text-xl uppercase tracking-wide">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="p-1 hover:rotate-90 transition-transform duration-200">
              <LuX size={28} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 bg-[#f8fafc]">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
              category={subcategoryData.categoryName}
              subcategory={
                subcategoryData.subcategory?.name || subcategoryData.title
              }
              products={subcategoryData.products}
              subcategoryData={subcategoryData.subcategory}
            />
          </div>
          <div className="p-5 border-t bg-white">
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-[#04724D] text-white py-4 rounded-lg font-primary font-bold uppercase tracking-[1px] text-[15px] shadow-lg active:scale-[0.98] transition-transform"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layer2Page;
