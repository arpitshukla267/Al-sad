#!/usr/bin/env node

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Configuration: Map Excel files to their processing functions
const EXCEL_CONFIG = {
  'Professional Tools & Gear.xlsx': {
    category: 'Professional Tools & Gear',
    processor: 'processProfessionalTools',
    outputFile: 'data/professional-tools-gear.json'
  },
  'Structural Materials.xlsx': {
    category: 'Structural Materials',
    processor: 'processStructuralMaterials',
    outputFile: 'data/structural-materials.json'
  }
};

// Process Professional Tools & Gear Excel
function processProfessionalTools(workbook) {
  const subcategories = [];
  const sheetNames = workbook.SheetNames;

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    
    const productTypes = [];
    let currentProductType = null;
    let tools = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;

      // Check if it's a product type header (usually bold/larger text)
      const firstCell = row[0];
      const secondCell = row[1];

      // If first cell has text and second is empty or has "Tool Name", it's a product type
      if (firstCell && firstCell !== '' && (!secondCell || secondCell === '' || secondCell === 'Tool Name' || secondCell === 'Common Use')) {
        // Save previous product type if exists
        if (currentProductType && tools.length > 0) {
          productTypes.push({
            name: currentProductType,
            tools: tools
          });
          tools = [];
        }
        
        // Skip header rows
        if (secondCell === 'Tool Name' || secondCell === 'Common Use' || firstCell === 'Tool / Product' || firstCell === 'Tool / Gear Name') {
          continue;
        }
        
        currentProductType = firstCell;
        continue;
      }

      // Check if it's a tool row (has tool name and common use)
      if (firstCell && firstCell !== '' && secondCell && secondCell !== '' && 
          firstCell !== 'Tool Name' && firstCell !== 'Common Use' && 
          firstCell !== 'Tool / Product' && firstCell !== 'Tool / Gear Name') {
        tools.push({
          name: firstCell,
          commonUse: secondCell
        });
      }
    }

    // Add last product type
    if (currentProductType && tools.length > 0) {
      productTypes.push({
        name: currentProductType,
        tools: tools
      });
    }

    if (productTypes.length > 0) {
      subcategories.push({
        name: sheetName,
        productTypes: productTypes
      });
    }
  });

  return {
    category: 'Professional Tools & Gear',
    subcategories: subcategories
  };
}

// Process Structural Materials Excel
function processStructuralMaterials(workbook) {
  const subcategories = [];
  const sheetNames = workbook.SheetNames;

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    
    let products = [];

    if (sheetName === 'Screws & Nails') {
      let currentSection = null;
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;
        
        if (row[0] === 'Product Type' || row[0] === 'Rivet Type') {
          currentSection = row[0] === 'Product Type' ? 'Screws & Nails' : 'Rivets';
          continue;
        }
        
        if (row[0] && row[0] !== '' && currentSection) {
          products.push({
            type: currentSection,
            productType: row[0],
            subTypes: row[1] ? row[1].split('\n').map(s => s.trim()).filter(s => s) : [],
            material: row[2] || '',
            finish: row[3] || '',
            applications: row[4] || ''
          });
        }
      }
      subcategories.push({
        name: sheetName,
        products: products.filter(p => p.type === 'Screws & Nails'),
        rivets: products.filter(p => p.type === 'Rivets')
      });
    } else if (sheetName === 'Metal Sections & Profiles') {
      let currentSection = null;
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;
        
        if (row[0] && (row[0].includes('Sheet') || row[0].includes('Profiles') || 
            row[0].includes('Angle') || row[0].includes('Channel') || 
            row[0].includes('Tube') || row[0].includes('Pipe'))) {
          currentSection = row[0];
          continue;
        }
        
        if (row[0] === 'Type') continue;
        
        if (row[0] && row[0] !== '' && currentSection) {
          products.push({
            section: currentSection,
            type: row[0],
            thickness: row[1] || '',
            width: row[2] || '',
            length: row[3] || '',
            material: row[4] || '',
            finish: row[5] || '',
            applications: row[6] || ''
          });
        }
      }
      subcategories.push({
        name: sheetName,
        products: products
      });
    } else if (sheetName === 'Fastening & Anchor Systems') {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0 || !row[0]) continue;
        if (row[0] === 'Product Type') continue;
        if (row[0] && row[0] !== '') {
          products.push({
            productType: row[0],
            subTypes: row[1] ? row[1].split('\n').map(s => s.trim()).filter(s => s) : [],
            material: row[2] || '',
            applications: row[3] || ''
          });
        }
      }
      subcategories.push({
        name: 'Fastening & Anchor System',
        products: products
      });
    } else if (sheetName === 'Industrial materials') {
      let currentCategory = null;
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;
        if (row[0] === 'Category') continue;
        
        if (row[0] && row[0] !== '' && row[1] && row[1] !== '') {
          currentCategory = row[0];
          products.push({
            category: currentCategory,
            productType: row[1],
            applications: row[2] || '',
            remarks: row[3] || ''
          });
          continue;
        }
        
        if (row[0] && row[0] !== '' && (!row[1] || row[1] === '')) {
          currentCategory = row[0];
          continue;
        }
        
        if ((!row[0] || row[0] === '') && row[1] && row[1] !== '' && currentCategory) {
          products.push({
            category: currentCategory,
            productType: row[1],
            applications: row[2] || '',
            remarks: row[3] || ''
          });
        }
      }
      subcategories.push({
        name: 'Industrial Materials',
        products: products
      });
    }
  });

  return {
    category: 'Structural Materials',
    subcategories: subcategories
  };
}

