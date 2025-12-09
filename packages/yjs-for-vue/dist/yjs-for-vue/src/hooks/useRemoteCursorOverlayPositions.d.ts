import type { IDomEditor } from '@wangeditor-next/editor';
import { CursorState } from '@wangeditor-next/yjs';
import type { BaseRange, NodeMatch, Text } from 'slate';
import { type Ref, type ShallowRef } from 'vue';
import type { CaretPosition, OverlayPosition, SelectionRect } from '../utils/getOverlayPosition';
export type CursorOverlayData<TCursorData extends Record<string, unknown>> = CursorState<TCursorData> & {
    range: BaseRange | null;
    caretPosition: CaretPosition | null;
    selectionRects: SelectionRect[];
};
export type UseRemoteCursorOverlayPositionsOptions<T extends HTMLElement> = {
    shouldGenerateOverlay?: NodeMatch<Text>;
    editorRef?: ShallowRef<IDomEditor | undefined>;
} & {
    containerRef?: Ref<T | undefined>;
    refreshOnResize?: boolean | 'debounced';
};
export declare function useRemoteCursorOverlayPositions<TCursorData extends Record<string, unknown>, TContainer extends HTMLElement = HTMLDivElement>({ containerRef, shouldGenerateOverlay, editorRef, ...opts }: UseRemoteCursorOverlayPositionsOptions<TContainer>): {
    cursors: import("vue").ComputedRef<(CursorState<TCursorData> & {
        range: BaseRange | null;
    } & OverlayPosition)[]>;
    refresh: () => void;
};
