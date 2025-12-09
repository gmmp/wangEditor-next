/**
 * @description elem to html
 * @author wangfupeng
 */
import { SlateElement } from '@wangeditor-next/editor';
declare function formulaToHtml(elem: SlateElement, _childrenHtml: string): string;
declare const conf: {
    type: string;
    elemToHtml: typeof formulaToHtml;
};
export default conf;
