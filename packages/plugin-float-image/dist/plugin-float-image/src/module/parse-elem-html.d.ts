/**
 * @description parse elem html
 * @author cycleccc
 */
import { IDomEditor, SlateDescendant } from '@wangeditor-next/editor';
import { DOMElement } from '../utils/dom';
import { ImageElement } from './custom-types';
declare function parseHtml(elem: DOMElement, _children: SlateDescendant[], _editor: IDomEditor): ImageElement;
export declare const parseHtmlConf: {
    selector: string;
    parseElemHtml: typeof parseHtml;
};
export {};
