import { CursorState } from '@wangeditor-next/yjs';
import { RefObject } from 'react';
import { BaseRange, NodeMatch, Text } from 'slate';
import { CaretPosition, SelectionRect } from '../utils/getOverlayPosition';
export type UseRemoteCursorOverlayPositionsOptions<T extends HTMLElement> = {
    shouldGenerateOverlay?: NodeMatch<Text>;
} & ({
    containerRef?: undefined;
} | {
    containerRef: RefObject<T>;
    refreshOnResize?: boolean | 'debounced';
});
export type CursorOverlayData<TCursorData extends Record<string, unknown>> = CursorState<TCursorData> & {
    range: BaseRange | null;
    caretPosition: CaretPosition | null;
    selectionRects: SelectionRect[];
};
export declare function useRemoteCursorOverlayPositions<TCursorData extends Record<string, unknown>, TContainer extends HTMLElement = HTMLDivElement>({ containerRef, shouldGenerateOverlay, ...opts }?: UseRemoteCursorOverlayPositionsOptions<TContainer>): readonly [any, any];
