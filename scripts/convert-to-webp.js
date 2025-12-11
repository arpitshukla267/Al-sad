#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Directories to process
const imageDirs = [path.join(__dirname, "..", "public", "assets", "images")];

// Track conversions
let converted = 0;
let errors = 0;
const conversionLog = [];

/**
 * Convert a single image to WebP
 */
async function convertToWebP(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      return false;
    }

    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    // Skip if WebP already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping (WebP exists): ${path.basename(inputPath)}`);
      return false;
    }

    // Convert to WebP with quality 85 (good balance)
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(
      `✅ Converted: ${path.basename(inputPath)} → ${path.basename(
        outputPath
      )} (${savings}% smaller)`
    );

    conversionLog.push({
      original: inputPath,
      webp: outputPath,
      originalSize,
      webpSize,
      savings: parseFloat(savings),
    });

    // Delete original file
    fs.unlinkSync(inputPath);
    console.log(`🗑️  Deleted original: ${path.basename(inputPath)}`);

    converted++;
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    errors++;
    return false;
  }
}

/**
 * Find all image files recursively
 */
function findImages(dir) {
  const images = [];

  if (!fs.existsSync(dir)) {
    return images;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      images.push(...findImages(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

/**
 * Update references in JSON files
 */
function updateJsonReferences() {
  const jsonFiles = [
    path.join(__dirname, "..", "data", "all-products.json"),
    path.join(__dirname, "..", "data", "professional-tools-gear.json"),
    path.join(__dirname, "..", "data", "structural-materials.json"),
  ];

  for (const jsonFile of jsonFiles) {
    if (!fs.existsSync(jsonFile)) continue;

    try {
      let content = fs.readFileSync(jsonFile, "utf8");
      let updated = false;

      // Replace image extensions in JSON
      const patterns = [
        { from: /\.jpg"/g, to: '.webp"' },
        { from: /\.jpeg"/g, to: '.webp"' },
        { from: /\.png"/g, to: '.webp"' },
        { from: /\.jpg'/g, to: ".webp'" },
        { from: /\.jpeg'/g, to: ".webp'" },
        { from: /\.png'/g, to: ".webp'" },
      ];

      for (const pattern of patterns) {
        if (pattern.from.test(content)) {
          content = content.replace(pattern.from, pattern.to);
          updated = true;
        }
      }

      if (updated) {
        fs.writeFileSync(jsonFile, content, "utf8");
        console.log(`📝 Updated references in: ${path.basename(jsonFile)}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${jsonFile}:`, error.message);
    }
  }
}

/**
 * Update references in JS/JSX/TS/TSX files
 */
function updateCodeReferences() {
  const codeDirs = [
    path.join(__dirname, "..", "app"),
    path.join(__dirname, "..", "components"),
  ];

  const extensions = [".js", ".jsx", ".ts", ".tsx"];
  const patterns = [
    { from: /\.jpg"/g, to: '.webp"' },
    { from: /\.jpeg"/g, to: '.webp"' },
    { from: /\.png"/g, to: '.webp"' },
    { from: /\.jpg'/g, to: ".webp'" },
    { from: /\.jpeg'/g, to: ".webp'" },
    { from: /\.png'/g, to: ".webp'" },
    { from: /\.jpg`/g, to: ".webp`" },
    { from: /\.jpeg`/g, to: ".webp`" },
    { from: /\.png`/g, to: ".webp`" },
  ];

  function processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, "utf8");
      let updated = false;

      for (const pattern of patterns) {
        if (pattern.from.test(content)) {
          content = content.replace(pattern.from, pattern.to);
          updated = true;
        }
      }

      if (updated) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`📝 Updated: ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
    }
  }

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (extensions.includes(ext)) {
          processFile(fullPath);
        }
      }
    }
  }

  for (const dir of codeDirs) {
    walkDir(dir);
  }
}

/**
 * Main conversion process
 */
async function main() {
  console.log("🖼️  Starting image conversion to WebP...\n");

  // Find all images
  const allImages = [];
  for (const dir of imageDirs) {
    allImages.push(...findImages(dir));
  }

  console.log(`Found ${allImages.length} images to convert\n`);

  // Convert images
  for (const imagePath of allImages) {
    await convertToWebP(imagePath);
  }

  console.log("\n📝 Updating references in JSON files...");
  updateJsonReferences();

  console.log("\n📝 Updating references in code files...");
  updateCodeReferences();

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Conversion Summary:");
  console.log(`   ✅ Converted: ${converted} images`);
  console.log(`   ❌ Errors: ${errors} images`);
  console.log(`   📁 Total processed: ${allImages.length} images`);

  if (conversionLog.length > 0) {
    const totalOriginalSize = conversionLog.reduce(
      (sum, item) => sum + item.originalSize,
      0
    );
    const totalWebpSize = conversionLog.reduce(
      (sum, item) => sum + item.webpSize,
      0
    );
    const totalSavings = (
      (1 - totalWebpSize / totalOriginalSize) *
      100
    ).toFixed(1);
    const sizeSaved = (
      (totalOriginalSize - totalWebpSize) /
      1024 /
      1024
    ).toFixed(2);

    console.log(
      `   💾 Total size saved: ${sizeSaved} MB (${totalSavings}% reduction)`
    );
  }
  console.log("=".repeat(50));
}

// Run the conversion
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
