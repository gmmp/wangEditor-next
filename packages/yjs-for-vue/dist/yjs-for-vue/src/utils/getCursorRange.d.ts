import type { CursorState } from '@wangeditor-next/yjs';
import { CursorEditor } from '@wangeditor-next/yjs';
import type { BaseRange } from 'slate';
export declare function getCursorRange<TCursorData extends Record<string, unknown> = Record<string, unknown>>(editor: CursorEditor<TCursorData>, cursorState: CursorState<TCursorData>): BaseRange | null;
