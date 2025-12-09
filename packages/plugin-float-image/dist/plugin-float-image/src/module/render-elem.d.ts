/**
 * @description image render elem
 * @author wangfupeng
 */
import { IDomEditor, SlateElement } from '@wangeditor-next/editor';
import { VNode } from 'snabbdom';
declare function renderImage(elemNode: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode;
declare const renderImageConf: {
    type: string;
    renderElem: typeof renderImage;
};
export { renderImageConf };
