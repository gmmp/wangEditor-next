/**
 * @description render elem
 * @author wangfupeng
 */
import { IDomEditor, SlateElement } from '@wangeditor-next/editor';
import { VNode } from 'snabbdom';
declare function renderLinkCard(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode;
declare const conf: {
    type: string;
    renderElem: typeof renderLinkCard;
};
export default conf;
