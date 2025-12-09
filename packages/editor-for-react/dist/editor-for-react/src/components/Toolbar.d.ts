/**
 * @description toolbar react component
 * @author wangfupeng
 */
import * as wangEditor from '@wangeditor-next/editor';
interface IProps {
    editor: wangEditor.IDomEditor | null;
    defaultConfig?: Partial<wangEditor.IToolbarConfig>;
    mode?: string;
    style?: object;
    className?: string;
}
declare function ToolbarComponent(props: IProps): any;
export default ToolbarComponent;
