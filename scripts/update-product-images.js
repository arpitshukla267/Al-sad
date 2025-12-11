#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Product name to image filename mapping (normalized)
const productImageMap = {
  // Hand Tools
  'Hammer': 'hammer.webp',
  'Screwdriver': 'screwdriver.webp',
  'Wrench / Spanner': 'wrench.webp',
  'Spanner': 'spanner.webp',
  'Pliers': 'pliers.webp',
  'Utility Knife / Cutter': 'utility-knife-cutter.webp',
  'HandSaw/Hacksaw': 'handsaw-hacksaw.webp',
  'Allen Key (Hex Key)': 'allen-key.webp',
  'Chisel': 'chisel.webp',
  'File / Rasp': 'file---rasp.webp',
  'Riveters': 'riveters.webp',
  'Sledgehammer': 'sledgehammer.webp',
  'Mattock': 'mattock.webp',
  'Crowbar / Pry Bar': 'crowbar---pry-bar.webp',
  'Precision Screwdrivers': 'precision-screwdrivers.webp',
  'Awl': 'awl.webp',
  'Punch Tool': 'punch-tools.webp',
  'Hand Crank Drill': 'hand-crank-drill.webp',
  'Tapping & Threading': 'tapping-thread.webp',
  'Shovel': 'shovel.webp',
  'Spade': 'spade.webp',
  'Hoe': 'hoe.webp',
  'Trowel': 'trowel.webp',
  'Rake': 'rake-z.webp',
  'Lopper / Pruner': 'lopper---pruner.webp',
  'Wooden Mallet': 'wooden-mallet.webp',
  'Block Plane': 'block-plane.webp',
  'Drawknife': 'draw-knife.webp',
  'Measuring Tape ': 'measuring-tape.webp',
  'Measuring Tape': 'measuring-tape.webp',
  'Spirit Level': 'spirit-level.webp',
  'Stud Finder': 'stud-finder.webp',
  'Digital Caliper': 'digital-caliper.webp',
  'Laser Distance Meter': 'laser-distance-meter.webp',
  'Pickaxe': 'pickaxe.webp',
  'Hot Glue Gun': 'hot-glue-gun.webp',
  'Soldering Iron': 'soldering-iron.webp',
  'Detail Sander': 'detail-sander.webp',

  // Power Tools
  'Electric Drill': 'electric-drill.webp',
  'Impact Driver': 'impact-driver.webp',
  'Hammer Drill': 'hammer-drill.webp',
  'Cordless Screwdriver': 'cordless-screwdriver.webp',
  'Nail Gun (Nailer)': 'nail-gun--nailer-.webp',
  'Circular saw': 'circular-saw.webp',
  'Jigsaw': 'jigsaw.webp',
  'Miter Saw': 'miter-saw.webp',
  'Cut-Off Saw': 'cut-off-saw.webp',
  'Router Machine': 'router-machine.webp',
  'Angle Grinder': 'angle-grinder.webp',
  'Die Grinder': 'die-grinder.webp',
  'Bench Grinder': 'bench-grinder.webp',
  'Belt Sander': 'belt-sander.webp',
  'Orbital Sander': 'orbital-sander.webp',
  'Polisher/Buffer Machine': 'polisher-buffer-machine.webp',
  'Oscillating Multi-Tool': 'oscillating-multi-tool.webp',
  'Demolition Hammer': 'demolition-hammer.webp',
  'Heat Gun': 'heat-gun.webp',
  'Welding Machine (MIG-TIG-Arc)': 'welding-machine--mig-tig-arc-.webp',
  'Soldering iron': 'soldering-iron.webp',
  'Glue Gun': 'glue-gun.webp',
  'Electrical Planner': 'electrical-planner.webp',

  // Safety & Protection
  'Safety Helmet': 'safety-helmet.webp',
  'Safety Goggles': 'safety-goggles.webp',
  'Face Shield': 'face-shield.webp',
  'Welding Helmet': 'welding-helmet.webp',
  'Welding Shield': 'welding-shield.webp',
  'Dust Mask': 'dust-mask.webp',
  'Full/Half Respiratory Mask': 'full-half-respiratory-mask.webp',
  'Cut-Resistant Gloves': 'cut-resistant-gloves.webp',
  'Nitrile Gloves': 'nitrile-gloves.webp',
  'Safety Shoes': 'safety-shoes.webp',
  'Gum Boots': 'gum-boots.webp',
  'Safety Harness': 'safety-harness.webp',
  'Tool Belt': 'tool-belt.webp',
  'First Aid Kit': 'first-aid-kit.webp',

  // Abrasive Tools
  'Grinding Wheel': 'grinding-wheel.webp',
  'Cut Off Wheel': 'cut-off-wheel.webp',
  'Flap Discs': 'flap-discs.webp',
  'Sanding Disc': 'sanding-disc.webp',
  'Velcro Hook-and-Loop Discs': 'velcro-hook-and-loop-discs.webp',
  'Backing Pads': 'backing-pads.webp',
  'Sanding Sheet': 'sanding-sheet.webp',
  'Sanding Roll': 'sanding-roll.webp',
  'Sanding Belts': 'sanding-belts.webp',
  'Bench Grinder Wheels': 'bench-grinder-wheels.webp',
  'Abrasive Wheels (non-woven)': 'abrasive-wheels--non-woven-.webp',
  'Abrasive Brushes': 'abrasive-brushes.webp',
  'Mounted Points': 'mounted-points.webp',
  'Diamond Blade': 'diamond-blade.webp',
  'Diamond Files': 'diamond-files.webp',
  'Sharpening Stones': 'sharpening-stones.webp',
  'Scouring Pads': 'scouring-pads.webp',
};

