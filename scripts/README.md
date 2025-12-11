# Excel Data Processing System

This centralized system automatically processes Excel files and updates product data for the Al Sad product catalog.

## How It Works

1. **Place Excel files** in the project root directory
2. **Configure the file** in `process-excel-data.js` if it's a new category
3. **Run the script** to process all Excel files
4. **Data is automatically updated** in the `data/` directory

## Quick Start

### Process All Excel Files

```bash
node scripts/process-excel-data.js
```

This will:
- Find all `.xlsx` and `.xls` files in the root directory
- Process each file according to its configuration
- Generate structured JSON files in the `data/` directory
- Create a consolidated `data/all-products.json` file

## Adding New Excel Files

### Step 1: Add Your Excel File
Place your Excel file in the project root directory.

### Step 2: Add Configuration
Edit `scripts/process-excel-data.js` and add your file to the `EXCEL_CONFIG` object:

```javascript
const EXCEL_CONFIG = {
  'Your New File.xlsx': {
    category: 'Your Category Name',
    processor: 'processYourCategory',  // You'll need to create this function
    outputFile: 'data/your-category.json'
  }
};
```

### Step 3: Create Processor Function
Add a processor function that understands your Excel file structure:

```javascript
function processYourCategory(workbook) {
  const subcategories = [];
  const sheetNames = workbook.SheetNames;

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    
    // Process your data structure here
    // Return format:
    return {
      category: 'Your Category Name',
      subcategories: [
        {
          name: 'Subcategory Name',
          products: [...] // or productTypes, tools, etc.
        }
      ]
    };
  });
}
```

### Step 4: Update Switch Statement
Add your processor to the switch statement in `processExcelFile`:

```javascript
switch (config.processor) {
  case 'processYourCategory':
    result = processYourCategory(workbook);
    break;
  // ... other cases
}
```

### Step 5: Run the Script
```bash
node scripts/process-excel-data.js
```

## Updating Existing Files

Simply replace the Excel file in the root directory with the updated version and run:

```bash
node scripts/process-excel-data.js
```

The script will automatically detect and process the updated file.

## Output Structure

### Individual Category Files
Each category gets its own JSON file in `data/`:
- `data/professional-tools-gear.json`
- `data/structural-materials.json`
- etc.

### Consolidated File
All categories are combined in:
- `data/all-products.json`

## Current Configuration

### Professional Tools & Gear.xlsx
- **Processor**: `processProfessionalTools`
- **Output**: `data/professional-tools-gear.json`
- **Sheets**: Hand Tools, Power Tools, Safety & Protective Gear, Abrasive Tools & Materials

### Structural Materials.xlsx
- **Processor**: `processStructuralMaterials`
- **Output**: `data/structural-materials.json`
- **Sheets**: Screws & Nails, Metal Sections & Profiles, Fastening & Anchor Systems, Industrial materials

## Data Format

All output files follow this structure:

```json
{
  "category": "Category Name",
  "subcategories": [
    {
      "name": "Subcategory Name",
      "productTypes": [...],  // or "products", "tools", etc.
      // Additional fields based on category
    }
  ]
}
```

## Troubleshooting

### File Not Processed
- Check that the filename exactly matches the key in `EXCEL_CONFIG`
- Verify the file is in the root directory
- Check console output for error messages

### Incorrect Data Structure
- Review the processor function for your category
- Check the Excel file structure matches what the processor expects
- Add console.log statements to debug data parsing

### Missing Data
- Verify Excel file has data in expected columns
- Check for empty rows or formatting issues
- Review the processor logic for edge cases

## Best Practices

1. **Keep Excel files organized**: Use consistent naming and structure
2. **Test with sample data**: Process a small Excel file first
3. **Version control**: Commit Excel files to track changes
4. **Document custom processors**: Add comments explaining data structure
5. **Backup data**: Keep backups of processed JSON files

## Future Enhancements

Potential improvements:
- Auto-detect Excel file structure
- Support for CSV files
- Validation and error checking
- Data migration tools
- API endpoints for data access

