import { CursorState } from '@wangeditor-next/yjs';
import { Store } from '../types';
export type CursorStore<TCursorData extends Record<string, unknown> = Record<string, unknown>> = Store<Record<string, CursorState<TCursorData>>>;
export declare function useRemoteCursorStateStore<TCursorData extends Record<string, unknown> = Record<string, unknown>>(): CursorStore<TCursorData>;
