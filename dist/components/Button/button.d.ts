/// <reference types="react" />
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export interface BaseButtonProps {
    /**
     * 设置 Button 的内容
     */
    className?: string;
    /**
     * 设置 Button 的禁用
     */
    disabled?: boolean;
    /**
     * 设置 Button 的尺寸
     */
    size?: ButtonSize;
    /**
     * 设置 Button 的类型
     */
    btnType?: ButtonType;
    children?: React.ReactNode;
    /**
     * 设置 Link Button 的跳转链接
     */
    href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，同时支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'rosebush-react'
 * ```
 *
 * ### 组件展示
 */
declare const Button: ({ btnType, className, disabled, size, children, href, ...restProps }: ButtonProps) => import("react").JSX.Element;
export default Button;
