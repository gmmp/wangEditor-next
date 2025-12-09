/**
 * @description link-card element
 * @author wangfupeng
 */
import { SlateText } from '@wangeditor-next/editor';
type EmptyText = {
    text: '';
};
export type LinkCardElement = {
    type: 'link-card';
    title: string;
    link: string;
    iconImgSrc?: string;
    children: EmptyText[];
};
export type LinkElement = {
    type: 'link';
    url: string;
    target?: string;
    children: SlateText[];
};
export {};
