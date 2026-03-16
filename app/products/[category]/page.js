"use client";

import React, { use, useEffect, useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Breadcrumb from "./components/Breadcrumb";
import PageTitle from "./components/PageTitle";
import ProductGrid from "./components/ProductGrid";
import HelpSection from "./components/HelpSection";
import {
  getCategoryBySlug,
  getCategoryNameFromSlug,
} from "@/lib/get-product-data";
import { getSubcategorySlug } from "@/lib/product-data";

const Layer1Page = ({ params }) => {
  const { category: categorySlug } = use(params || Promise.resolve({ category: "" }));
  const [categoryData, setCategoryData] = useState({
    title: "",
    breadcrumb: [{ name: "Home", path: "/" }],
    subcategories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const category = await getCategoryBySlug(categorySlug);
        const categoryName = category
          ? category.category
          : getCategoryNameFromSlug(categorySlug);

        if (category) {
          // Build subcategories for display
          const subcategories =
            category.subcategories?.map((subcat) => {
              // Use the same slug function to ensure consistency
              const subcategorySlug = getSubcategorySlug(subcat.name);
              return {
                name: subcat.name.trim(),
                path: `/products/${categorySlug}/${subcategorySlug}`,
              };
            }) || [];

          setCategoryData({
            title: categoryName,
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: categoryName, path: `/products/${categorySlug}` },
            ],
            subcategories,
          });
        } else {
          // Fallback for categories without data
          setCategoryData({
            title: categoryName,
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: categoryName, path: `/products/${categorySlug}` },
            ],
            subcategories: [],
          });
        }
      } catch (error) {
        console.error("Error loading category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-x-hidden min-h-screen">
      <div className="h-max sm:h-[85px] w-full flex items-center fixed top-0 z-[100]">
        <Header isDarkBackground={true} />
      </div>
      <main className="flex flex-col flex-1 justify-start items-center relative min-h-screen mt-[75px] sm:mt-[85px] overflow-x-hidden">
        <div className="w-full max-w-full mx-auto h-full">
          <div className="bg-white w-full py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="max-w-[1260px] mx-auto px-4 ">
              <Breadcrumb items={categoryData.breadcrumb} />
              <PageTitle title={categoryData.title} />
              <ProductGrid subcategories={categoryData.subcategories} />
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

export default Layer1Page;
