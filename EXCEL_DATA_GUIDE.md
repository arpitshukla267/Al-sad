# Excel Data Processing Guide

## Quick Start

### To Process All Excel Files

Simply run:
```bash
npm run process-excel
```

Or directly:
```bash
node scripts/process-excel-data.js
```

This will automatically:
1. Find all Excel files (`.xlsx` or `.xls`) in the root directory
2. Process each file according to its configuration
3. Generate/update JSON data files in the `data/` directory
4. Create a consolidated `all-products.json` file

## Adding a New Excel File

### Option 1: Use Existing Processor (If Structure Matches)

If your new Excel file has a similar structure to an existing one:

1. **Place the file** in the root directory
2. **Add configuration** in `scripts/process-excel-data.js`:
   ```javascript
   'Your New File.xlsx': {
     category: 'Your Category Name',
     processor: 'processProfessionalTools',  // Use existing processor
     outputFile: 'data/your-category.json'
   }
   ```
3. **Run**: `npm run process-excel`

### Option 2: Create Custom Processor (For Different Structure)

1. **Place the file** in the root directory
2. **Create processor function** in `scripts/process-excel-data.js`:
   ```javascript
   function processYourCategory(workbook) {
     const subcategories = [];
     const sheetNames = workbook.SheetNames;

     sheetNames.forEach((sheetName) => {
       const worksheet = workbook.Sheets[sheetName];
       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
       
       // Your processing logic here
       // Analyze the data structure and extract information
       
       subcategories.push({
         name: sheetName,
         products: [...] // or productTypes, tools, etc.
       });
     });

     return {
       category: 'Your Category Name',
       subcategories: subcategories
     };
   }
   ```
3. **Add to configuration**:
   ```javascript
   'Your New File.xlsx': {
     category: 'Your Category Name',
     processor: 'processYourCategory',
     outputFile: 'data/your-category.json'
   }
   ```
4. **Add to switch statement**:
   ```javascript
   case 'processYourCategory':
     result = processYourCategory(workbook);
     break;
   ```
5. **Run**: `npm run process-excel`

## Updating Existing Files

Simply **replace the Excel file** in the root directory with the updated version and run:

```bash
npm run process-excel
```

The system will automatically detect and process the updated file, overwriting the existing JSON data.

## File Structure

### Input
- Excel files (`.xlsx` or `.xls`) in the **root directory**
- Each file can have multiple sheets
- Each sheet represents a subcategory or product type

### Output
- Individual category files: `data/[category-name].json`
- Consolidated file: `data/all-products.json`
- All files are automatically updated on each run

## Current Files Supported

| Excel File | Category | Output File | Sheets |
|------------|----------|-------------|--------|
| `Professional Tools & Gear.xlsx` | Professional Tools & Gear | `data/professional-tools-gear.json` | Hand Tools, Power Tools, Safety & Protective Gear, Abrasive Tools & Materials |
| `Structural Materials.xlsx` | Structural Materials | `data/structural-materials.json` | Screws & Nails, Metal Sections & Profiles, Fastening & Anchor Systems, Industrial materials |

## Data Structure Examples

### Professional Tools & Gear Format
```json
{
  "category": "Professional Tools & Gear",
  "subcategories": [
    {
      "name": "Hand Tools",
      "productTypes": [
        {
          "name": "General Hand Tools with Handles",
          "tools": [
            {
              "name": "Hammer",
              "commonUse": "Driving nails, breaking objects"
            }
          ]
        }
      ]
    }
  ]
}
```

### Structural Materials Format
```json
{
  "category": "Structural Materials",
  "subcategories": [
    {
      "name": "Screws & Nails",
      "products": [
        {
          "productType": "Drywall Screw",
          "subTypes": ["Fine Thread", "Coarse Thread"],
          "material": "Carbon Steel",
          "finish": "Black Phosphate",
          "applications": "Fixing drywall to metal/wood studs"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### File Not Being Processed
- ✅ Check filename matches exactly (case-sensitive) in `EXCEL_CONFIG`
- ✅ Verify file is in root directory (not in subfolders)
- ✅ Check file extension is `.xlsx` or `.xls`

### Empty or Incorrect Data
- ✅ Review the processor function logic
- ✅ Check Excel file structure matches expected format
- ✅ Verify sheet names and column headers
- ✅ Add `console.log` statements in processor to debug

### Missing Sheets
- ✅ Check sheet names in Excel match what processor expects
- ✅ Verify sheets have data (not just headers)
- ✅ Check for hidden or empty sheets

## Best Practices

1. **Naming Convention**: Use descriptive, consistent file names
2. **Structure**: Keep Excel file structure consistent within a category
3. **Backup**: Keep backups of Excel files before major updates
4. **Version Control**: Commit Excel files to track changes over time
5. **Testing**: Test with a small sample before processing large files
6. **Documentation**: Document any custom processor logic

## Workflow Example

### Scenario: Adding a new "Architectural Components" Excel file

1. **Place file**: `Architectural Components.xlsx` in root
2. **Analyze structure**: Review sheets and data format
3. **Create processor**: Add `processArchitecturalComponents()` function
4. **Add config**:
   ```javascript
   'Architectural Components.xlsx': {
     category: 'Architectural Components',
     processor: 'processArchitecturalComponents',
     outputFile: 'data/architectural-components.json'
   }
   ```
5. **Add to switch**: Add case in `processExcelFile()`
6. **Test**: Run `npm run process-excel`
7. **Verify**: Check `data/architectural-components.json` output
8. **Update docs**: Add to this guide and `PRODUCT_STRUCTURE.md`

## Integration with Application

The generated JSON files can be imported directly into your Next.js application:

```javascript
// Example: Import product data
import professionalTools from '@/data/professional-tools-gear.json';
import structuralMaterials from '@/data/structural-materials.json';
import allProducts from '@/data/all-products.json';

// Use in components
const categories = allProducts.categories;
```

## Future Enhancements

- [ ] Auto-detect Excel structure
- [ ] Support CSV files
- [ ] Data validation and error reporting
- [ ] Diff generation (show what changed)
- [ ] Web interface for file upload
- [ ] Automatic API endpoint generation

---

**Need Help?** Check `scripts/README.md` for detailed technical documentation.

