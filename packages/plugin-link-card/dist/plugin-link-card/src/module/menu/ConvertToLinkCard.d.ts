/**
 * @description convert link elem to link-card
 * @author wangfupeng
 */
import { IButtonMenu, IDomEditor } from '@wangeditor-next/editor';
declare class ConvertToLinkCard implements IButtonMenu {
    readonly title: string;
    readonly iconSvg = "";
    readonly tag = "button";
    private getSelectedLinkElem;
    getValue(_editor: IDomEditor): string | boolean;
    isActive(_editor: IDomEditor): boolean;
    isDisabled(editor: IDomEditor): boolean;
    exec(editor: IDomEditor, _value: string | boolean): Promise<void>;
}
export default ConvertToLinkCard;
