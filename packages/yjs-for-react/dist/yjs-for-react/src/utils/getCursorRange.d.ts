import { CursorEditor, CursorState } from '@wangeditor-next/yjs';
import { BaseRange } from 'slate';
export declare function getCursorRange<TCursorData extends Record<string, unknown> = Record<string, unknown>>(editor: CursorEditor<TCursorData>, cursorState: CursorState<TCursorData>): BaseRange | null;
