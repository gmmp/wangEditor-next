/**
 * @description menu config
 * @author wangfupeng
 */
export declare function genConvertToLinkCardConfig(): {
    /**
     * 异步获取 link-card 信息（可能需要在服务端获取）
     * @param linkText link text
     * @param linkUrl link url
     * @returns link-card info
     */
    getLinkCardInfo(linkText: string, _linkUrl: string): Promise<{
        title: string;
        iconImgSrc: string;
    }>;
};
