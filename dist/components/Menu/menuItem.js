import classNames from 'classnames';
import { MenuContext } from './menu';
import { useContext } from 'react';
var MenuItem = function (_a) {
    var index = _a.index, disabled = _a.disabled, className = _a.className, style = _a.style, children = _a.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
