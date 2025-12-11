/**
 * Utility functions for generating URL-friendly slugs from category and subcategory names
 */

/**
 * Converts any string to a URL-friendly slug
 * @param text - The text to convert (e.g., "Product Name")
 * @returns URL-friendly slug (e.g., "product-name")
 */
export function slugify(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "") // Remove any other special characters
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Converts a category name to a URL-friendly slug
 * @param categoryName - The category name (e.g., "Structural Materials")
 * @returns URL-friendly slug (e.g., "structural-materials")
 */
export function getCategorySlug(categoryName: string): string {
  return slugify(categoryName);
}

/**
 * Converts a subcategory name to a URL-friendly slug
 * @param subcategoryName - The subcategory name (e.g., "Metal Sections & Profiles")
 * @returns URL-friendly slug (e.g., "metal-sections-and-profiles")
 */
export function getSubcategorySlug(subcategoryName: string): string {
  return slugify(subcategoryName);
}
