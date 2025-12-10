# Requirements Document

## Introduction

This feature enhances the table module to support font style properties (color, font-weight, font-size, font-family, font-style, text-decoration) in table cells. Currently, the `TableCellProperty` only supports cell-level styling (backgroundColor, border properties, textAlign). This enhancement will allow table cells to preserve and render text-level font styling when parsing HTML tables and converting table nodes back to HTML.

## Glossary

- **TableCellProperty**: A TypeScript type that defines the styling properties that can be applied to table cells
- **Table Module**: The wangEditor-next module responsible for handling table functionality, located in `packages/table-module`
- **HTML Parser**: The component that converts HTML table elements into internal Slate node representations
- **HTML Serializer**: The component that converts internal Slate table nodes back to HTML
- **VNode**: Virtual DOM node used by Snabbdom for rendering
- **Slate Node**: The internal data structure representing editor content

## Requirements

### Requirement 1

**User Story:** As a user, I want to paste HTML tables with font styling into the editor, so that the original text formatting is preserved.

#### Acceptance Criteria

1. WHEN an HTML table with inline font styles is pasted THEN the system SHALL parse and store color, font-weight, font-size, font-family, font-style, and text-decoration properties
2. WHEN parsing HTML with CSS color properties THEN the system SHALL extract and store the color value in the TableCellProperty
3. WHEN parsing HTML with font-weight properties THEN the system SHALL extract and store the font-weight value in the TableCellProperty
4. WHEN parsing HTML with font-size properties THEN the system SHALL extract and store the font-size value in the TableCellProperty
5. WHEN parsing HTML with font-family properties THEN the system SHALL extract and store the font-family value in the TableCellProperty
6. WHEN parsing HTML with font-style properties THEN the system SHALL extract and store the font-style value in the TableCellProperty
7. WHEN parsing HTML with text-decoration properties THEN the system SHALL extract and store the text-decoration value in the TableCellProperty

### Requirement 2

**User Story:** As a user, I want table cells with font styling to render correctly in the editor, so that I can see the formatted text as intended.

#### Acceptance Criteria

1. WHEN a table cell has a color property THEN the system SHALL render the cell text with the specified color
2. WHEN a table cell has a font-weight property THEN the system SHALL render the cell text with the specified font-weight
3. WHEN a table cell has a font-size property THEN the system SHALL render the cell text with the specified font-size
4. WHEN a table cell has a font-family property THEN the system SHALL render the cell text with the specified font-family
5. WHEN a table cell has a font-style property THEN the system SHALL render the cell text with the specified font-style
6. WHEN a table cell has a text-decoration property THEN the system SHALL render the cell text with the specified text-decoration
7. WHEN rendering table cells THEN the system SHALL apply font styles to the VNode using the addVnodeStyle utility

### Requirement 3

**User Story:** As a user, I want to export tables with font styling to HTML, so that the formatting is preserved when used outside the editor.

#### Acceptance Criteria

1. WHEN converting a table cell with color property to HTML THEN the system SHALL include the color in the inline style attribute
2. WHEN converting a table cell with font-weight property to HTML THEN the system SHALL include the font-weight in the inline style attribute
3. WHEN converting a table cell with font-size property to HTML THEN the system SHALL include the font-size in the inline style attribute
4. WHEN converting a table cell with font-family property to HTML THEN the system SHALL include the font-family in the inline style attribute
5. WHEN converting a table cell with font-style property to HTML THEN the system SHALL include the font-style in the inline style attribute
6. WHEN converting a table cell with text-decoration property to HTML THEN the system SHALL include the text-decoration in the inline style attribute
7. WHEN a table cell has no font style properties THEN the system SHALL not add unnecessary style attributes to the HTML output

### Requirement 4

**User Story:** As a developer, I want the font style properties to be properly typed, so that I can use them safely throughout the codebase.

#### Acceptance Criteria

1. WHEN defining TableCellProperty THEN the system SHALL include optional properties for color, font-weight, font-size, font-family, font-style, and text-decoration
2. WHEN a font-size value is stored THEN the system SHALL accept both numeric values with units (e.g., "16px") and unitless numeric strings
3. WHEN a font-weight value is stored THEN the system SHALL accept both numeric values (e.g., "400", "700") and keyword values (e.g., "bold", "normal")
4. WHEN a color value is stored THEN the system SHALL accept any valid CSS color format (hex, rgb, rgba, named colors)
5. WHEN TypeScript types are updated THEN the system SHALL maintain backward compatibility with existing TableCellProperty usage

### Requirement 5

**User Story:** As a user, I want font style properties to work consistently across all table operations, so that formatting is never lost during editing.

#### Acceptance Criteria

1. WHEN a table cell is copied and pasted THEN the system SHALL preserve all font style properties
2. WHEN table cells are merged THEN the system SHALL preserve font style properties from the primary cell
3. WHEN a table row is inserted THEN the system SHALL not apply font styles to new cells unless explicitly set
4. WHEN a table is resized THEN the system SHALL maintain all font style properties on existing cells
5. WHEN undo/redo operations are performed THEN the system SHALL correctly restore font style properties
