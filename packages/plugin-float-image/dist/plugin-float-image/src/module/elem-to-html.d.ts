/**
 * @description elem to html
 * @author cycleccc
 */
import { SlateElement } from '@wangeditor-next/editor';
declare function imageToHtml(elem: SlateElement, _childrenHtml: string): string;
declare const conf: {
    type: string;
    elemToHtml: typeof imageToHtml;
};
export default conf;
