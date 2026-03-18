#!/usr/bin/env node

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Excel files are in informations/ folder
const EXCEL_DIR = path.join(process.cwd(), 'informations');

// Configuration: Map Excel files to their processing functions
const EXCEL_CONFIG = {
  'Professional Tools & Gear (1).xlsx': {
    category: 'Professional Tools & Gear',
    processor: 'processProfessionalTools',
    outputFile: 'data/professional-tools-gear.json'
  },
  'Structural Materials.xlsx': {
    category: 'Structural Materials',
    processor: 'processStructuralMaterials',
    outputFile: 'data/structural-materials.json'
  },
  'Architectural Components.xlsx': {
    category: 'Architectural Components',
    processor: 'processArchitecturalComponents',
    outputFile: 'data/architectural-components.json'
  },
  'Retail and Home Solution.xlsx': {
    category: 'Retail & Home Solutions',
    processor: 'processRetailAndHomeSolution',
    outputFile: 'data/retail-home-solutions.json'
  }
};

const CATEGORY_DIRECTORY_MAP = {
  'Professional Tools & Gear': 'Professional Tools & Gear',
  'Structural Materials': 'Structural Materials',
  'Architectural Components': 'Architectural Components',
  'Retail & Home Solutions': 'Retail and Home Solution'
};

let cachedImageIndex = null;
const cachedSubcategoryDirectories = new Map();

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/aluminum/g, 'aluminium')
    .replace(/[_/(),.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildKeywords(values) {
  const keywords = new Set();

  values.filter(Boolean).forEach((value) => {
    const normalized = normalizeText(value);
    if (!normalized) return;

    keywords.add(normalized.replace(/\s+/g, ''));

    normalized.split(' ').forEach((part, index, parts) => {
      if (!part || part.length < 2) return;
      keywords.add(part);

      if (index < parts.length - 1) {
        keywords.add(`${part}${parts[index + 1]}`);
      }
    });
  });

  return Array.from(keywords);
}

function getImageIndex() {
  if (cachedImageIndex) {
    return cachedImageIndex;
  }

  const imageExtensions = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif']);
  const imageIndex = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }

      const ext = path.extname(entry.name).toLowerCase();
      if (!imageExtensions.has(ext)) return;

      const relativePath = path.relative(EXCEL_DIR, fullPath).replace(/\\/g, '/');
      imageIndex.push({
        relativePath,
        normalizedRelativePath: normalizeText(relativePath),
        normalizedBasename: normalizeText(path.basename(entry.name, ext))
      });
    });
  }

  walk(EXCEL_DIR);
  cachedImageIndex = imageIndex;
  return imageIndex;
}

function getResolvedSubcategoryPrefix(categoryName, subcategoryName) {
  const categoryDirectory = CATEGORY_DIRECTORY_MAP[categoryName];
  if (!categoryDirectory) return null;

  const categoryPath = path.join(EXCEL_DIR, categoryDirectory);
  if (!fs.existsSync(categoryPath)) return `${categoryDirectory}/`;

  if (!cachedSubcategoryDirectories.has(categoryDirectory)) {
    const entries = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    cachedSubcategoryDirectories.set(categoryDirectory, entries);
  }

  const normalizedTarget = normalizeText(subcategoryName);
  const subdirectories = cachedSubcategoryDirectories.get(categoryDirectory) || [];

  let bestMatch = null;
  let bestScore = -1;

  subdirectories.forEach((directoryName) => {
    const normalizedDirectory = normalizeText(directoryName);
    let score = 0;

    if (normalizedDirectory === normalizedTarget) score += 10;
    if (normalizedDirectory.includes(normalizedTarget)) score += 6;
    if (normalizedTarget.includes(normalizedDirectory)) score += 4;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = directoryName;
    }
  });

  return bestMatch ? `${categoryDirectory}/${bestMatch}/` : `${categoryDirectory}/`;
}

