import { Descendant, Element } from 'slate'
import { VNode } from 'snabbdom'

import { addVnodeStyle } from '../utils/vdom'
import { TableCellElement, TableCellProperty } from './custom-types'

/**
 * 添加样式
 * @param node slate elem
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  if (!Element.isElement(node)) { return vnode }

  const {
    backgroundColor, borderWidth, borderStyle, borderColor, textAlign,
    borderTop, borderRight, borderBottom, borderLeft,
    color, fontWeight, fontSize, fontFamily, fontStyle, textDecoration,
    verticalAlign,
  } = node as TableCellElement

  const props: TableCellProperty = {}

  if (backgroundColor) { props.backgroundColor = backgroundColor }
  if (borderWidth) {
    const pureNumericRegex = /^\d+(\.\d+)?$/

    if (pureNumericRegex.test(borderWidth)) {
      // 增加一层校验，如果是纯数字则增加px的后缀："123"、"123.333"
      props.borderWidth = `${borderWidth}px`
    } else {
      props.borderWidth = borderWidth
    }
  }
  if (borderStyle) { props.borderStyle = borderStyle === 'none' ? '' : borderStyle }
  if (borderColor) { props.borderColor = borderColor }
  if (textAlign) { props.textAlign = textAlign }

  // 处理 per-side border
  if (borderTop) { props.borderTop = borderTop }
  if (borderRight) { props.borderRight = borderRight }
  if (borderBottom) { props.borderBottom = borderBottom }
  if (borderLeft) { props.borderLeft = borderLeft }

  // 处理字体样式属性
  if (color) { props.color = color }
  if (fontWeight) { props.fontWeight = fontWeight }
  if (fontSize) {
    const pureNumericRegex = /^\d+(\.\d+)?$/

    if (pureNumericRegex.test(fontSize)) {
      // 如果是纯数字则增加px的后缀
      props.fontSize = `${fontSize}px`
    } else {
      props.fontSize = fontSize
    }
  }
  if (fontFamily) { props.fontFamily = fontFamily }
  if (fontStyle) { props.fontStyle = fontStyle }
  if (textDecoration) { props.textDecoration = textDecoration }
  if (verticalAlign) { props.verticalAlign = verticalAlign }

  const styleVnode: VNode = vnode

  if (node.type === 'table') {
    addVnodeStyle((styleVnode.children?.[0] as VNode).children?.[0] as VNode, props)
  } else {
    addVnodeStyle(styleVnode, props)
  }
  return styleVnode
}
