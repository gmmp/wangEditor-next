/**
 * @description editor react component
 * @author wangfupeng
 */
import { IDomEditor, IEditorConfig, SlateDescendant } from '@wangeditor-next/editor';
import React from 'react';
interface IProps {
    defaultContent?: SlateDescendant[];
    onCreated?: (editor: IDomEditor) => void;
    defaultHtml?: string;
    value?: string;
    onChange: (editor: IDomEditor) => void;
    defaultConfig: Partial<IEditorConfig>;
    mode?: string;
    style?: React.CSSProperties;
    className?: string;
}
declare function EditorComponent(props: Partial<IProps>): any;
export default EditorComponent;
