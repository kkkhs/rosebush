import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * 是否禁用 Input
     */
    disabled?: boolean;
    /**
     * 设置 input 大小，支持 lg 或者是 sm
     */
    size?: InputSize;
    /**
     * 添加图标，在右侧悬浮添加一个图标，用于提示
     */
    icon?: IconProp;
    /**
     * 添加前缀 用于配置一些固定组合
     */
    prepend?: string | React.ReactElement;
    /**
     * 添加后缀 用于配置一些固定组合
     */
    append?: string | React.ReactElement;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ### 引用方式
 * ~~~js
 * import { Input } from 'rosebush'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 *
 * ### 组件展示
 */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
