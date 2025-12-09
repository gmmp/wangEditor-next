import { Range } from 'slate';
import { Awareness } from 'y-protocols/awareness';
import { RelativeRange } from '../module/custom-types';
import { YjsEditor } from './withYjs';
export type CursorStateChangeEvent = {
    added: number[];
    updated: number[];
    removed: number[];
};
export type RemoteCursorChangeEventListener = (event: CursorStateChangeEvent) => void;
export type CursorState<TCursorData extends Record<string, unknown> = Record<string, unknown>> = {
    relativeSelection: RelativeRange | null;
    data?: TCursorData;
    clientId: number;
};
export type CursorEditor<TCursorData extends Record<string, unknown> = Record<string, unknown>> = YjsEditor & {
    awareness: Awareness;
    cursorDataField: string;
    selectionStateField: string;
    sendCursorPosition: (range: Range | null) => void;
    sendCursorData: (data: TCursorData) => void;
};
export declare const CursorEditor: {
    isCursorEditor(value: unknown): value is CursorEditor;
    sendCursorPosition<TCursorData extends Record<string, unknown>>(editor: CursorEditor<TCursorData>, range?: Range | null): void;
    sendCursorData<TCursorData extends Record<string, unknown>>(editor: CursorEditor<TCursorData>, data: TCursorData): void;
    on<TCursorData extends Record<string, unknown>>(editor: CursorEditor<TCursorData>, event: "change", handler: RemoteCursorChangeEventListener): void;
    off<TCursorData extends Record<string, unknown>>(editor: CursorEditor<TCursorData>, event: "change", listener: RemoteCursorChangeEventListener): void;
    cursorState<TCursorData extends Record<string, unknown>>(editor: CursorEditor<TCursorData>, clientId: number): CursorState<TCursorData> | null;
    cursorStates<TCursorData extends Record<string, unknown>>(editor: CursorEditor<TCursorData>): Record<string, CursorState<TCursorData>>;
};
export type WithCursorsOptions<TCursorData extends Record<string, unknown> = Record<string, unknown>> = {
    cursorStateField?: string;
    cursorDataField?: string;
    data?: TCursorData;
    autoSend?: boolean;
};
export declare function withCursors<TCursorData extends Record<string, unknown>>(awareness: Awareness, options?: WithCursorsOptions<TCursorData>): <T extends YjsEditor>(editor: T) => T & CursorEditor<TCursorData>;
