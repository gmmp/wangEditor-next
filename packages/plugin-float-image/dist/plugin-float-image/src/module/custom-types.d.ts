/**
 * @description float-image element
 * @author cycleccc
 */
type EmptyText = {
    text: '';
};
export type ImageStyle = {
    width?: string;
    height?: string;
    float?: string;
};
export type ImageElement = {
    type: 'image';
    src: string;
    alt?: string;
    href?: string;
    width?: string;
    height?: string;
    style?: ImageStyle;
    children: EmptyText[];
};
export {};
