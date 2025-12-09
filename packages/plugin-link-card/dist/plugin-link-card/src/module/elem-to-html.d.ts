/**
 * @description elem to html
 * @author wangfupeng
 */
import { SlateElement } from '@wangeditor-next/editor';
declare function linkCardToHtml(elem: SlateElement, _childrenHtml: string): string;
declare const conf: {
    type: string;
    elemToHtml: typeof linkCardToHtml;
};
export default conf;
