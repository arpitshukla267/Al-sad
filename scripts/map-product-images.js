#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Comprehensive product to image mapping
const productImageMapping = {
  // Hand Tools
  'Hammer': 'hammer.webp',
  'Screwdriver': 'screwdriver.webp',
  'Wrench / Spanner': 'wrench.webp',
  'Wrench': 'wrench.webp',
  'Spanner': 'spanner.webp',
  'Pliers': 'pliers.webp',
  'Utility Knife / Cutter': 'utility-knife-cutter.webp',
  'Utility Knife': 'utility-knife-cutter.webp',
  'Cutter': 'utility-knife-cutter.webp',
  'HandSaw/Hacksaw': 'handsaw-hacksaw.webp',
  'HandSaw': 'handsaw-hacksaw.webp',
  'Hacksaw': 'handsaw-hacksaw.webp',
  'Allen Key (Hex Key)': 'allen-key.webp',
  'Allen Key': 'allen-key.webp',
  'Hex Key': 'allen-key.webp',
  'Chisel': 'chisel.webp',
  'File / Rasp': 'file---rasp.webp',
  'File': 'file---rasp.webp',
  'Rasp': 'file---rasp.webp',
  'Riveters': 'riveters.webp',
  'Sledgehammer': 'sledgehammer.webp',
  'Mattock': 'mattock.webp',
  'Crowbar / Pry Bar': 'crowbar---pry-bar.webp',
  'Crowbar': 'crowbar---pry-bar.webp',
  'Pry Bar': 'crowbar---pry-bar.webp',
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
  'Lopper': 'lopper---pruner.webp',
  'Pruner': 'lopper---pruner.webp',
  'Wooden Mallet': 'wooden-mallet.webp',
  'Block Plane': 'block-plane.webp',
  'Drawknife': 'draw-knife.webp',
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
  'Nail Gun': 'nail-gun--nailer-.webp',
  'Nailer': 'nail-gun--nailer-.webp',
  'Circular saw': 'circular-saw.webp',
  'Circular Saw': 'circular-saw.webp',
  'Jigsaw': 'jigsaw.webp',
  'Miter Saw': 'miter-saw.webp',
  'Cut-Off Saw': 'cut-off-saw.webp',
  'Router Machine': 'router-machine.webp',
  'Router': 'router-machine.webp',
  'Angle Grinder': 'angle-grinder.webp',
  'Die Grinder': 'die-grinder.webp',
  'Bench Grinder': 'bench-grinder.webp',
  'Belt Sander': 'belt-sander.webp',
  'Orbital Sander': 'orbital-sander.webp',
  'Polisher/Buffer Machine': 'polisher-buffer-machine.webp',
  'Polisher': 'polisher-buffer-machine.webp',
  'Buffer Machine': 'polisher-buffer-machine.webp',
  'Oscillating Multi-Tool': 'oscillating-multi-tool.webp',
  'Demolition Hammer': 'demolition-hammer.webp',
  'Heat Gun': 'heat-gun.webp',
  'Welding Machine (MIG-TIG-Arc)': 'welding-machine--mig-tig-arc-.webp',
  'Welding Machine': 'welding-machine--mig-tig-arc-.webp',
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
  'Respiratory Mask': 'full-half-respiratory-mask.webp',
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

// Structural Materials mapping (based on type/section)
const structuralImageMapping = {
  // Screws & Nails
  'Wood Screw': 'woodscrew-csk.webp',
  'ChipBoard Screw': 'chipboard-screw.webp',
  'Machine Screw': 'machine-screw-allen.webp',
  'Self Drilling Screw': 'screw---nails-self-drilling-screw-csk.webp',
  'Self Tapping Screw': 'screw---nails-self-tapping-screw-csk.webp',
  'Hex Screw': 'screw---nails-hex-screw.webp',
  'Drywall Screw': 'screw---nails-drywall-screw.webp',
  'Concrete Nails': 'screw---nails-concreate-nails-smooth.webp',
  'Steel Nails': 'screw---nails-steel-nails.webp',
  'Wood Nails': 'screw---nails-woodnails-head.webp',
  'Shoe Nails': 'screw---nails-shoe-nails.webp',
  'Brad Nails': 'brad-nails-f-series.webp',
  'Solid Rivet': 'solidrivet.webp',
  'Semi Tubular Rivet': 'semi-tubular-rivet.webp',
  'Blind Rivet': 'blind-rivet.webp',

  // Metal Sections & Profiles
  'MS Flat Bar': 'flat-bar-ms.webp',
  'Flat Bar': 'flat-bar-ms.webp',
  'Stainless Steel Flat Bar': 'flat-bar-ss.webp',
  'Brass Flat Bar': 'flat-bar-brass.webp',
  'Round Bar': 'roundbar-ss.webp',
  'Square Bar': 'square-bar-ms.webp',
  'Angle': 'angle--l-profile--ms.webp',
  'L Profile': 'angle--l-profile--ms.webp',
  'Channel': 'channel--u-profile--ss.webp',
  'U Profile': 'channel--u-profile--ss.webp',
  'T Profile': 't-profile-ss.webp',
  'Round Tube': 'round-tube---ms.webp',
  'Rectangular Tube': 'rectangular-tube-ms.webp',
  'Square Hollow': 'square-hollow-ms.webp',
  'Stainless Steel Sheet': 'stainless-steel-sheet.webp',
  'GI Sheet': 'gi-sheet--galvanized-iron-.webp',
  'Galvanized Iron': 'gi-sheet--galvanized-iron-.webp',
  'Aluminum Sheet': 'plain-aluminum-sheet.webp',
  'Copper Sheet': 'copper-sheet.webp',
};

// Function to find image for product
function findImage(productName, category, subcategory) {
  // Try direct match first
  if (productImageMapping[productName]) {
    return productImageMapping[productName];
  }

  // Try structural materials mapping
  if (category === 'Structural Materials') {
    for (const [key, value] of Object.entries(structuralImageMapping)) {
      if (productName.includes(key) || key.includes(productName)) {
        return value;
      }
    }
  }

  // Try partial matching
  const normalized = productName.toLowerCase().trim();
  for (const [key, value] of Object.entries(productImageMapping)) {
    if (key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase())) {
      return value;
    }
  }

  return null;
}

