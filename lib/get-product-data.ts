import { getCachedProductData } from "./product-data-cache";
import { getCategorySlug, getSubcategorySlug } from "./product-data";

/**
 * Gets a category by its slug
 * @param categorySlug - The URL-friendly slug for the category
 * @returns The category object or null if not found
 */
export async function getCategoryBySlug(
  categorySlug: string
): Promise<any | null> {
  const data = await getCachedProductData();
  const category = data.categories?.find(
    (cat) => getCategorySlug(cat.category) === categorySlug
  );
  return category || null;
}

/**
 * Converts a category slug back to its display name
 * @param categorySlug - The URL-friendly slug
 * @returns The category name or a formatted version of the slug
 */
export function getCategoryNameFromSlug(categorySlug: string): string {
  // Convert slug back to readable name
  return categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Gets a subcategory by category and subcategory slugs
 * @param categorySlug - The URL-friendly slug for the category
 * @param subcategorySlug - The URL-friendly slug for the subcategory
 * @returns The subcategory object or null if not found
 */
export async function getSubcategoryBySlugs(
  categorySlug: string,
  subcategorySlug: string
): Promise<any | null> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  const subcategory = category.subcategories?.find(
    (subcat: { name: string }) =>
      getSubcategorySlug(subcat.name) === subcategorySlug
  );
  return subcategory || null;
}

/**
 * Gets a product by slug from a subcategory
 * @param subcategory - The subcategory object containing products
 * @param productSlug - The URL-friendly slug for the product
 * @returns The product object or null if not found
 */
export function getProductBySlug(
  subcategory: any,
  productSlug: string
): any | null {
  if (!subcategory) return null;

  // Handle different product structures
  // Structure 1: Direct products array
  if (subcategory.products && Array.isArray(subcategory.products)) {
    const product = subcategory.products.find((p: any) => {
      const productName = p.name || p.type || p.section || "";
      return getSubcategorySlug(productName) === productSlug;
    });
    return product || null;
  }

  // Structure 2: productTypes with tools/products
  if (subcategory.productTypes && Array.isArray(subcategory.productTypes)) {
    for (const productType of subcategory.productTypes) {
      if (productType.tools && Array.isArray(productType.tools)) {
        const product = productType.tools.find((tool: any) => {
          const productName = tool.name || "";
          return getSubcategorySlug(productName) === productSlug;
        });
        if (product) return product;
      }
      if (productType.products && Array.isArray(productType.products)) {
        const product = productType.products.find((p: any) => {
          const productName = p.name || p.type || "";
          return getSubcategorySlug(productName) === productSlug;
        });
        if (product) return product;
      }
    }
  }

  return null;
}
