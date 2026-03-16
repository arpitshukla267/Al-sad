/**
 * Flattens products from a subcategory into a single array
 * Handles different product structures:
 * - Direct products array
 * - productTypes with tools/products arrays
 * @param subcategory - The subcategory object
 * @returns Array of flattened products
 */
export function flattenProducts(subcategory: any): any[] {
  if (!subcategory) return [];

  const products: any[] = [];

  // Structure 1: Direct products array
  if (subcategory.products && Array.isArray(subcategory.products)) {
    products.push(...subcategory.products);
  }

  // Structure 1b: Rivets (Screws & Nails sheet)
  if (subcategory.rivets && Array.isArray(subcategory.rivets)) {
    products.push(...subcategory.rivets);
  }

  // Structure 2: productTypes with tools/products
  if (subcategory.productTypes && Array.isArray(subcategory.productTypes)) {
    subcategory.productTypes.forEach((productType: any) => {
      if (productType.tools && Array.isArray(productType.tools)) {
        products.push(...productType.tools);
      }
      if (productType.products && Array.isArray(productType.products)) {
        products.push(...productType.products);
      }
    });
  }

  return products;
}

/**
 * Gets filter configuration for a specific category and subcategory
 * @param category - The category name (e.g., "structural-materials")
 * @param subcategoryName - The subcategory name (e.g., "Screws & Nails")
 * @returns Filter configuration array
 */
export function getFilterConfig(
  category: string,
  subcategoryName: string
): any[] {
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
  const subcategorySlug = subcategoryName.toLowerCase().replace(/\s+/g, "-");

  // Structural Materials filters
  if (categorySlug.includes("structural")) {
    if (
      subcategorySlug.includes("screws") ||
      subcategorySlug.includes("nails")
    ) {
      return [
        { id: "type", title: "Type", extractFrom: "type" },
        { id: "material", title: "Material", extractFrom: "material" },
        { id: "finish", title: "Finish", extractFrom: "finish" },
        { id: "headType", title: "Head Type", extractFrom: "headType" },
      ];
    }
    if (
      subcategorySlug.includes("metal") ||
      subcategorySlug.includes("section") ||
      subcategorySlug.includes("profile")
    ) {
      return [
        { id: "type", title: "Type", extractFrom: "type" },
        { id: "material", title: "Material", extractFrom: "material" },
        { id: "finish", title: "Finish", extractFrom: "finish" },
        { id: "section", title: "Section", extractFrom: "section" },
      ];
    }
    if (
      subcategorySlug.includes("fastening") ||
      subcategorySlug.includes("anchor")
    ) {
      return [
        { id: "type", title: "Type", extractFrom: "type" },
        { id: "material", title: "Material", extractFrom: "material" },
        { id: "application", title: "Application", extractFrom: "application" },
      ];
    }
    if (subcategorySlug.includes("industrial")) {
      return [
        { id: "category", title: "Category", extractFrom: "category" },
        { id: "type", title: "Type", extractFrom: "type" },
        { id: "material", title: "Material", extractFrom: "material" },
      ];
    }
  }

  // Professional Tools & Gear filters
  if (categorySlug.includes("professional") || categorySlug.includes("tools")) {
    if (subcategorySlug.includes("hand") || subcategorySlug.includes("power")) {
      return [
        {
          id: "productType",
          title: "Product Type",
          extractFrom: "productTypes.name",
        },
      ];
    }
    if (
      subcategorySlug.includes("safety") ||
      subcategorySlug.includes("protection")
    ) {
      return [
        {
          id: "protectionType",
          title: "Protection Type",
          extractFrom: "protectionType",
        },
      ];
    }
    if (subcategorySlug.includes("abrasive")) {
      return [{ id: "toolType", title: "Tool Type", extractFrom: "toolType" }];
    }
  }

  // Architectural Components filters
  if (categorySlug.includes("architectural")) {
    return [
      { id: "type", title: "Type", extractFrom: "type" },
      { id: "rootCategory", title: "Category", extractFrom: "rootCategory" },
    ];
  }

  // Retail & Home Solutions filters
  if (categorySlug.includes("retail") || categorySlug.includes("home")) {
    return [
      { id: "type", title: "Style", extractFrom: "type" },
    ];
  }

  // Default filters for unknown categories
  return [
    { id: "type", title: "Type", extractFrom: "type" },
    { id: "material", title: "Material", extractFrom: "material" },
  ];
}

/**
 * Extracts unique values from a nested path in an object
 * @param obj - The object to extract from
 * @param path - The path to extract (e.g., "material" or "productTypes.name")
 * @returns The value at the path
 */
function extractValue(obj: any, path: string): any {
  if (!obj || !path) return null;

  const parts = path.split(".");
  let value = obj;

  for (const part of parts) {
    if (value && typeof value === "object") {
      value = value[part];
    } else {
      return null;
    }
  }

  return value;
}

/**
 * Builds filter options from product data based on filter configuration
 * @param data - The data object (can have products array or productTypes)
 * @param category - The category name
 * @param subcategoryName - The subcategory name
 * @returns Object with filter sections and their options
 */
export function buildFilters(
  data: any,
  category: string,
  subcategoryName: string
): Record<string, { title: string; options: string[]; type: string }> {
  const filterConfig = getFilterConfig(category, subcategoryName);
  const filters: Record<
    string,
    { title: string; options: string[]; type: string }
  > = {};

  // Get products array
  let products: any[] = [];
  if (data.products && Array.isArray(data.products)) {
    products = data.products;
  } else if (data.productTypes && Array.isArray(data.productTypes)) {
    // For Professional Tools & Gear structure
    data.productTypes.forEach((productType: any) => {
      if (productType.tools) {
        products.push(...productType.tools);
      }
      if (productType.products) {
        products.push(...productType.products);
      }
    });
  }

  // Build filters based on configuration
  filterConfig.forEach((config: any) => {
    const values = new Set<string>();

    products.forEach((product: any) => {
      const value = extractValue(product, config.extractFrom);
      if (value && typeof value === "string" && value.trim()) {
        values.add(value.trim());
      } else if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v && typeof v === "string" && v.trim()) {
            values.add(v.trim());
          }
        });
      }
    });

    // Special handling for productTypes.name (Professional Tools & Gear)
    if (config.extractFrom === "productTypes.name" && data.productTypes) {
      data.productTypes.forEach((productType: any) => {
        if (productType.name && productType.name.trim()) {
          values.add(productType.name.trim());
        }
      });
    }

    if (values.size > 0) {
      filters[config.id] = {
        title: config.title,
        options: Array.from(values).sort(),
        type: config.type || "checkbox",
      };
    }
  });

  return filters;
}
