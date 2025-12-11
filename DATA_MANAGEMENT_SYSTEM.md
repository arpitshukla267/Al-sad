# Centralized Data Management System

## Overview

This project includes a centralized system for managing product data from Excel files. The system automatically processes Excel files and generates structured JSON data that can be used throughout the application.

## Quick Start

### Process All Excel Files

```bash
npm run process-excel
```

This single command will:
- ✅ Find all Excel files in the root directory
- ✅ Process each file according to its configuration
- ✅ Generate/update JSON data files
- ✅ Create a consolidated data file

## System Architecture

```
Excel Files (Root Directory)
    ↓
process-excel-data.js (Processor)
    ↓
data/ (JSON Output Files)
    ├── professional-tools-gear.json
    ├── structural-materials.json
    ├── all-products.json (consolidated)
    └── [future category files]
```

## How to Use

### Adding a New Excel File

1. **Place the Excel file** in the project root directory
2. **Run the processor**: `npm run process-excel`
3. **If needed**, add configuration in `scripts/process-excel-data.js`

### Updating an Existing Excel File

1. **Replace the Excel file** in the root directory with the updated version
2. **Run**: `npm run process-excel`
3. **Data is automatically updated** - no manual editing needed!

## File Structure

### Input Files
- Location: Project root directory
- Format: `.xlsx` or `.xls`
- Naming: Descriptive names (e.g., "Professional Tools & Gear.xlsx")

### Output Files
- Location: `data/` directory
- Format: JSON
- Files:
  - Individual category files: `[category-name].json`
  - Consolidated file: `all-products.json`

## Configuration

### Current Configuration

The system is configured to process:

| Excel File | Category | Output | Status |
|------------|----------|--------|--------|
| `Professional Tools & Gear.xlsx` | Professional Tools & Gear | `data/professional-tools-gear.json` | ✅ Configured |
| `Structural Materials.xlsx` | Structural Materials | `data/structural-materials.json` | ✅ Configured |

### Adding New Categories

See `EXCEL_DATA_GUIDE.md` for detailed instructions on adding new Excel files and processors.

## Data Flow

```
1. Excel File (Root)
   ↓
2. Processor Function (scripts/process-excel-data.js)
   ↓
3. Structured JSON (data/[category].json)
   ↓
4. Consolidated JSON (data/all-products.json)
   ↓
5. Application Usage (Import in components)
```

## Usage in Application

### Import Individual Category

```javascript
import professionalTools from '@/data/professional-tools-gear.json';
import structuralMaterials from '@/data/structural-materials.json';
```

### Import All Products

```javascript
import allProducts from '@/data/all-products.json';

// Access categories
const categories = allProducts.categories;

// Find specific category
const toolsCategory = categories.find(cat => 
  cat.category === 'Professional Tools & Gear'
);
```

### Example Component Usage

```javascript
'use client';

import allProducts from '@/data/all-products.json';

export default function ProductsPage() {
  const structuralMaterials = allProducts.categories.find(
    cat => cat.category === 'Structural Materials'
  );

  return (
    <div>
      {structuralMaterials.subcategories.map(subcat => (
        <div key={subcat.name}>
          <h2>{subcat.name}</h2>
          {/* Render products */}
        </div>
      ))}
    </div>
  );
}
```

## Benefits

1. **✅ Centralized Management**: All product data in one place
2. **✅ Easy Updates**: Just replace Excel file and run command
3. **✅ Type Safety**: Structured JSON format
4. **✅ Scalable**: Easy to add new categories
5. **✅ Version Control**: Track changes through Excel files
6. **✅ No Manual Editing**: Automatic processing

## Maintenance

### Regular Updates

When you receive updated Excel files:

```bash
# 1. Replace Excel file(s) in root directory
# 2. Run processor
npm run process-excel

# 3. Commit changes
git add .
git commit -m "Update product data from Excel"
```

### Adding New Categories

1. Add Excel file to root
2. Create processor function (if needed)
3. Add to configuration
4. Test and verify output
5. Document in `PRODUCT_STRUCTURE.md`

## Documentation

- **Quick Guide**: `EXCEL_DATA_GUIDE.md` - How to use the system
- **Technical Docs**: `scripts/README.md` - Detailed technical documentation
- **Product Structure**: `PRODUCT_STRUCTURE.md` - Complete product hierarchy

## Troubleshooting

### Common Issues

**File not processed?**
- Check filename matches configuration exactly
- Verify file is in root directory
- Check file extension (.xlsx or .xls)

**Incorrect data?**
- Review processor function logic
- Check Excel file structure
- Verify sheet names and headers

**Missing data?**
- Check for empty rows in Excel
- Verify processor handles all sheets
- Review data extraction logic

## Future Enhancements

- [ ] Web interface for file upload
- [ ] Auto-detection of Excel structure
- [ ] Data validation and error reporting
- [ ] Diff generation (show what changed)
- [ ] Support for CSV files
- [ ] API endpoints for data access
- [ ] Real-time data updates

## Support

For questions or issues:
1. Check `EXCEL_DATA_GUIDE.md` for usage instructions
2. Review `scripts/README.md` for technical details
3. Check `PRODUCT_STRUCTURE.md` for data structure

---

**Last Updated**: System created and tested with Professional Tools & Gear and Structural Materials Excel files.

