/**
 * @description DOM 操作
 * @author cycleccc
 */
import $, { Dom7Array } from 'dom7';
import DOMNode = globalThis.Node;
import DOMComment = globalThis.Comment;
import DOMElement = globalThis.Element;
import DOMText = globalThis.Text;
import DOMRange = globalThis.Range;
import DOMSelection = globalThis.Selection;
import DOMStaticRange = globalThis.StaticRange;
export { Dom7Array } from 'dom7';
export declare function getStyleValue($elem: Dom7Array, styleKey: string): string;
export default $;
export { DOMComment, DOMElement, DOMNode, DOMRange, DOMSelection, DOMStaticRange, DOMText, };
