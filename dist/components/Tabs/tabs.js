import classNames from 'classnames';
import React, { useState } from 'react';
/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'rosebush-react'
 * ~~~
 */
var Tabs = function (_a) {
    var _b = _a.defaultIndex, defaultIndex = _b === void 0 ? 0 : _b, onSelect = _a.onSelect, className = _a.className, style = _a.style, children = _a.children, _c = _a.type, type = _c === void 0 ? 'line' : _c;
    var _d = useState(defaultIndex), activeIndex = _d[0], setActiveIndex = _d[1];
    var handleClick = function (index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var navClass = classNames('rose-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    // 返回上方NavLinks
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled, className = _a.className, style = _a.style;
            var classes = classNames('rose-tabs-nav-item', className, {
                'is-active': activeIndex === index,
                disabled: disabled,
            });
            return (React.createElement("li", { className: classes, style: style, key: "nav-item-".concat(index), onClick: function () { return handleClick(index, disabled); } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: "rose-tabs ".concat(className), style: style },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("ul", { className: "rose-tabs-content" }, renderContent())));
};
export default Tabs;
