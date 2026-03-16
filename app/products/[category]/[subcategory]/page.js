"use client";

import React, { use, useState, useEffect } from "react";
import Header from "../../../Header";
import Footer from "../../../Footer";
import Breadcrumb from "./components/Breadcrumb";
import PageTitle from "./components/PageTitle";
import ProductCount from "./components/ProductCount";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import FilterPills from "./components/FilterPills";
import HelpSection from "./components/HelpSection";
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
      <div className="h-max sm:h-[85px] w-full flex items-center fixed top-0 z-[100]">
        <Header isDarkBackground={true} />
      </div>
      <main className="flex flex-col flex-1 justify-start items-center relative min-h-screen mt-[75px] sm:mt-[85px] overflow-x-hidden">
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
      <div className="py-10 px-4">
        <Footer />
      </div>
    </div>
  );
};

export default Layer2Page;
