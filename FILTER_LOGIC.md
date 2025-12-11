# Filter Logic & Decision Making

## Current Implementation

Currently, filters are **hardcoded** in `FilterSidebar.jsx` with static values:
- Type (Door Hinges specific)
- Materials (Generic list)
- Brands (Placeholder brands)

This is **not dynamic** and doesn't adapt to different product categories.

## How Filters Should Be Determined

Filters should be **data-driven** and **context-aware** based on:

1. **Product Category** (e.g., Structural Materials vs Professional Tools)
2. **Subcategory** (e.g., Screws & Nails vs Metal Sections & Profiles)
3. **Product Data Structure** (what properties exist in the JSON data)

## Filter Decision Logic

### Step 1: Analyze Product Data Structure

For each category/subcategory, examine the JSON data to identify:
- What properties exist (material, finish, type, thickness, etc.)
- What values are available for each property
- Which properties are filterable (not unique per product)

### Step 2: Category-Specific Filter Rules

#### Professional Tools & Gear
- **Hand Tools / Power Tools**: Filter by **Product Type** (e.g., "General Hand Tools", "Heavy-Duty Tools")
- **Safety & Protection**: Filter by **Protection Type** (Head, Hand, Foot, Body)
- **Abrasive Tools**: Filter by **Tool Type** (Grinding, Sanding, Cutting)

#### Structural Materials

**Screws & Nails:**
- **Material** (from product data: Mild Steel, SS, Carbon Steel, etc.)
- **Finish** (from product data: Zinc Plated, Black Phosphate, SS, etc.)
- **Type** (from product data: Self Drilling, Self Tapping, Machine Screw, etc.)
- **Head Type** (Pan, CSK, Hex, Wafer, etc.)

**Metal Sections & Profiles:**
- **Material** (MS, SS, Aluminum, Brass, Copper)
- **Thickness** (Range: 3-25, etc.)
- **Width** (Range: 20-300, etc.)
- **Length** (3000, 6000, etc.)
- **Finish** (Black/Painted, Polished, Mill/Anodized, etc.)
- **Type** (Flat Bar, Round Bar, Angle, Channel, Tube, Sheet)

**Fastening & Anchor Systems:**
- **Material** (Mild Steel, SS, Galvanized)
- **Type** (Anchor Bolt, Wedge Anchor, Toggle Bolt, etc.)
- **Application** (Foundation, Base Plate, Machinery Mounting, etc.)

**Industrial Materials:**
- **Category** (Adhesives, Sealants, Foams, Polish, Welding Materials, Packaging, Wire Mesh)
- **Type** (Epoxy, Construction, Super Glue, etc.)
- **Material** (varies by category)
- **Size/Gauge** (for Wire Mesh)

## Dynamic Filter Extraction

### From JSON Data Structure

```javascript
// Example: Extract filters from Structural Materials - Screws & Nails
const products = subcategory.products;

// Extract unique materials
const materials = [...new Set(products.map(p => p.material).filter(Boolean))];

// Extract unique finishes
const finishes = [...new Set(products.map(p => p.finish).filter(Boolean))];

// Extract unique types
const types = [...new Set(products.map(p => p.type).filter(Boolean))];
```

### From Professional Tools & Gear

```javascript
// Extract product types as filters
const productTypes = subcategory.productTypes.map(pt => pt.name);

// For tools, we can filter by the product type they belong to
// e.g., "General Hand Tools with Handles", "Heavy-Duty Tools with Handles"
```

## Filter Configuration System

### Recommended Approach

Create a **filter configuration** that maps category/subcategory to available filters:

```javascript
const FILTER_CONFIG = {
  'structural-materials': {
    'screws-nails': {
      filters: [
        { id: 'type', title: 'Type', extractFrom: 'type' },
        { id: 'material', title: 'Material', extractFrom: 'material' },
        { id: 'finish', title: 'Finish', extractFrom: 'finish' },
      ]
    },
    'metal-section-profiles': {
      filters: [
        { id: 'type', title: 'Type', extractFrom: 'type' },
        { id: 'material', title: 'Material', extractFrom: 'material' },
        { id: 'thickness', title: 'Thickness', extractFrom: 'thickness', type: 'range' },
        { id: 'width', title: 'Width', extractFrom: 'width', type: 'range' },
        { id: 'finish', title: 'Finish', extractFrom: 'finish' },
      ]
    },
    // ... more subcategories
  },
  'professional-tools-gear': {
    'hand-tools': {
      filters: [
        { id: 'productType', title: 'Product Type', extractFrom: 'productTypes.name' },
      ]
    },
    // ... more subcategories
  }
};
```

## Implementation Strategy

### 1. Extract Filters from Data

```javascript
function extractFilters(products, filterConfig) {
  const filters = {};
  
  filterConfig.forEach(filterDef => {
    const values = extractUniqueValues(products, filterDef.extractFrom);
    filters[filterDef.id] = {
      title: filterDef.title,
      type: filterDef.type || 'checkbox',
      options: values
    };
  });
  
  return filters;
}
```

### 2. Dynamic Filter Rendering

```javascript
function FilterSidebar({ category, subcategory, products }) {
  const filterConfig = FILTER_CONFIG[category]?.[subcategory];
  const filters = extractFilters(products, filterConfig.filters);
  
  return (
    <div>
      {Object.entries(filters).map(([id, filter]) => (
        <FilterSection key={id} {...filter} />
      ))}
    </div>
  );
}
```

## Current Issues

1. **Hardcoded Filters**: Filters are static and don't reflect actual product data
2. **No Data Extraction**: Filters aren't extracted from JSON data
3. **Category-Agnostic**: Same filters shown for all categories
4. **No Range Filters**: Can't handle numeric ranges (thickness, width, length)

## Recommended Solution

1. **Create Filter Configuration**: Map each category/subcategory to its filter definitions
2. **Extract from Data**: Dynamically extract filter options from product JSON
3. **Support Multiple Filter Types**: Checkboxes, ranges, dropdowns
4. **Context-Aware**: Show only relevant filters for current category/subcategory

## Example: Screws & Nails Filters

Based on the actual data structure:

```json
{
  "type": "Self Drilling Screw",
  "material": "Carbon Steel",
  "finish": "Zinc Plated"
}
```

Filters should be:
- **Type**: Self Drilling Screw, Self Tapping Screw, Machine Screw, etc.
- **Material**: Carbon Steel, SS, Mild Steel, etc.
- **Finish**: Zinc Plated, SS, Black Phosphate, etc.

These should be **extracted dynamically** from the products array, not hardcoded.

