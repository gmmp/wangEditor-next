# Implementation Plan: Table Font Style Support

- [x] 1. Update type definitions to support font style properties
  - Add font style properties to `TableCellProperty` type in `custom-types.ts`
  - Properties to add: `color`, `fontWeight`, `fontSize`, `fontFamily`, `fontStyle`, `textDecoration`
  - All properties should be optional (using `?:`)
  - Add inline comments for each property
  - _Requirements: 4.1, 4.5_

- [x] 2. Enhance HTML parser to extract font style properties
  - Modify `parseStyleHtml()` function in `parse-style-html.ts`
  - Extract `color` using `getStyleValue($elem, 'color')`
  - Extract `font-weight` using `getStyleValue($elem, 'font-weight')`
  - Extract `font-size` using `getStyleValue($elem, 'font-size')`
  - Extract `font-family` using `getStyleValue($elem, 'font-family')`
  - Extract `font-style` using `getStyleValue($elem, 'font-style')`
  - Extract `text-decoration` using `getStyleValue($elem, 'text-decoration')`
  - Assign extracted values to `tableNode` using camelCase property names
  - Only assign if value exists (truthy check)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [ ]* 2.1 Write property test for font style parsing
  - **Property 1: Font Style Parsing Completeness**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7**

- [x] 3. Update renderer to apply font styles to VNodes
  - Modify `renderStyle()` function in `render-style.ts`
  - Extract font properties from node: `color`, `fontWeight`, `fontSize`, `fontFamily`, `fontStyle`, `textDecoration`
  - Add font properties to `props` object if they exist
  - Handle `fontSize` unit normalization: if value matches `/^\d+(\.\d+)?$/`, append "px"
  - Use existing `addVnodeStyle()` utility to apply styles
  - Follow existing pattern for table vs cell nodes
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ]* 3.1 Write property test for font style rendering
  - **Property 2: Font Style Rendering Consistency**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

- [ ]* 3.2 Write property test for font size unit normalization
  - **Property 3: Font Size Unit Normalization**
  - **Validates: Requirements 2.3, 4.2**

- [x] 4. Enhance HTML serializer to output font styles
  - Modify `styleToHtml()` function in `style-to-html.ts`
  - Extract font properties from node: `color`, `fontWeight`, `fontSize`, `fontFamily`, `fontStyle`, `textDecoration`
  - Update condition to check for font properties in addition to existing properties
  - Use `$elem.css('color', color)` to set color
  - Use `$elem.css('font-weight', fontWeight)` to set font-weight
  - Use `$elem.css('font-size', fontSize)` to set font-size
  - Use `$elem.css('font-family', fontFamily)` to set font-family
  - Use `$elem.css('font-style', fontStyle)` to set font-style
  - Use `$elem.css('text-decoration', textDecoration)` to set text-decoration
  - Only set CSS if property value exists
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ]* 4.1 Write property test for HTML serialization completeness
  - **Property 4: HTML Serialization Completeness**
  - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

- [ ]* 4.2 Write property test for empty style attribute omission
  - **Property 5: Empty Style Attribute Omission**
  - **Validates: Requirements 3.7**

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 6. Write integration test for round trip preservation
  - **Property 6: Round Trip Preservation**
  - **Validates: Requirements 1.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1**
  - Test parsing HTML → creating node → serializing to HTML
  - Verify all font style properties are preserved (with normalization)

- [ ]* 7. Write unit tests for edge cases
  - Test parsing table cell with no font properties
  - Test parsing table cell with invalid CSS values
  - Test rendering cell with mixed font properties
  - Test serialization of cell with only some font properties
  - Test that new cells don't have font styles by default
  - _Requirements: 5.3_