// Main processing function
function processExcelFile(filePath) {
  const fileName = path.basename(filePath);
  const config = EXCEL_CONFIG[fileName];

  if (!config) {
    console.warn(`⚠️  No configuration found for ${fileName}. Skipping...`);
    return null;
  }

  console.log(`\n📄 Processing: ${fileName}`);
  console.log(`   Category: ${config.category}`);
  
  try {
    const workbook = XLSX.readFile(filePath);
    let result;

    // Call the appropriate processor
    switch (config.processor) {
      case 'processProfessionalTools':
        result = processProfessionalTools(workbook);
        break;
      case 'processStructuralMaterials':
        result = processStructuralMaterials(workbook);
        break;
      default:
        console.error(`❌ Unknown processor: ${config.processor}`);
        return null;
    }

    // Ensure data directory exists
    const dataDir = path.dirname(config.outputFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write output file
    fs.writeFileSync(
      config.outputFile,
      JSON.stringify(result, null, 2)
    );

    console.log(`✅ Successfully processed ${fileName}`);
    console.log(`   Output: ${config.outputFile}`);
    console.log(`   Subcategories: ${result.subcategories.length}`);

    return result;
  } catch (error) {
    console.error(`❌ Error processing ${fileName}:`, error.message);
    return null;
  }
}

// Process all Excel files in the root directory
function processAllExcelFiles() {
  console.log('🚀 Starting Excel file processing...\n');
  
  const rootDir = process.cwd();
  const files = fs.readdirSync(rootDir);
  const excelFiles = files.filter(file => 
    file.endsWith('.xlsx') || file.endsWith('.xls')
  );

  if (excelFiles.length === 0) {
    console.log('⚠️  No Excel files found in the root directory.');
    return;
  }

  console.log(`Found ${excelFiles.length} Excel file(s):`);
  excelFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');

  const results = [];
  excelFiles.forEach(file => {
    const result = processExcelFile(path.join(rootDir, file));
    if (result) {
      results.push(result);
    }
  });

  // Create consolidated data file
  if (results.length > 0) {
    const consolidated = {
      lastUpdated: new Date().toISOString(),
      categories: results
    };

    fs.writeFileSync(
      'data/all-products.json',
      JSON.stringify(consolidated, null, 2)
    );

    console.log('\n✅ Consolidated data saved to: data/all-products.json');
    console.log(`   Total categories processed: ${results.length}`);
  }

  console.log('\n✨ Processing complete!');
}

// Run if called directly
if (require.main === module) {
  processAllExcelFiles();
}

module.exports = {
  processExcelFile,
  processAllExcelFiles,
  EXCEL_CONFIG
};