function findBestImageForProduct(categoryName, subcategoryName, product) {
  const imageIndex = getImageIndex();
  const preferredPrefix = getResolvedSubcategoryPrefix(categoryName, subcategoryName);
  const categoryPrefix = `${CATEGORY_DIRECTORY_MAP[categoryName] || ''}/`;

  let candidates = imageIndex.filter((image) => preferredPrefix && image.relativePath.startsWith(preferredPrefix));
  if (candidates.length === 0 && categoryPrefix !== '/') {
    candidates = imageIndex.filter((image) => image.relativePath.startsWith(categoryPrefix));
  }
  if (candidates.length === 0) return null;

  const sourceValues = [
    product.name,
    product.productType,
    product.type,
    product.section,
    product.rootCategory
  ].filter(Boolean);
  const primaryWords = normalizeText(sourceValues[0] || '')
    .split(' ')
    .filter((word) => word.length >= 3);
  const anchorWord = primaryWords.length > 0 ? primaryWords[primaryWords.length - 1] : '';

  const keywords = buildKeywords(sourceValues);
  const exactKeywords = sourceValues
    .map((value) => normalizeText(value).replace(/\s+/g, ''))
    .filter(Boolean);
  const tokenKeywords = keywords.filter((keyword) => !exactKeywords.includes(keyword) && keyword.length >= 3);
  const minimumTokenMatches = tokenKeywords.length >= 2 ? 2 : 1;

  let bestMatch = null;
  let bestScore = 0;

  candidates.forEach((candidate) => {
    let score = 0;
    let exactMatchFound = false;
    const matchedTokens = new Set();

    exactKeywords.forEach((keyword) => {
      if (candidate.normalizedBasename.includes(keyword)) {
        score += 20;
        exactMatchFound = true;
      } else if (candidate.normalizedRelativePath.includes(keyword)) {
        score += 12;
        exactMatchFound = true;
      }
    });

    tokenKeywords.forEach((keyword) => {
      if (candidate.normalizedBasename.includes(keyword)) {
        score += Math.max(5, keyword.length);
        matchedTokens.add(keyword);
      } else if (candidate.normalizedRelativePath.includes(keyword)) {
        score += Math.max(2, Math.floor(keyword.length / 2));
        matchedTokens.add(keyword);
      }
    });

    if (!exactMatchFound && matchedTokens.size < minimumTokenMatches) {
      return;
    }

    if (
      !exactMatchFound &&
      anchorWord &&
      !candidate.normalizedBasename.includes(anchorWord) &&
      !candidate.normalizedRelativePath.includes(anchorWord)
    ) {
      return;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = candidate;
    }
  });

  if (!bestMatch || bestScore < 8) {
    return null;
  }

  return `/api/product-image?path=${encodeURIComponent(bestMatch.relativePath)}`;
}

function attachImagesToCategory(result) {
  if (!result?.category || !Array.isArray(result.subcategories)) {
    return result;
  }

  result.subcategories.forEach((subcategory) => {
    if (Array.isArray(subcategory.products)) {
      subcategory.products.forEach((product) => {
        product.image = findBestImageForProduct(result.category, subcategory.name, product) || product.image || '';
      });
    }

    if (Array.isArray(subcategory.rivets)) {
      subcategory.rivets.forEach((product) => {
        product.image = findBestImageForProduct(result.category, subcategory.name, product) || product.image || '';
      });
    }

    if (Array.isArray(subcategory.productTypes)) {
      subcategory.productTypes.forEach((productType) => {
        if (Array.isArray(productType.tools)) {
          productType.tools.forEach((tool) => {
            tool.image = findBestImageForProduct(result.category, subcategory.name, tool) || tool.image || '';
          });
        }
      });
    }
  });

  return result;
}

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

