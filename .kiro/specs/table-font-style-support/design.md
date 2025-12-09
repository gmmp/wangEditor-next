# Design Document: Table Font Style Support

## Overview

This design extends the table module to support font style properties (color, font-weight, font-size, font-family, font-style, text-decoration) on table cells. The implementation follows the existing pattern used for cell-level styling (backgroundColor, border properties) and integrates with the existing parsing, rendering, and serialization pipeline.

The changes are minimal and focused on four key files:
1. `custom-types.ts` - Add font style properties to the type definition
2. `parse-style-html.ts` - Extract font styles from HTML during parsing
3. `render-style.ts` - Apply font styles to VNodes during rendering
4. `style-to-html.ts` - Include font styles when serializing to HTML

## Architecture

The table module follows a clear data flow:

```
HTML Input → Parse → Slate Nodes (with properties) → Render → VNodes → Display
                                                    ↓
                                              Serialize → HTML Output
```

Font style properties will be:
1. **Parsed** from HTML `style` attributes using `getStyleValue()` utility
2. **Stored** in `TableCellElement` nodes as part of `TableCellProperty`
3. **Rendered** by applying styles to VNodes using `addVnodeStyle()` utility
4. **Serialized** back to HTML using jQuery-like `css()` method

This approach maintains consistency with existing cell styling (backgroundColor, borders, textAlign).

## Components and Interfaces

### 1. Type Definitions (`custom-types.ts`)

**Current State:**
```typescript
export type TableCellProperty = {
  backgroundColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  textAlign?: string
}
```

**Enhanced State:**
```typescript
export type TableCellProperty = {
  // Existing properties
  backgroundColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  textAlign?: string
  
  // New font style properties
  color?: string
  fontWeight?: string
  fontSize?: string
  fontFamily?: string
  fontStyle?: string
  textDecoration?: string
}
```

### 2. HTML Parser (`parse-style-html.ts`)

**Function:** `parseStyleHtml(elem: DOMElement, node: Descendant, editor: IDomEditor): Descendant`

**Enhancement:** Extract font style properties from HTML elements using `getStyleValue()`.

**Logic:**
- Check if element is TABLE, TD, or TH
- Use `getStyleValue($elem, 'color')` to extract color
- Use `getStyleValue($elem, 'font-weight')` to extract font-weight
- Use `getStyleValue($elem, 'font-size')` to extract font-size
- Use `getStyleValue($elem, 'font-family')` to extract font-family
- Use `getStyleValue($elem, 'font-style')` to extract font-style
- Use `getStyleValue($elem, 'text-decoration')` to extract text-decoration
- Assign extracted values to the node if they exist

### 3. Renderer (`render-style.ts`)

**Function:** `renderStyle(node: Descendant, vnode: VNode): VNode`

**Enhancement:** Apply font style properties to VNodes.

**Logic:**
- Extract font properties from node: `color`, `fontWeight`, `fontSize`, `fontFamily`, `fontStyle`, `textDecoration`
- Build props object with camelCase property names for VNode
- Handle font-size unit normalization (add 'px' if pure numeric)
- Use `addVnodeStyle()` to apply styles to VNode
- For table nodes, apply to nested VNode (existing pattern)
- For cell nodes, apply directly to VNode

### 4. HTML Serializer (`style-to-html.ts`)

**Function:** `styleToHtml(node, elemHtml)`

**Enhancement:** Include font style properties in HTML output.

**Logic:**
- Check if node is 'table' or 'table-cell'
- Extract font properties from node
- Use `$elem.css('color', color)` to set color
- Use `$elem.css('font-weight', fontWeight)` to set font-weight
- Use `$elem.css('font-size', fontSize)` to set font-size
- Use `$elem.css('font-family', fontFamily)` to set font-family
- Use `$elem.css('font-style', fontStyle)` to set font-style
- Use `$elem.css('text-decoration', textDecoration)` to set text-decoration
- Return updated HTML using `getOuterHTML($elem)`

## Data Models

### TableCellProperty (Enhanced)

