var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import classNames from 'classnames';
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，同时支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'rosebush'
 * ```
 *
 * ### 组件展示
 */
var Button = function (_a) {
    var _b;
    var _c = _a.btnType, btnType = _c === void 0 ? 'default' : _c, className = _a.className, _d = _a.disabled, disabled = _d === void 0 ? false : _d, size = _a.size, children = _a.children, href = _a.href, restProps = __rest(_a, ["btnType", "className", "disabled", "size", "children", "href"]);
    // btn, btn-lg, btn-primary
    var classes = classNames('btn', className, (_b = {},
        _b["btn-".concat(btnType)] = btnType,
        _b["btn-".concat(size)] = size,
        _b.disabled = btnType === 'link' && disabled,
        _b));
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
    }
};
export default Button;
