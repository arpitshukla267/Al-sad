#!/usr/bin/env node

/**
 * Converts all images in the informations/ folder to WebP format.
 * Supports: .png, .jpg, .jpeg, .gif, .bmp, .tiff
 * Output: same path with .webp extension. Use --keep to keep originals.
 *
 * Usage:
 *   node scripts/convert-informations-to-webp.js        # convert, then remove originals
 *   node scripts/convert-informations-to-webp.js --keep # convert, keep originals
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INFORMATIONS_DIR = path.join(__dirname, "..", "informations");
const KEEP_ORIGINALS = process.argv.includes("--keep");

const SUPPORTED_EXT = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".tif"];

let converted = 0;
let skipped = 0;
let errors = 0;
const conversionLog = [];

function findImages(dir) {
  const images = [];
  if (!fs.existsSync(dir)) return images;

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      images.push(...findImages(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (SUPPORTED_EXT.includes(ext)) images.push(fullPath);
    }
  }
  return images;
}

async function convertToWebP(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const base = inputPath.slice(0, -ext.length);
    const outputPath = base + ".webp";

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping (WebP exists): ${path.relative(INFORMATIONS_DIR, inputPath)}`);
      skipped++;
      return false;
    }

    const inputOptions = ext === ".gif" ? { animated: true } : {};
    const webpOptions = { quality: 85 };
    await sharp(inputPath, inputOptions).webp(webpOptions).toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(
      `✅ ${path.relative(INFORMATIONS_DIR, inputPath)} → .webp (${savings}% smaller)`
    );
    conversionLog.push({ inputPath, outputPath, originalSize, webpSize, savings: parseFloat(savings) });
    converted++;

    if (!KEEP_ORIGINALS) {
      fs.unlinkSync(inputPath);
      console.log(`   🗑️  Removed original`);
    }
    return true;
  } catch (err) {
    console.error(`❌ ${path.relative(INFORMATIONS_DIR, inputPath)}: ${err.message}`);
    errors++;
    return false;
  }
}

async function main() {
  console.log("🖼️  Converting images in informations/ to WebP...\n");
  console.log(`   Directory: ${INFORMATIONS_DIR}`);
  console.log(`   Keep originals: ${KEEP_ORIGINALS}\n`);

  const images = findImages(INFORMATIONS_DIR);
  console.log(`   Found ${images.length} image(s) to process.\n`);

  for (const img of images) {
    await convertToWebP(img);
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary:");
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ⏭️  Skipped (already WebP): ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`   📁 Total: ${images.length}`);

  if (conversionLog.length > 0) {
    const totalOrig = conversionLog.reduce((s, i) => s + i.originalSize, 0);
    const totalWebp = conversionLog.reduce((s, i) => s + i.webpSize, 0);
    const savedMb = ((totalOrig - totalWebp) / 1024 / 1024).toFixed(2);
    const pct = ((1 - totalWebp / totalOrig) * 100).toFixed(1);
    console.log(`   💾 Size saved: ${savedMb} MB (${pct}% reduction)`);
  }
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
