/**
 * @description plugin
 * @author wangfupeng
 */
import { IDomEditor } from '@wangeditor-next/editor';
declare function withMarkdown<T extends IDomEditor>(editor: T): T;
export default withMarkdown;
