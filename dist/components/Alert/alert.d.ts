/***
 * 1 点击 关闭 整个元素消失
   2 ⽀持四种主题颜⾊
     export type AlertType = ‘success’ | ‘default’ | ‘danger’ | 'warning’
   3 可以包含标题和内容，解释更详细的警告
   4 右侧是否显⽰关闭按钮可配置
 */
import { FC } from 'react';
export type AlertType = 'success' | 'default' | 'danger' | 'warning';
export interface AlertProps {
    /**
     * 标题
     * */
    title: string;
    /**
     * 类型 四种可选 针对四种不同的场景
     * */
    type?: AlertType;
    /**
     * 描述
     * */
    description?: string;
    /**
     * 是否显示关闭图标
     * */
    showClose?: boolean;
    /**
     * 关闭alert时触发的事件
     * */
    onClose?: () => void;
}
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'rosebush'
 * ~~~
 */
declare const Alert: FC<AlertProps>;
export default Alert;
