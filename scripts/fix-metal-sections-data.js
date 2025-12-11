#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the current all-products.json
const allProductsPath = path.join(__dirname, '../data/all-products.json');
const allProducts = JSON.parse(fs.readFileSync(allProductsPath, 'utf8'));

// Find the Metal Sections & Profiles subcategory
const structuralCategory = allProducts.categories.find(
  (cat) => cat.category === 'Structural Materials'
);

if (!structuralCategory) {
  console.error('Structural Materials category not found');
  process.exit(1);
}

const metalSectionsSubcat = structuralCategory.subcategories.find(
  (subcat) => subcat.name === 'Metal Sections & Profiles'
);

if (!metalSectionsSubcat) {
  console.error('Metal Sections & Profiles subcategory not found');
  process.exit(1);
}

// Keep existing Sheet & Flat Profiles products (they are correct)
const sheetAndFlatProfiles = metalSectionsSubcat.products.filter(
  (p) => p.category === 'Sheet & Flat Profiles'
);

// Add Architectural Profiles based on the image
const architecturalProfiles = [
  // Angle (L Profile)
  {
    category: 'Architectural Profiles',
    profileType: 'Angle (L Profile)',
    type: 'Angle (L Profile) - Aluminum',
    material: 'Aluminum',
    thickness: '1.5 – 6',
    standardSizes: '20x20 / 25x25 / 50x50',
    length: '3000 / 6000',
    finish: 'Mill / Anodized / Powder',
    applications: 'Frames, Edge Protection, Fabrication'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Angle (L Profile)',
    type: 'Angle (L Profile) - Stainless Steel (304)',
    material: 'Stainless Steel (304)',
    thickness: '1.5 – 5',
    standardSizes: '25x25 / 40x40',
    length: '2400 / 3000',
    finish: 'Satin / Mirror / Brushed',
    applications: 'Corner Guards, Cladding, Kitchen Frames'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Angle (L Profile)',
    type: 'Angle (L Profile) - Mild Steel (MS)',
    material: 'Mild Steel (MS)',
    thickness: '3 – 10',
    standardSizes: '25x25 / 40x40 / 50x50',
    length: '6000',
    finish: 'Painted / Galvanized',
    applications: 'Structural Support, Industrial Framing'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Angle (L Profile)',
    type: 'Angle (L Profile) - Brass',
    material: 'Brass',
    thickness: '2 – 5',
    standardSizes: '20x20 / 25x25',
    length: '3000',
    finish: 'Polished / Natural',
    applications: 'Decorative Edges, Antique Projects'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Angle (L Profile)',
    type: 'Angle (L Profile) - PVC',
    material: 'PVC',
    thickness: '1.5 – 3',
    standardSizes: '20x20 / 25x25',
    length: '3000',
    finish: 'White / Woodgrain Print',
    applications: 'Wall Corners, Tile Trims'
  },
  // Channel (U Profile)
  {
    category: 'Architectural Profiles',
    profileType: 'Channel (U Profile)',
    type: 'Channel (U Profile) - Aluminum',
    material: 'Aluminum',
    thickness: '1.5 – 5',
    standardSizes: '20x20 / 25x25 / 40x20',
    length: '3000 / 6000',
    finish: 'Anodized / Powder / Wood Finish',
    applications: 'Tracks, Sliding Doors, Enclosures'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Channel (U Profile)',
    type: 'Channel (U Profile) - Stainless Steel',
    material: 'Stainless Steel',
    thickness: '1.5 – 3',
    standardSizes: '20x20 / 25x25 / 38x25',
    length: '2400 / 3000',
    finish: 'Brushed / Mirror',
    applications: 'Wall Partitions, Furniture Profiles'
  },
  // Box / Square Hollow
  {
    category: 'Architectural Profiles',
    profileType: 'Box / Square Hollow',
    type: 'Box / Square Hollow - Aluminum',
    material: 'Aluminum',
    thickness: '1.5 – 6',
    standardSizes: '25x25 / 40x40 / 50x50',
    length: '3000 / 6000',
    finish: 'Mill / Powder / Anodized',
    applications: 'Partition Frames, Handrails, Windows'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Box / Square Hollow',
    type: 'Box / Square Hollow - MS / GI',
    material: 'MS / GI',
    thickness: '1.6 – 5',
    standardSizes: '25x25 / 50x50 / 75x75',
    length: '6000',
    finish: 'Galvanized / Painted',
    applications: 'Structural, Fence Frames'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Box / Square Hollow',
    type: 'Box / Square Hollow - Stainless Steel',
    material: 'Stainless Steel',
    thickness: '1.5 – 3',
    standardSizes: '25x25 / 50x50',
    length: '3000',
    finish: 'Brushed / Mirror',
    applications: 'Railing Posts, Decorative Structures'
  },
  // Rectangular Tube
  {
    category: 'Architectural Profiles',
    profileType: 'Rectangular Tube',
    type: 'Rectangular Tube - Aluminum',
    material: 'Aluminum',
    thickness: '1.5 – 6',
    standardSizes: '25x50 / 40x60 / 50x100',
    length: '3000 / 6000',
    finish: 'Anodized / Powder',
    applications: 'Framing, Doors, Commercial Profiles'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Rectangular Tube',
    type: 'Rectangular Tube - MS / GI',
    material: 'MS / GI',
    thickness: '2 – 6',
    standardSizes: '25x50 / 50x100',
    length: '6000',
    finish: 'Painted / Galvanized',
    applications: 'Structural, Fencing'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Rectangular Tube',
    type: 'Rectangular Tube - SS (304)',
    material: 'SS (304)',
    thickness: '1.5 – 3',
    standardSizes: '25x50 / 40x80',
    length: '3000',
    finish: 'Brushed / Mirror',
    applications: 'Handrails, Designer Gates'
  },
  // T Profile
  {
    category: 'Architectural Profiles',
    profileType: 'T Profile',
    type: 'T Profile - Aluminum',
    material: 'Aluminum',
    thickness: '2 – 5',
    standardSizes: '25 / 38 / 50',
    length: '3000 / 6000',
    finish: 'Mill / Anodized / Wood Finish',
    applications: 'Glass Joinery, Partitions'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'T Profile',
    type: 'T Profile - Stainless Steel',
    material: 'Stainless Steel',
    thickness: '1.5 – 3',
    standardSizes: '25 / 38',
    length: '3000',
    finish: 'Mirror / Brushed',
    applications: 'Partition Joints, Shower Doors'
  },
  // Round Tube / Pipe
  {
    category: 'Architectural Profiles',
    profileType: 'Round Tube / Pipe',
    type: 'Round Tube / Pipe - Aluminum',
    material: 'Aluminum',
    thickness: '1.2 – 5',
    standardSizes: 'Ø12 / Ø20 / Ø25 / Ø38 / Ø50',
    length: '3000 / 6000',
    finish: 'Mill / Anodized / Powder',
    applications: 'Railings, Furniture Frames, Decorative Pipes'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Round Tube / Pipe',
    type: 'Round Tube / Pipe - Stainless Steel (304)',
    material: 'Stainless Steel (304)',
    thickness: '1 – 3',
    standardSizes: 'Ø19 / Ø25 / Ø38 / Ø50 / Ø63.5',
    length: '3000',
    finish: 'Mirror / Brushed',
    applications: 'Handrails, Balustrades, Modern Decor'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Round Tube / Pipe',
    type: 'Round Tube / Pipe - Mild Steel (MS)',
    material: 'Mild Steel (MS)',
    thickness: '1.5 – 6',
    standardSizes: 'Ø15 / Ø25 / Ø50 / Ø75 / Ø100',
    length: '6000',
    finish: 'Black / Galvanized / Painted',
    applications: 'Structural, Scaffold, Mechanical'
  },
  {
    category: 'Architectural Profiles',
    profileType: 'Round Tube / Pipe',
    type: 'Round Tube / Pipe - Brass',
    material: 'Brass',
    thickness: '1 – 3',
    standardSizes: 'Ø12 / Ø19 / Ø25',
    length: '3000',
    finish: 'Polished / Natural',
    applications: 'Antique Projects, Lamps, Premium Fittings'
  }
];

