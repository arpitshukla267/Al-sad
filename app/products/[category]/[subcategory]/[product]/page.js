"use client";

import React, { use, useState, useEffect } from "react";
import Header from "../../../../Header";
import Footer from "../../../../Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductDetailContent from "./components/ProductDetailContent";
import HelpSection from "../components/HelpSection";
import {
  getCategoryBySlug,
  getSubcategoryBySlugs,
  getCategoryNameFromSlug,
  getProductBySlug,
} from "@/lib/get-product-data";

const ProductDetailPage = ({ params }) => {
  const { category: categorySlug, subcategory: subcategorySlug, product: productSlug } =
    use(params || Promise.resolve({ category: "", subcategory: "", product: "" }));
  const [productData, setProductData] = useState({
    product: null,
    categoryName: "",
    subcategoryName: "",
    breadcrumb: [{ name: "Home", path: "/" }],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductData = async () => {
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
            const product = getProductBySlug(subcategory, productSlug);
            const subcategoryName = subcategory.name.trim();

            if (product) {
              setProductData({
                product,
                categoryName,
                subcategoryName,
                breadcrumb: [
                  { name: "Home", path: "/" },
                  { name: categoryName, path: `/products/${categorySlug}` },
                  {
                    name: subcategoryName,
                    path: `/products/${categorySlug}/${subcategorySlug}`,
                  },
                  {
                    name: product.name || product.type || product.productType || "Product",
                    path: `/products/${categorySlug}/${subcategorySlug}/${productSlug}`,
                  },
                ],
              });
            } else {
              // Product not found
              setProductData({
                product: null,
                categoryName,
                subcategoryName,
                breadcrumb: [
                  { name: "Home", path: "/" },
                  { name: categoryName, path: `/products/${categorySlug}` },
                  {
                    name: subcategoryName,
                    path: `/products/${categorySlug}/${subcategorySlug}`,
                  },
                ],
              });
            }
          } else {
            // Subcategory not found
            setProductData({
              product: null,
              categoryName,
              subcategoryName: "",
              breadcrumb: [
                { name: "Home", path: "/" },
                { name: categoryName, path: `/products/${categorySlug}` },
              ],
            });
          }
        } else {
          // Category not found
          setProductData({
            product: null,
            categoryName: getCategoryNameFromSlug(categorySlug),
            subcategoryName: "",
            breadcrumb: [{ name: "Home", path: "/" }],
          });
        }
      } catch (error) {
        console.error("Error loading product data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [categorySlug, subcategorySlug, productSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!productData.product) {
    return (
      <div className="flex flex-col overflow-x-hidden min-h-screen">
        <div className="h-max sm:h-[85px] w-full flex items-center fixed top-0 z-[100]">
          <Header isDarkBackground={true} />
        </div>
        <main className="flex flex-col flex-1 justify-start items-center relative min-h-screen mt-[75px] sm:mt-[85px] overflow-x-hidden">
          <div className="w-full max-w-full mx-auto h-full">
            <div className="bg-white w-full py-8 sm:py-10 md:py-12 lg:py-16">
              <div className="max-w-[1260px] mx-auto px-4 ">
                <Breadcrumb items={productData.breadcrumb} />
                <div className="text-center py-16">
                  <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                  <p className="text-gray-600">
                    The product you&apos;re looking for doesn&apos;t exist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="py-10 px-4">
          <Footer />
        </div>
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
              <Breadcrumb items={productData.breadcrumb} />
              <ProductDetailContent
                product={productData.product}
                categoryName={productData.categoryName}
                subcategoryName={productData.subcategoryName}
                backUrl={productData.breadcrumb?.length >= 2 ? productData.breadcrumb[productData.breadcrumb.length - 2].path : undefined}
                backLabel={productData.breadcrumb?.length >= 2 ? productData.breadcrumb[productData.breadcrumb.length - 2].name : undefined}
              />
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

export default ProductDetailPage;
