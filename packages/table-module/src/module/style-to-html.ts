/**
 * @description style to html
 * @author hsuna
 */

import $, { getOuterHTML } from '../utils/dom'

export function styleToHtml(node, elemHtml) {
  if (node.type !== 'table' && node.type !== 'table-cell') { return elemHtml }

  const {
    backgroundColor, borderWidth, borderStyle, borderColor, textAlign,
    color, fontWeight, fontSize, fontFamily, fontStyle, textDecoration,
  } = node

  if (!(backgroundColor || borderWidth || borderStyle || borderColor || textAlign
    || color || fontWeight || fontSize || fontFamily || fontStyle || textDecoration)) {
    return elemHtml
  }

  // 设置样式
  const $elem = $(elemHtml)

  if (backgroundColor) { $elem.css('background-color', backgroundColor) }
  if (borderWidth) { $elem.css('border-width', `${borderWidth}px`) }
  if (borderStyle) { $elem.css('border-style', borderStyle === 'none' ? '' : borderStyle) }
  if (borderColor) { $elem.css('border-color', borderColor) }
  if (textAlign) { $elem.css('text-align', textAlign) }

  // 设置字体样式
  if (color) { $elem.css('color', color) }
  if (fontWeight) { $elem.css('font-weight', fontWeight) }
  if (fontSize) { $elem.css('font-size', fontSize) }
  if (fontFamily) { $elem.css('font-family', fontFamily) }
  if (fontStyle) { $elem.css('font-style', fontStyle) }
  if (textDecoration) { $elem.css('text-decoration', textDecoration) }

  // 输出 html
  return getOuterHTML($elem)
}
