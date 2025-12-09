/**
 * @description image float base class
 * @author cycleccc
 */
import { IButtonMenu, IDomEditor } from '@wangeditor-next/editor';
declare abstract class ImageFloatBaseClass implements IButtonMenu {
    abstract readonly title: string;
    abstract readonly iconSvg: string;
    abstract readonly value: string;
    readonly tag = "button";
    getValue(_editor: IDomEditor): string | boolean;
    isActive(_editor: IDomEditor): boolean;
    private getSelectedNode;
    isDisabled(editor: IDomEditor): boolean;
    exec(editor: IDomEditor, _value: string | boolean): void;
}
export default ImageFloatBaseClass;
