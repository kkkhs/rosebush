/// <reference types="react" />
export interface TabsItemProps {
    /** Tab选项上面的文字 */
    label: string | React.ReactElement;
    /** Tab选项是否被禁用 */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const TabItem: React.FC<TabsItemProps>;
export default TabItem;
