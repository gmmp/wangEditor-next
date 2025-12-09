import type { IDomEditor } from '@wangeditor-next/editor';
import { Path, Range as SlateRange, Text } from 'slate';
export type SelectionRect = {
    width: number;
    height: number;
    top: number;
    left: number;
};
export type CaretPosition = {
    height: number;
    top: number;
    left: number;
};
export type OverlayPosition = {
    caretPosition: CaretPosition | null;
    selectionRects: SelectionRect[];
};
export type GetSelectionRectsOptions = {
    xOffset: number;
    yOffset: number;
    shouldGenerateOverlay?: (node: Text, path: Path) => boolean;
};
export declare function getOverlayPosition(editor: IDomEditor, range: SlateRange, { yOffset, xOffset, shouldGenerateOverlay }: GetSelectionRectsOptions): OverlayPosition;
