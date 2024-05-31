/***
 * 1 点击 关闭 整个元素消失
   2 ⽀持四种主题颜⾊
     export type AlertType = ‘success’ | ‘default’ | ‘danger’ | 'warning’
   3 可以包含标题和内容，解释更详细的警告
   4 右侧是否显⽰关闭按钮可配置
 */
import classNames from 'classnames';
import React, { useState } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'rosebush-react'
 * ~~~
 */
var Alert = function (_a) {
    var _b;
    var _c = _a.type, type = _c === void 0 ? 'default' : _c, title = _a.title, description = _a.description, _d = _a.showClose, showClose = _d === void 0 ? true : _d, onClose = _a.onClose;
    var _e = useState(false), hide = _e[0], setHide = _e[1];
    var classes = classNames('rose-alert', (_b = {},
        _b["rose-alert-".concat(type)] = type,
        _b));
    var titleClass = classNames('rose-alert-title', {
        'bold-title': description,
    });
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setHide(true); // 隐藏 alert
    };
    if (hide) {
        return null;
    }
    return (React.createElement(Transition, { in: !hide, timeout: 300, animation: "zoom-in-right" },
        React.createElement("div", { className: classes },
            React.createElement("span", { className: titleClass }, title),
            description && React.createElement("p", { className: "rose-alert-desc" }, description),
            showClose && (React.createElement("span", { className: "rose-alert-close", onClick: handleClose },
                React.createElement(Icon, { icon: 'close' }))))));
};
export default Alert;