// Update the products array with Sheet & Flat Profiles + Architectural Profiles
metalSectionsSubcat.products = [...sheetAndFlatProfiles, ...architecturalProfiles];

// Update timestamp
allProducts.lastUpdated = new Date().toISOString();

// Write back to file
fs.writeFileSync(allProductsPath, JSON.stringify(allProducts, null, 2), 'utf8');

// Also update structural-materials.json
const structuralMaterialsPath = path.join(__dirname, '../data/structural-materials.json');
const structuralMaterials = JSON.parse(fs.readFileSync(structuralMaterialsPath, 'utf8'));

const structuralMetalSections = structuralMaterials.subcategories.find(
  (subcat) => subcat.name === 'Metal Sections & Profiles'
);

if (structuralMetalSections) {
  const structuralSheetAndFlat = structuralMetalSections.products.filter(
    (p) => p.category === 'Sheet & Flat Profiles'
  );
  structuralMetalSections.products = [...structuralSheetAndFlat, ...architecturalProfiles];
  fs.writeFileSync(structuralMaterialsPath, JSON.stringify(structuralMaterials, null, 2), 'utf8');
}

console.log('✅ Fixed Metal Sections & Profiles data structure');
console.log(`   - Sheet & Flat Profiles: ${sheetAndFlatProfiles.length} products`);
console.log(`   - Architectural Profiles: ${architecturalProfiles.length} products`);
console.log(`   - Total: ${metalSectionsSubcat.products.length} products`);

