import type { IDomEditor } from '@wangeditor-next/editor';
import { type ShallowRef } from 'vue';
export interface EditorContext {
    editor: ShallowRef<IDomEditor | undefined>;
}
export declare function provideEditor(editorRef: ShallowRef<IDomEditor | undefined>): void;
export declare const useEditorStatic: () => ShallowRef<IDomEditor | undefined>;
