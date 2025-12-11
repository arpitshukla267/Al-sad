#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Base directories
const sourceBase = path.join(__dirname, '..');
const targetBase = path.join(__dirname, '..', 'public', 'assets', 'images', 'products');

// Product name to image filename mapping
const imageMappings = {
  // Professional Tools & Gear - Hand Tools
  'Hammer': 'Hammer.webp',
  'Screwdriver': 'Screwdriver.webp',
  'Wrench / Spanner': 'Wrench.webp',
  'Spanner': 'Spanner.webp',
  'Pliers': 'Pliers.webp',
  'Utility Knife / Cutter': 'Utility Knife_Cutter.webp',
  'HandSaw/Hacksaw': 'HandSaw_Hacksaw.webp',
  'Allen Key (Hex Key)': 'ALLEN KEY.webp',
  'Chisel': 'Chisel.webp',
  'File / Rasp': 'File - Rasp.webp',
  'Riveters': 'Riveters.webp',
  'Sledgehammer': 'Sledgehammer.webp',
  'Mattock': 'Mattock.webp',
  'Crowbar / Pry Bar': 'Crowbar - Pry Bar.webp',
  'Precision Screwdrivers': 'Precision Screwdrivers.webp',
  'Awl': 'Awl.webp',
  'Punch Tool': 'Punch Tools.webp',
  'Hand Crank Drill': 'Hand Crank Drill.webp',
  'Tapping & Threading': 'Tapping Thread.webp',
  'Shovel': 'Shovel.webp',
  'Spade': 'SPADE.webp',
  'Hoe': 'Hoe.webp',
  'Trowel': 'Trowel.webp',
  'Rake': 'Rake-z.webp',
  'Lopper / Pruner': 'Lopper - Pruner.webp',
  'Wooden Mallet': 'Wooden Mallet.webp',
  'Block Plane': 'Block Plane.webp',
  'Drawknife': 'Draw_Knife.webp',
  'Measuring Tape ': 'Measuring Tape.webp',
  'Measuring Tape': 'Measuring Tape.webp',
  'Spirit Level': 'Spirit Level.webp',
  'Stud Finder': 'Stud Finder.webp',
  'Digital Caliper': 'Digital Caliper.webp',
  'Laser Distance Meter': 'Laser Distance Meter.webp',
  'Pickaxe': 'Pickaxe.webp',
  'Hot Glue Gun': 'Hot Glue Gun.webp',
  'Soldering Iron': 'Soldering Iron.webp',
  'Detail Sander': 'Detail Sander.webp',

  // Professional Tools & Gear - Power Tools
  'Electric Drill': 'Electric Drill.webp',
  'Impact Driver': 'Impact Driver.webp',
  'Hammer Drill': 'Hammer Drill.webp',
  'Cordless Screwdriver': 'Cordless screwdriver.webp',
  'Nail Gun (Nailer)': 'Nail Gun (Nailer).webp',
  'Circular saw': 'Circular saw.webp',
  'Jigsaw': 'Jigsaw.webp',
  'Miter Saw': 'Miter Saw.webp',
  'Cut-Off Saw': 'Cut-Off Saw.webp',
  'Router Machine': 'Router Machine.webp',
  'Angle Grinder': 'Angle Grinder.webp',
  'Die Grinder': 'Die Grinder.webp',
  'Bench Grinder': 'Bench Grinder.webp',
  'Belt Sander': 'Belt Sander.webp',
  'Orbital Sander': 'Orbital Sander.webp',
  'Polisher/Buffer Machine': 'Polisher_Buffer MAchine.webp',
  'Oscillating Multi-Tool': 'Oscillating Multi-Tool.webp',
  'Demolition Hammer': 'Demolition Hammer.webp',
  'Heat Gun': 'Heat Gun.webp',
  'Welding Machine (MIG-TIG-Arc)': 'Welding Machine (MIG-TIG-Arc).webp',
  'Soldering iron': 'Soldering iron.webp',
  'Glue Gun': 'Glue Gun.webp',
  'Electrical Planner': 'Electrical Planner.webp',

  // Professional Tools & Gear - Safety & Protection
  'Safety Helmet': 'Safety Helmet.webp',
  'Safety Goggles': 'Safety Goggles.webp',
  'Face Shield': 'Face Shield.webp',
  'Welding Helmet': 'Welding Helmet.webp',
  'Welding Shield': 'Welding Shield.webp',
  'Dust Mask': 'Dust Mask.webp',
  'Full/Half Respiratory Mask': 'Full_Half Respiratory Mask.webp',
  'Cut-Resistant Gloves': 'Cut-Resistant Gloves.webp',
  'Nitrile Gloves': 'Nitrile Gloves.webp',
  'Safety Shoes': 'Safety Shoes.webp',
  'Gum Boots': 'Gum Boots.webp',
  'Safety Harness': 'Safety Harness.webp',
  'Tool Belt': 'Tool Belt.webp',
  'First Aid Kit': 'First Aid Kit.webp',

  // Professional Tools & Gear - Abrasive Tools
  'Grinding Wheel': 'Grinding Wheel.webp',
  'Cut Off Wheel': 'Cut Off Wheel.webp',
  'Flap Discs': 'Flap Discs.webp',
  'Sanding Disc': 'Sanding Disc.webp',
  'Velcro Hook-and-Loop Discs': 'Velcro_Hook-and-Loop Discs.webp',
  'Backing Pads': 'Backing Pads.webp',
  'Sanding Sheet': 'Sanding Sheet.webp',
  'Sanding Roll': 'Sanding Roll.webp',
  'Sanding Belts': 'Sanding Belts.webp',
  'Bench Grinder Wheels': 'Bench Grinder Wheels.webp',
  'Abrasive Wheels (non-woven)': 'Abrasive Wheels (non-woven).webp',
  'Abrasive Brushes': 'Abrasive Brushes.webp',
  'Mounted Points': 'Mounted Points.webp',
  'Diamond Blade': 'Diamond Blade.webp',
  'Diamond Files': 'Diamond Files.webp',
  'Sharpening Stones': 'Sharpening Stones.webp',
  'Scouring Pads': 'Scouring Pads.webp',

  // Structural Materials - Screws & Nails
  'Wood Screw': 'WoodScrew_Csk.webp',
  'ChipBoard Screw': 'ChipBoard Screw.webp',
  'ChipBoard Screw (Pozi Drive)': 'ChipBoard Screw_Pozi Drive.webp',
  'Machine Screw (Allen)': 'Machine Screw_Allen.webp',
  'Machine Screw (CSK)': 'Machine Screw_Csk.webp',
  'Machine Screw (Pan)': 'Machine Screw_Pan.webp',
  'Self Drilling Screw (CSK)': 'Screw & Nails_Self Drilling Screw_Csk.webp',
  'Self Drilling Screw (HEX)': 'Screw & Nails_Self Drilling Screw_HEX.webp',
  'Self Drilling Screw (Pan)': 'Screw & Nails_Self Drilling Screw_Pan.webp',
  'Self Drilling Screw (Wafer)': 'Screw & Nails_Self Drilling Screw_Waffer.webp',
  'Self Tapping Screw (CSK)': 'Screw & Nails_Self Tapping Screw_Csk.webp',
  'Self Tapping Screw (Pan)': 'Screw & Nails_Self Tapping Screw_Pan.webp',
  'Hex Screw': 'Screw & Nails_Hex Screw.webp',
  'Drywall Screw': 'Screw & Nails_Drywall Screw.webp',
  'Concrete Nails (Smooth)': 'Screw & Nails_Concreate Nails_Smooth.webp',
  'Concrete Nails (Twisted)': 'Screw & Nails_Concreate Nails_Twisted.webp',
  'Steel Nails': 'Screw & Nails_Steel Nails.webp',
  'Wood Nails (Head)': 'Screw & Nails_WoodNails_Head.webp',
  'Wood Nails (Headless)': 'Screw & Nails_WoodNails_Headless.webp',
  'Shoe Nails': 'Screw & Nails_Shoe Nails.webp',
  'Brad Nails (F Series)': 'Brad Nails_F Series.webp',
  'Brad Nails (J Series)': 'Brad Nails_J Series.webp',
  'Solid Rivet': 'SolidRivet.webp',
  'Semi Tubular Rivet': 'Semi Tubular Rivet.webp',
  'Blind Rivet': 'Blind Rivet.webp',

  // Structural Materials - Metal Sections & Profiles
  'MS Flat Bar': 'Flat Bar_Ms.webp',
  'Aluminum Flat Bar': 'Flat Bar_SS.webp', // Using SS as placeholder, will need to check
  'Stainless Steel Flat Bar': 'Flat Bar_SS.webp',
  'Brass Flat Bar': 'Flat Bar_Brass.webp',
  'Round Bar': 'RoundBar_SS.webp',
  'Square Bar (MS)': 'Square Bar_Ms.webp',
  'Square Bar (SS)': 'Square Bar_Ss.webp',
  'Square Bar (Brass)': 'Square Bar_Brass.webp',
  'Angle (L Profile) - MS': 'Angle (L Profile)_MS.webp',
  'Angle (L Profile) - SS': 'Angle (L Profile)_SS.webp',
  'Angle (L Profile) - Aluminum': 'Angle (L Profile)_Aluminum.webp',
  'Angle (L Profile) - Brass': 'Angle (L Profile)_Brass.webp',
  'Angle (L Profile) - PVC': 'Angle (L Profile)_PVC.webp',
  'Channel (U Profile) - SS': 'Channel (U Profile)_SS.webp',
  'Channel (U Profile) - Aluminum': 'Channel (U Profile)_Alu.webp',
  'T Profile - SS': 'T Profile_SS.webp',
  'T Profile - Aluminum': 'T Profile_Aluminum.webp',
  'Round Tube - MS': 'Round Tube - MS.webp',
  'Round Tube - SS': 'Round Tube - SS.webp',
  'Round Tube - Aluminum': 'Round Tube - Alu.webp',
  'Round Tube - Brass': 'Round Tube - Brass.webp',
  'Rectangular Tube - MS': 'Rectangular Tube_Ms.webp',
  'Rectangular Tube - SS': 'Rectangular Tube_SS.webp',
  'Rectangular Tube - Aluminum': 'Rectangular Tube_Alu.webp',
  'Square Hollow - MS': 'Square Hollow_Ms.webp',
  'Square Hollow - SS': 'Square Hollow_SS.webp',
  'Square Hollow - Aluminum': 'Square Hollow_Aluminum.webp',
  'Stainless Steel Sheet': 'Stainless Steel Sheet.webp',
  'GI Sheet (Galvanized Iron)': 'GI Sheet (Galvanized Iron).webp',
  'Plain Aluminum Sheet': 'Plain Aluminum Sheet.webp',
  'Checkered Aluminum Sheet': 'Checkered Aluminum Sheet-1.webp',
  'Copper Sheet': 'Copper Sheet.webp',

  // Structural Materials - Fastening & Anchor Systems
  'Anchor Bolt (Eye Bolt)': 'Anchor Bolt_Eye Bolt.webp',
  'Anchor Bolt (Hex Bolt)': 'Anchor Bolt_Hex Bolt.webp',
  'Anchor Bolt (Hook Bolt)': 'Anchor Bolt_Hook Bolt.webp',
  'Anchor Bolts (J Bolt)': 'Anchor Bolts_J Bolt.webp',
  'Anchor Bolts (L Bolt)': 'Anchor Bolts_L Bolt.webp',
  'Anchor Bolts (U Bolt)': 'Anchor Bolts_U Bolt.webp',
  'Hex Nut': 'Anchor Nuts & Washers_Hex Nut.webp',
  'Dome Nut': 'Anchor Nuts & Washers_Dome Nut.webp',
  'Flat Washer': 'Anchor Nuts & Washers_Flat Washer.webp',
  'Spring Washer': 'Anchor Nuts & Washers_Spring Washer.webp',
  'Ceiling Anchor': 'Ceiling Anchor.webp',
  'Bullet Anchor': 'M&E Anchors_Bullet Anchor.webp',
  'Hook & Eye Anchor': 'M&E Anchors_Hook&Eye  Anchor.webp',
  'Rawl Plug Anchor': 'M&E Anchors_Rawl Plug Anchor.webp',
  'Shield Anchor': 'M&E Anchors_Shield Anchor.webp',
  'Wedge Anchor': 'M&E Anchors_Wedge Anchor.webp',
  'Standard Through Bolt': 'Standard Through Bolt.webp',
  'Stud Bolt': 'Stud Bolt.webp',
  'Thread Rod': 'Thread Rod.webp',
  'Toggle Bolt': 'Toggle Bolt.webp',
};