// Function to normalize product name for matching
function normalizeName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9\s]/g, '');
}

// Function to find image for a product
function findImageForProduct(productName, subcategory, category) {
  // Direct match
  if (productImageMap[productName]) {
    return productImageMap[productName];
  }

  // Try normalized matching
  const normalized = normalizeName(productName);
  for (const [key, value] of Object.entries(productImageMap)) {
    if (normalizeName(key) === normalized) {
      return value;
    }
  }

  return null;
}

// Function to get image path
function getImagePath(imageName, category, subcategory) {
  if (!imageName) return null;

  const categorySlug = category.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and');
  
  const subcategorySlug = subcategory.toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and');

  // Map category and subcategory to directory structure
  const categoryMap = {
    'professional-tools-gear': {
      'hand-tools': 'professional-tools-gear/hand-tools',
      'power-tools': 'professional-tools-gear/power-tools',
      'safety-protection': 'professional-tools-gear/safety-protection',
      'safety-&-protective-gear': 'professional-tools-gear/safety-protection',
      'abrasive-tools': 'professional-tools-gear/abrasive-tools',
      'abrasive-tools-&-materials': 'professional-tools-gear/abrasive-tools',
    },
    'structural-materials': {
      'screws-&-nails': 'structural-materials/screws-nails',
      'metal-sections-&-profiles': 'structural-materials/metal-section-profiles',
      'fastening-&-anchor-system': 'structural-materials/fastening-anchor-system',
      'fastening-&-anchor-systems': 'structural-materials/fastening-anchor-system',
      'industrial-materials': 'structural-materials/industrial-materials',
    },
  };

  const catKey = categoryMap[categorySlug];
  if (!catKey) return null;

  const subcatKey = Object.keys(catKey).find(key => 
    subcategorySlug.includes(key) || key.includes(subcategorySlug)
  );

  if (!subcatKey) return null;

  const dir = catKey[subcatKey];
  return `/assets/images/products/${dir}/${imageName}`;
}

// Read the all-products.json file
const dataPath = path.join(__dirname, '..', 'data', 'all-products.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Update products with image paths
data.categories.forEach(category => {
  category.subcategories.forEach(subcategory => {
    // Handle Professional Tools & Gear structure
    if (subcategory.productTypes) {
      subcategory.productTypes.forEach(productType => {
        if (productType.tools) {
          productType.tools.forEach(tool => {
            const imageName = findImageForProduct(
              tool.name,
              subcategory.name,
              category.category
            );
            if (imageName) {
              tool.image = getImagePath(
                imageName,
                category.category,
                subcategory.name
              );
            }
          });
        }
      });
    }

    // Handle Structural Materials structure
    if (subcategory.products) {
      subcategory.products.forEach(product => {
        // Try to match by type or section
        const matchName = product.type || product.section;
        if (matchName) {
          // For structural materials, we need a different mapping approach
          // since the product structure is different
          // We'll create a mapping based on the image filenames we have
        }
      });
    }
  });
});

// Save updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Updated all-products.json with image paths');

