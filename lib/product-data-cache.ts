// Type definition for product data
interface ProductData {
  lastUpdated: string;
  categories: any[];
}

// Cache the product data to avoid re-reading the file
let cachedData: ProductData | null = null;

/**
 * Gets the cached product data from all-products.json
 * @returns Promise that resolves to the product data
 */
export async function getCachedProductData(): Promise<ProductData> {
  if (cachedData) {
    return cachedData;
  }

  // In a browser environment, we need to fetch the JSON
  // In Node.js/server, we can read it from the file system
  if (typeof window === "undefined") {
    // Server-side: read from file system using dynamic imports
    try {
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "data", "all-products.json");
      const fileContents = fs.readFileSync(filePath, "utf8");
      cachedData = JSON.parse(fileContents) as ProductData;
      return cachedData;
    } catch (error) {
      console.error("Error reading product data file:", error);
      // Return empty structure as fallback
      return {
        lastUpdated: new Date().toISOString(),
        categories: [],
      };
    }
  } else {
    // Client-side: fetch from API route
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      cachedData = (await response.json()) as ProductData;
      return cachedData;
    } catch (error) {
      console.error("Error loading product data:", error);
      // Return empty structure as fallback
      return {
        lastUpdated: new Date().toISOString(),
        categories: [],
      };
    }
  }
}