// Directory structure mapping
const directoryMapping = {
  'Professional Tools & Gear': {
    'Hand Tools ': 'professional-tools-gear/hand-tools',
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

// Source to target mapping
const sourceToTarget = {
  'Professional Tools & Gear/HandTools': 'professional-tools-gear/hand-tools',
  'Professional Tools & Gear/PowerTools': 'professional-tools-gear/power-tools',
  'Professional Tools & Gear/Safety & Protective Gear': 'professional-tools-gear/safety-protection',
  'Professional Tools & Gear/Abravise': 'professional-tools-gear/abrasive-tools',
  'Structural Materials/Screws & Nails': 'structural-materials/screws-nails',
  'Structural Materials/Metal Sections & Profiles': 'structural-materials/metal-section-profiles',
  'Structural Materials/Fastening & Anchor Systems': 'structural-materials/fastening-anchor-system',
  'Structural Materials/Industrial Materials': 'structural-materials/industrial-materials',
};

// Create directory structure
function createDirectories() {
  const dirs = [
    'professional-tools-gear/hand-tools',
    'professional-tools-gear/power-tools',
    'professional-tools-gear/safety-protection',
    'professional-tools-gear/abrasive-tools',
    'structural-materials/screws-nails',
    'structural-materials/metal-section-profiles',
    'structural-materials/fastening-anchor-system',
    'structural-materials/industrial-materials',
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(targetBase, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  });
}

// Copy images from source to target
function copyImages() {
  Object.entries(sourceToTarget).forEach(([sourceDir, targetDir]) => {
    const sourcePath = path.join(sourceBase, sourceDir);
    const targetPath = path.join(targetBase, targetDir);

    if (!fs.existsSync(sourcePath)) {
      console.log(`Source directory not found: ${sourcePath}`);
      return;
    }

    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      // Skip Thumbs.db and other non-image files
      if (file === 'Thumbs.db' || file.startsWith('.')) {
        return;
      }

      const sourceFile = path.join(sourcePath, file);
      const targetFile = path.join(targetPath, file);

      // Normalize filename (remove spaces, special chars)
      const normalizedName = file
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '-')
        .toLowerCase();

      const normalizedTarget = path.join(targetPath, normalizedName);

      try {
        fs.copyFileSync(sourceFile, normalizedTarget);
        console.log(`Copied: ${file} -> ${normalizedName}`);
      } catch (error) {
        console.error(`Error copying ${file}:`, error.message);
      }
    });
  });
}

// Main execution
console.log('Creating directory structure...');
createDirectories();

console.log('\nCopying images...');
copyImages();

console.log('\nDone! Images organized in public/assets/images/products/');

