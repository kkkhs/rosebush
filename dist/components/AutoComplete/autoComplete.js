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
import React, { useEffect, useState, useRef, } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'rosebush-react'
 * ~~~
 */
export var AutoComplete = function (_a) {
    var fetchSuggestions = _a.fetchSuggestions, onSelect = _a.onSelect, onChange = _a.onChange, value = _a.value, renderOption = _a.renderOption, restProps = __rest(_a, ["fetchSuggestions", "onSelect", "onChange", "value", "renderOption"]);
    var _b = useState(value), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState([]), suggestions = _c[0], setSuggestions = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var _f = useState(-1), highlightIndex = _f[0], setHighlightIndex = _f[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    // 搜索框 onChange 时发生
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            setSuggestions([]);
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                // 如果是Primise请求在 then 中处理
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                // 普通请求直接处理
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    // 键盘互动的下标变化处理
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    // 支持键盘互动功能
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // enter
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // 上
                console.log(e.key);
                highlight(highlightIndex - 1);
                break;
            case 40: // 下
                highlight(highlightIndex + 1);
                break;
            case 27: // esc
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    // 处理是否传入自定义模板样式
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            var cnames = classNames('suggestion-item', {
                'item-highlighted': index === highlightIndex,
            });
            return (React.createElement(Transition, { key: index, in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () {
                    setSuggestions([]);
                } },
                React.createElement("ul", { className: "rose-suggestion-list" },
                    loading && (React.createElement("div", { className: "suggstions-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true }))),
                    suggestions.map(function (item, index) {
                        var cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex,
                        });
                        return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                    }))));
        })));
    };
    return (React.createElement("div", { className: "rose-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
