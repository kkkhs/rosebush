import React, { createContext, useState } from 'react';
import classNames from 'classnames';
// 创建 context
export var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ```javascript
 * import { Menu } from 'rosebush'
 *
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
var Menu = function (_a) {
    var className = _a.className, _b = _a.mode, mode = _b === void 0 ? 'horizontal' : _b, style = _a.style, children = _a.children, _c = _a.defaultIndex, defaultIndex = _c === void 0 ? '0' : _c, onSelect = _a.onSelect, _d = _a.defaultOpenSubMenus, defaultOpenSubMenus = _d === void 0 ? [] : _d;
    var _e = useState(defaultIndex), currentActive = _e[0], setActive = _e[1];
    var classes = classNames('rose-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    // context 传递的数据
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        // 遍历每个Menu的子元素判断是否为MenuItem
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(), // 使用React.cloneElement 自动赋值index
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
export default Menu;
