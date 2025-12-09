/**
 * @description render elem
 * @author wangfupeng
 */
import { IDomEditor, SlateElement } from '@wangeditor-next/editor';
import { VNode } from 'snabbdom';
declare function renderFormula(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode;
declare const conf: {
    type: string;
    renderElem: typeof renderFormula;
};
export default conf;
