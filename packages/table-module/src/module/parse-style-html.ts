/**
 * @description parse style html
 * @author hsuna
 */
import { IDomEditor } from '@wangeditor-next/core'
import { Descendant } from 'slate'

import $, { DOMElement, getStyleValue } from '../utils/dom'
import { TableCellElement } from './custom-types'

// 获取 var(--w-e-textarea-border-color) 变量的实际样式值
const DEFAULT_BORDER_COLOR = window
  ?.getComputedStyle(document.documentElement)
  ?.getPropertyValue('--w-e-textarea-border-color') || '#ccc'

/**
 * 将 CSS 尺寸字符串中的 'pt' 转换为 'px'
 * 转换比例: 1pt = 1.333333px (基于 W3C 推荐的 96 DPI 标准)
 * @param cssValue 包含 pt 单位的 CSS 字符串 (如 "medium 1pt 1pt 0.5pt")
 * @returns 转换后的 CSS 字符串 (如 "medium 1.333333px 1.333333px 0.6666665px")
 */
function convertPtToPx(cssValue: string): string {
  if (!cssValue || typeof cssValue !== 'string' || !cssValue.includes('pt')) {
    return cssValue
  }

  // 使用正则匹配所有带 'pt' 单位的值，例如 '1pt', '0.5pt', '100pt'，并进行替换
  return cssValue.replace(/(\d*\.?\d+)\s*pt/g, (_, p1) => {
    // p1 是捕获到的数字部分 (如 '1' 或 '0.5')
    const ptValue = parseFloat(p1)
    // 1pt ≈ 1.333333px。为了简化和保证精度，使用 4/3
    const pxValue = ((ptValue * 4) / 3).toFixed(2)

    return `${pxValue}px`
  })
}

export function parseStyleHtml(elem: DOMElement, node: Descendant, _editor: IDomEditor): Descendant {
  if (!['TABLE', 'TD', 'TH'].includes(elem.tagName)) { return node }

  const $elem = $(elem)

  const tableNode = node as TableCellElement
  let backgroundColor = getStyleValue($elem, 'background-color')

  if (!backgroundColor) { backgroundColor = getStyleValue($elem, 'background') } // word 背景色
  if (!backgroundColor) { backgroundColor = $elem.attr('bgcolor') || '' }
  if (!backgroundColor) { backgroundColor = $elem.attr('data-w-e-background-color') || '' }
  if (backgroundColor) {
    tableNode.backgroundColor = backgroundColor
  }

  let border = getStyleValue($elem, 'border')

  const dataBorderWidth = $elem.attr('data-w-e-border-width') || ''
  const dataBorderLine = $elem.attr('data-w-e-border-line') || ''
  const dataBorderColor = $elem.attr('data-w-e-border-color') || ''
  const borderAttr = $elem.attr('border') || ''
  const borderColorAttr = $elem.attr('bordercolor') || ''
  const classAttr = $elem.attr('class') || ''
  const classList = classAttr.trim().split(/\s+/).filter(Boolean)
  let borderStyleFromClass = ''

  for (let i = 0; i < classList.length; i += 1) {
    const className = classList[i]

    if (!className.startsWith('w-e-table-border-style-')) { continue }
    borderStyleFromClass = className.replace('w-e-table-border-style-', '')
    break
  }

  const hasDataBorder = !!(dataBorderWidth || dataBorderLine || dataBorderColor || borderAttr || borderColorAttr || borderStyleFromClass)

  if (!border && elem.tagName === 'TD' && !hasDataBorder) {
    // https://github.com/wangeditor-next/wangEditor-next/blob/master/packages/table-module/src/assets/index.less#L20
    // TD存在默认的css样式，尝试用getComputedStyle获取不到，只能写死
    border = `1px solid ${DEFAULT_BORDER_COLOR}`
  }

  let [borderWidth, borderStyle, borderColor] = border?.split(' ') || []

  borderWidth = getStyleValue($elem, 'border-width') || borderWidth // border 宽度
  if (!borderWidth) { borderWidth = dataBorderWidth }
  if (!borderWidth) { borderWidth = borderAttr }
  if (borderWidth) {
    tableNode.borderWidth = convertPtToPx(borderWidth.trim())
  }
  if (!tableNode.borderWidth || tableNode.borderWidth === 'none') {
    tableNode.borderWidth = '1px'
  }

  borderStyle = getStyleValue($elem, 'border-style') || borderStyle // border 样式
  if (!borderStyle) { borderStyle = dataBorderLine }
  if (!borderStyle) { borderStyle = borderStyleFromClass }
  if (borderStyle) {
    tableNode.borderStyle = borderStyle === 'none' ? '' : borderStyle
  }
  if (!tableNode.borderStyle || tableNode.borderStyle === 'none') {
    tableNode.borderStyle = 'solid'
  }

  borderColor = getStyleValue($elem, 'border-color') || borderColor // border 颜色
  if (!borderColor) { borderColor = borderColorAttr }
  if (!borderColor) { borderColor = dataBorderColor }
  if (borderColor) {
    tableNode.borderColor = borderColor
  }
  if (!tableNode.borderColor || tableNode.borderColor === 'none') {
    tableNode.borderColor = `${DEFAULT_BORDER_COLOR}`
  }

  // 解析 per-side border（如 border-top: .5pt solid #000000）
  const borderTopRaw = getStyleValue($elem, 'border-top')

  if (borderTopRaw) {
    tableNode.borderTop = convertPtToPx(borderTopRaw)
  }

  const borderRightRaw = getStyleValue($elem, 'border-right')

  if (borderRightRaw) {
    tableNode.borderRight = convertPtToPx(borderRightRaw)
  }

  const borderBottomRaw = getStyleValue($elem, 'border-bottom')

  if (borderBottomRaw) {
    tableNode.borderBottom = convertPtToPx(borderBottomRaw)
  }

  const borderLeftRaw = getStyleValue($elem, 'border-left')

  if (borderLeftRaw) {
    tableNode.borderLeft = convertPtToPx(borderLeftRaw)
  }

  let textAlign = getStyleValue($elem, 'text-align')

  textAlign = getStyleValue($elem, 'text-align') || textAlign // 文本 对齐
  if (!textAlign) { textAlign = $elem.attr('align') || '' }
  if (!textAlign) { textAlign = $elem.attr('data-w-e-text-align') || '' }
  if (textAlign) {
    tableNode.textAlign = textAlign
  }

  // 解析字体样式属性
  const color = getStyleValue($elem, 'color')

  if (color) {
    tableNode.color = color
  }

  const fontWeight = getStyleValue($elem, 'font-weight')

  if (fontWeight) {
    tableNode.fontWeight = fontWeight
  }

  const fontSize = getStyleValue($elem, 'font-size')

  if (fontSize) {
    tableNode.fontSize = fontSize
  }

  const fontFamily = getStyleValue($elem, 'font-family')

  if (fontFamily) {
    tableNode.fontFamily = fontFamily
  }

  const fontStyle = getStyleValue($elem, 'font-style')

  if (fontStyle) {
    tableNode.fontStyle = fontStyle
  }

  const textDecoration = getStyleValue($elem, 'text-decoration')

  if (textDecoration) {
    tableNode.textDecoration = textDecoration
  }

  let verticalAlign = getStyleValue($elem, 'vertical-align')

  if (!verticalAlign) { verticalAlign = $elem.attr('valign') || '' }
  if (!verticalAlign) { verticalAlign = $elem.attr('data-w-e-vertical-align') || '' }
  if (verticalAlign) {
    tableNode.verticalAlign = verticalAlign
  }

  return node
}
