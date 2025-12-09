/**
 * @description menu index
 * @author wangfupeng
 */
import ConvertToLinkCard from './ConvertToLinkCard';
export declare const convertToLinkCardMenuConf: {
    key: string;
    factory(): ConvertToLinkCard;
    config: {
        getLinkCardInfo(linkText: string, _linkUrl: string): Promise<{
            title: string;
            iconImgSrc: string;
        }>;
    };
};