```typescript
export type TableCellProperty = {
  // Cell-level styling (existing)
  backgroundColor?: string    // CSS color value
  borderWidth?: string        // CSS border-width (e.g., "1px", "2")
  borderStyle?: string        // CSS border-style (e.g., "solid", "dashed")
  borderColor?: string        // CSS color value
  textAlign?: string          // CSS text-align (e.g., "left", "center")
  
  // Font styling (new)
  color?: string              // CSS color value (hex, rgb, rgba, named)
  fontWeight?: string         // CSS font-weight ("normal", "bold", "400", "700")
  fontSize?: string           // CSS font-size ("16px", "1.2em", "14")
  fontFamily?: string         // CSS font-family ("Arial", "serif")
  fontStyle?: string          // CSS font-style ("normal", "italic", "oblique")
  textDecoration?: string     // CSS text-decoration ("none", "underline", "line-through")
}
```

### TableCellElement (No Changes)

The `TableCellElement` type already extends `TableCellProperty`, so no changes needed:

```typescript
export type TableCellElement = {
  type: 'table-cell'
  isHeader?: boolean
  colSpan?: number
  rowSpan?: number
  width?: string
  children: Text[]
  hidden?: boolean
} & TableCellProperty  // ← Already includes all properties
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Font Style Parsing Completeness

*For any* HTML table cell element (TD or TH) with inline font style properties (color, font-weight, font-size, font-family, font-style, text-decoration), the parsing function should extract and store all present font style values in the resulting TableCellElement node.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7**

### Property 2: Font Style Rendering Consistency

*For any* table cell node with font style properties, the rendered VNode should contain all specified font styles in its data.style object.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

### Property 3: Font Size Unit Normalization

*For any* font-size value that is a pure numeric string matching the pattern `/^\d+(\.\d+)?$/` (e.g., "16", "14.5"), the rendered VNode should contain the value with "px" appended (e.g., "16px", "14.5px"), while font-size values that already contain units should remain unchanged.

**Validates: Requirements 2.3, 4.2**

### Property 4: HTML Serialization Completeness

*For any* table cell node with font style properties, serializing to HTML should include all present font style properties in the inline style attribute with correct CSS property names (color, font-weight, font-size, font-family, font-style, text-decoration).

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

### Property 5: Empty Style Attribute Omission

*For any* table cell node with no font style properties and no existing cell style properties (backgroundColor, border properties, textAlign), the HTML serialization should not add an empty or unnecessary style attribute to the output.

**Validates: Requirements 3.7**

### Property 6: Round Trip Preservation

*For any* HTML table cell with font style properties, parsing the HTML to create a node, then serializing that node back to HTML, should preserve all font style property values (allowing for format normalization like unit addition).

**Validates: Requirements 1.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1**

## Error Handling

### Invalid CSS Values

**Scenario:** HTML contains invalid CSS values (e.g., `color: invalid-color`)

**Handling:** 
- Parse and store the value as-is
- Browser will handle invalid CSS gracefully during rendering
- No validation needed at parse time

### Missing Style Properties

**Scenario:** HTML element has no font style properties

**Handling:**
- Properties remain undefined in TableCellProperty
- Renderer skips undefined properties
- Serializer skips undefined properties
- No default values applied

### Unit Handling for font-size

**Scenario:** font-size value is numeric without units (e.g., "16")

**Handling:**
- During rendering: Add "px" suffix using regex check (existing pattern)
- During serialization: Output value as-is (browser interprets unitless as px)
- Regex: `/^\d+(\.\d+)?$/` to detect pure numeric values

### Property Name Conversion

**Scenario:** CSS uses kebab-case (font-weight), JavaScript uses camelCase (fontWeight)

**Handling:**
- Parse: Extract from HTML using kebab-case (`getStyleValue($elem, 'font-weight')`)
- Store: Use camelCase in TypeScript types (`fontWeight`)
- Render: Use camelCase for VNode styles (`fontWeight`)
- Serialize: Use kebab-case for CSS output (`$elem.css('font-weight', fontWeight)`)

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Parsing Tests** (`parse-style-html.test.ts`)
   - Parse table cell with all font properties
   - Parse table cell with some font properties
   - Parse table cell with no font properties
   - Parse table cell with invalid CSS values
   - Parse table cell with mixed kebab-case and camelCase

2. **Rendering Tests** (`render-style.test.ts`)
   - Render cell with all font properties
   - Render cell with numeric font-size (unit normalization)
   - Render cell with font-size already having units
   - Render cell with no font properties
   - Verify VNode structure and style object

3. **Serialization Tests** (`style-to-html.test.ts`)
   - Serialize cell with all font properties
   - Serialize cell with some font properties
   - Serialize cell with no font properties
   - Verify HTML output format and style attribute

### Property-Based Tests

Property-based tests will verify universal properties across many inputs using **fast-check** (JavaScript PBT library):

**Configuration:** Each property test should run a minimum of 100 iterations.

**Test Tags:** Each test must include a comment with format: `**Feature: table-font-style-support, Property {number}: {property_text}**`

1. **Property Test 1: HTML Round Trip**
   - Generate random table cells with random font style combinations
   - Parse HTML → Serialize to HTML
   - Verify all font styles are preserved
   - **Tag:** `**Feature: table-font-style-support, Property 1: HTML Parsing Round Trip for Font Styles**`

2. **Property Test 2: Rendering Consistency**
   - Generate random TableCellElement nodes with font properties
   - Render to VNode
   - Verify VNode.data.style contains all specified properties
   - **Tag:** `**Feature: table-font-style-support, Property 2: Font Style Rendering Consistency**`

3. **Property Test 3: Unit Normalization**
   - Generate random numeric strings (with and without decimals)
   - Render cells with these font-size values
   - Verify pure numeric values get "px" appended
   - Verify values with units remain unchanged
   - **Tag:** `**Feature: table-font-style-support, Property 3: Font Size Unit Normalization**`

4. **Property Test 4: Empty Style Omission**
   - Generate random table cells with no style properties
   - Serialize to HTML
   - Verify no empty style attribute is added
   - **Tag:** `**Feature: table-font-style-support, Property 4: Empty Style Attribute Omission**`

### Integration Tests

Integration tests will verify the feature works end-to-end:

1. Paste HTML table with font styles → Verify editor displays correctly
2. Edit table cell with font styles → Verify styles persist
3. Copy/paste cells with font styles → Verify styles are copied
4. Export table to HTML → Verify font styles in output

### Test Utilities

Leverage existing test utilities:
- `createTableWithRows()` - Create test table structures
- `addVnodeStyle()` test helpers from `vdom.test.ts`
- DOM manipulation utilities from `dom.ts`

## Implementation Notes

### Consistency with Existing Code

The implementation follows the exact pattern used for existing cell properties:

1. **Type Definition:** Add properties to `TableCellProperty` (like `backgroundColor`)
2. **Parsing:** Use `getStyleValue($elem, 'property-name')` (like `borderWidth`)
3. **Rendering:** Check property existence, add to props object, use `addVnodeStyle()` (like `textAlign`)
4. **Serialization:** Use `$elem.css('property-name', value)` (like `borderColor`)

### CSS Property Name Mapping

| CSS Property (HTML) | TypeScript Property | VNode Style Property |
|---------------------|---------------------|----------------------|
| color               | color               | color                |
| font-weight         | fontWeight          | fontWeight           |
| font-size           | fontSize            | fontSize             |
| font-family         | fontFamily          | fontFamily           |
| font-style          | fontStyle           | fontStyle            |
| text-decoration     | textDecoration      | textDecoration       |

### Backward Compatibility

- All new properties are optional (`?:`)
- Existing code without font properties continues to work
- No breaking changes to existing APIs
- No changes to TableCellElement structure (already extends TableCellProperty)

### Performance Considerations

- Minimal performance impact: only 6 additional property checks
- No new loops or complex operations
- Leverages existing utilities (`getStyleValue`, `addVnodeStyle`)
- Properties are optional, so no overhead when not used
