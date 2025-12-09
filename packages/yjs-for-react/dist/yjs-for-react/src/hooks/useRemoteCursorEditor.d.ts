import { IDomEditor } from '@wangeditor-next/editor';
import { CursorEditor } from '@wangeditor-next/yjs';
export declare function useRemoteCursorEditor<TCursorData extends Record<string, unknown> = Record<string, unknown>>(): CursorEditor<TCursorData> & IDomEditor;
