import type { Descendant, Editor, Element, Node } from 'slate';
import * as Y from 'yjs';
export type DeltaAttributes = {
    retain: number;
    attributes: Record<string, unknown>;
};
export type DeltaRetain = {
    retain: number;
};
export type DeltaDelete = {
    delete: number;
};
export type DeltaInsert = {
    insert: string | Y.XmlText;
    attributes?: Record<string, unknown>;
};
export type InsertDelta = Array<DeltaInsert>;
export type Delta = Array<DeltaRetain | DeltaDelete | DeltaInsert | DeltaAttributes>;
export type TextRange = {
    start: number;
    end: number;
};
export type HistoryStackItem = {
    meta: Map<string, unknown>;
};
export type YTarget = {
    textRange: TextRange;
    yParent: Y.XmlText;
    slateParent: Element | Editor;
    yTarget?: Y.XmlText;
    slateTarget?: Node;
    targetDelta: InsertDelta;
};
export type RelativeRange = {
    anchor: Y.RelativePosition;
    focus: Y.RelativePosition;
};
export type NodeElement = {
    type: string;
    children: Descendant[];
};
