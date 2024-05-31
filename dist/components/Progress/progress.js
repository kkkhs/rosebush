var Progress = function (_a) {
    var percent = _a.percent, _b = _a.strokeHeight, strokeHeight = _b === void 0 ? 15 : _b, _c = _a.showText, showText = _c === void 0 ? true : _c, styles = _a.styles, _d = _a.theme, theme = _d === void 0 ? 'primary' : _d;
    return (React.createElement("div", { className: "rose-progress-bar", style: styles },
        React.createElement("div", { className: "rose-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } },
            React.createElement("div", { className: "rose-progress-bar-inner color-".concat(theme, " "), style: { width: "".concat(percent, "%") } }, showText && React.createElement("span", { className: "inner-text" }, "".concat(percent, "%"))))));
};
export default Progress;