// Function to get full image path
function getImagePath(imageName, category, subcategory) {
  if (!imageName) return null;

  const categoryMap = {
    'Professional Tools & Gear': {
      'Hand Tools ': 'professional-tools-gear/hand-tools',
      'Hand Tools': 'professional-tools-gear/hand-tools',
      'Power Tools': 'professional-tools-gear/power-tools',
      'Safety & Protective Gear': 'professional-tools-gear/safety-protection',
      'Safety & Protection': 'professional-tools-gear/safety-protection',
      'Abrasive Tools & Materials': 'professional-tools-gear/abrasive-tools',
      'Abrasive Tools': 'professional-tools-gear/abrasive-tools',
    },
    'Structural Materials': {
      'Screws & Nails': 'structural-materials/screws-nails',
      'Metal Sections & Profiles': 'structural-materials/metal-section-profiles',
      'Fastening & Anchor System': 'structural-materials/fastening-anchor-system',
      'Fastening & Anchor Systems': 'structural-materials/fastening-anchor-system',
      'Industrial Materials': 'structural-materials/industrial-materials',
    },
  };

  const subcatPath = categoryMap[category]?.[subcategory.trim()];
  if (!subcatPath) return null;

  return `/assets/images/products/${subcatPath}/${imageName}`;
}

// Read and update JSON
const dataPath = path.join(__dirname, '..', 'data', 'all-products.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let updatedCount = 0;

data.categories.forEach(category => {
  category.subcategories.forEach(subcategory => {
    // Professional Tools & Gear structure
    if (subcategory.productTypes) {
      subcategory.productTypes.forEach(productType => {
        if (productType.tools) {
          productType.tools.forEach(tool => {
            const imageName = findImage(tool.name, category.category, subcategory.name);
            if (imageName) {
              tool.image = getImagePath(imageName, category.category, subcategory.name);
              updatedCount++;
            }
          });
        }
      });
    }

    // Structural Materials structure
    if (subcategory.products) {
      subcategory.products.forEach(product => {
        const matchName = product.type || product.section || '';
        if (matchName) {
          const imageName = findImage(matchName, category.category, subcategory.name);
          if (imageName) {
            product.image = getImagePath(imageName, category.category, subcategory.name);
            updatedCount++;
          }
        }
      });
    }
  });
});

// Save updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`✅ Updated ${updatedCount} products with image paths`);
console.log(`📁 Images organized in: public/assets/images/products/`);

