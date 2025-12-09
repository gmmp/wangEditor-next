/**
 * @description editor 插件，重写 editor API
 * @author cycleccc
 */
import { IDomEditor } from '@wangeditor-next/editor';
declare function withImage<T extends IDomEditor>(editor: T): T;
export default withImage;
