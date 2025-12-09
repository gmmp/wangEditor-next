import type { IDomEditor } from '@wangeditor-next/editor';
import type { CursorState } from '@wangeditor-next/yjs';
import { type ShallowRef } from 'vue';
export declare const useRemoteCursorStates: <TCursorData extends Record<string, unknown>>(editorRef: ShallowRef<IDomEditor | undefined>) => {
    cursors: import("vue").Ref<Record<string, CursorState<TCursorData>>, Record<string, CursorState<TCursorData>>>;
};