// Process Architectural Components Excel
function processArchitecturalComponents(workbook) {
  const subcategories = [];
  const sheetNames = workbook.SheetNames;

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    const products = [];
    let currentRoot = '';
    let currentType = '';

    // Architectural Hardware: 0=Root, 1=Type, 2=Variants, 3=Remarks, 4=Series/Model, 5=Brand(s), 7=Description
    const isArchHardware = sheetName === 'Architectural Hardware';
    // Furniture Hardware: 0=Root, 1=Category, 2=Variants, 3=Cup Diameter, 4=Opening Angle, 5=Mounting, 6=Overlay, 7=Closing Action, 8=Common Use, 9=Description
    const isFurniture = sheetName === 'Furniture Hardware';
    const furnitureHeaders = isFurniture && data[0] ? data[0].map((c) => String(c || '').trim()).filter(Boolean) : [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;

      const root = String(row[0] || '').trim();
      const col1 = String(row[1] || '').trim();
      const col2 = String(row[2] || '').trim();
      const remarks = String(row[3] || '').trim();
      const description = String(row[row.length - 1] || '').trim();

      if (root) currentRoot = root;
      if (col1 && !col1.match(/^(Type|Category|Products|Product Variants)$/)) currentType = col1;

      const productName = col2 || col1 || root;
      if (!productName || productName.length < 2) continue;
      if (productName.match(/^(Root Category|Type|Product Variants|Cup Diameter|Opening Angle)/)) continue;

      const product = {
        name: productName,
        type: currentType || currentRoot,
        rootCategory: currentRoot,
        commonUse: remarks,
        description: description
      };

      if (isArchHardware) {
        const brandsStr = String(row[5] || '').trim();
        const seriesModel = String(row[4] || '').trim();
        if (brandsStr) {
          product.brands = brandsStr.split(/[,;]/).map((b) => b.trim()).filter(Boolean);
        }
        if (seriesModel) product.seriesModelExamples = seriesModel;
      }

      if (isFurniture && furnitureHeaders.length >= 9) {
        const cupD = String(row[3] || '').trim();
        const openAngle = String(row[4] || '').trim();
        const mounting = String(row[5] || '').trim();
        const overlay = String(row[6] || '').trim();
        const closing = String(row[7] || '').trim();
        const commonUse = String(row[8] || '').trim();
        const specRow = {};
        if (cupD) specRow['Cup Diameter'] = cupD;
        if (openAngle) specRow['Opening Angle'] = openAngle;
        if (mounting) specRow['Mounting Type'] = mounting;
        if (overlay) specRow['Overlay Type'] = overlay;
        if (closing) specRow['Closing Action'] = closing;
        if (commonUse) specRow['Common Use'] = commonUse;
        if (Object.keys(specRow).length > 0) {
          product.specifications = [specRow];
        }
      }

      products.push(product);
    }

    const seen = new Set();
    const uniqueProducts = products.filter((p) => {
      const key = p.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (uniqueProducts.length > 0) {
      subcategories.push({
        name: sheetName,
        products: uniqueProducts
      });
    }
  });

  return {
    category: 'Architectural Components',
    subcategories: subcategories
  };
}

// Process Retail and Home Solution Excel
function processRetailAndHomeSolution(workbook) {
  const subcategories = [];
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  const categoryProducts = {};
  let lastCategory = '';

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;

    const category = String(row[0] || '').trim();
    const productType = String(row[1] || '').trim();
    const applications = String(row[2] || '').trim();
    const remarks = String(row[3] || '').trim();
    const description = String((row[5] ?? row[4] ?? row[6] ?? '') || '').trim();

    if (!productType) continue;
    if (productType === 'Product Type') continue;

    if (category) lastCategory = category;
    const catKey = lastCategory || 'Retail & Home Solutions';
    if (!categoryProducts[catKey]) {
      categoryProducts[catKey] = [];
    }
    categoryProducts[catKey].push({
      name: productType,
      type: catKey,
      commonUse: applications,
      remarks: remarks,
      description: description
    });
  }

  Object.entries(categoryProducts).forEach(([catName, products]) => {
    const seen = new Set();
    const uniqueProducts = products.filter((p) => {
      if (seen.has(p.name)) return false;
      seen.add(p.name);
      return true;
    });
    if (uniqueProducts.length > 0) {
      subcategories.push({
        name: catName,
        products: uniqueProducts
      });
    }
  });

  return {
    category: 'Retail & Home Solutions',
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
      case 'processArchitecturalComponents':
        result = processArchitecturalComponents(workbook);
        break;
      case 'processRetailAndHomeSolution':
        result = processRetailAndHomeSolution(workbook);
        break;
      default:
        console.error(`❌ Unknown processor: ${config.processor}`);
        return null;
    }

    result = attachImagesToCategory(result);

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

// Process all Excel files from informations/ folder
function processAllExcelFiles() {
  console.log('🚀 Starting Excel file processing...\n');

  if (!fs.existsSync(EXCEL_DIR)) {
    console.log('⚠️  informations/ folder not found.');
    return;
  }

  const files = fs.readdirSync(EXCEL_DIR);
  const excelFiles = files.filter(file =>
    file.endsWith('.xlsx') || file.endsWith('.xls')
  );

  // Process in consistent order
  const order = Object.keys(EXCEL_CONFIG);
  const sortedFiles = excelFiles.filter((f) => order.includes(f)).sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );

  if (sortedFiles.length === 0) {
    console.log('⚠️  No configured Excel files found in informations/.');
    return;
  }

  console.log(`Found ${sortedFiles.length} Excel file(s):`);
  sortedFiles.forEach((file) => console.log(`   - ${file}`));
  console.log('');

  const results = [];
  sortedFiles.forEach((file) => {
    const result = processExcelFile(path.join(EXCEL_DIR, file));
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

