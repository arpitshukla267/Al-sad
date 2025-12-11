# Product Image Organization

This document describes how product images are organized and mapped to products in the application.

## Directory Structure

All product images are stored in `public/assets/images/products/` with the following structure:

```
public/assets/images/products/
├── professional-tools-gear/
│   ├── hand-tools/
│   ├── power-tools/
│   ├── safety-protection/
│   └── abrasive-tools/
└── structural-materials/
    ├── screws-nails/
    ├── metal-section-profiles/
    ├── fastening-anchor-system/
    └── industrial-materials/
```

## Image Naming Convention

Images are normalized to lowercase with hyphens replacing spaces and special characters:

- Original: `Hammer.png` → Normalized: `hammer.png`
- Original: `Screw & Nails_Drywall Screw.png` → Normalized: `screw---nails-drywall-screw.png`

## Product Image Mapping

### Professional Tools & Gear

#### Hand Tools

- Images stored in: `professional-tools-gear/hand-tools/`
- Examples: `hammer.png`, `screwdriver.jpg`, `wrench.png`, `pliers.jpg`

#### Power Tools

- Images stored in: `professional-tools-gear/power-tools/`
- Examples: `electric-drill.jpg`, `impact-driver.png`, `circular-saw.png`

#### Safety & Protection

- Images stored in: `professional-tools-gear/safety-protection/`
- Examples: `safety-helmet.png`, `safety-goggles.png`, `safety-shoes.png`

#### Abrasive Tools

- Images stored in: `professional-tools-gear/abrasive-tools/`
- Examples: `grinding-wheel.png`, `sanding-disc.png`, `diamond-blade.png`

### Structural Materials

#### Screws & Nails

- Images stored in: `structural-materials/screws-nails/`
- Examples: `woodscrew-csk.png`, `chipboard-screw.png`, `solidrivet.png`

#### Metal Sections & Profiles

- Images stored in: `structural-materials/metal-section-profiles/`
- Examples: `flat-bar-ms.png`, `angle--l-profile--ms.png`, `stainless-steel-sheet.png`

#### Fastening & Anchor Systems

- Images stored in: `structural-materials/fastening-anchor-system/`
- Examples: `anchor-bolt-eye-bolt.jpg`, `ceiling-anchor.png`, `toggle-bolt.png`

#### Industrial Materials

- Images stored in: `structural-materials/industrial-materials/`
- Examples: `adhesives-construction-adhesive.png`, `welding-rods---electrodes-mild-steel-electrodes.png`

## Image Path in JSON Data

Product images are stored in the `all-products.json` file with the `image` property:

```json
{
  "name": "Hammer",
  "commonUse": "Driving nails, breaking objects",
  "image": "/assets/images/products/professional-tools-gear/hand-tools/hammer.webp"
}
```

## Scripts

### `scripts/organize-images.js`

- Copies images from source folders to organized structure in `public/assets/images/products/`
- Normalizes filenames (lowercase, hyphens)
- Creates directory structure automatically

### `scripts/map-product-images.js`

- Maps product names to image filenames
- Updates `all-products.json` with image paths
- Handles both Professional Tools & Gear and Structural Materials structures

## Usage

To reorganize images and update mappings:

```bash
# 1. Organize images (copy and normalize)
node scripts/organize-images.js

# 2. Map products to images and update JSON
node scripts/map-product-images.js
```

## Image Matching Logic

1. **Direct Match**: Exact product name match
2. **Partial Match**: Product name contains or is contained in mapping key
3. **Normalized Match**: Case-insensitive comparison after normalization

## Notes

- Images are referenced with paths starting from `/assets/images/products/`
- All image paths are relative to the `public` folder
- Missing images will have `null` or no `image` property in JSON
- Original source folders (`Professional Tools & Gear/`, `Structural Materials/`) are preserved
