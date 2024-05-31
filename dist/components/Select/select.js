var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, createContext, useRef, useEffect, } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
export var SelectContext = createContext({
    selectedValues: [],
});
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'roseship-react'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, children = props.children, multiple = props.multiple, name = props.name, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var input = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    var _a = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _a[0], setSelectedValues = _a[1];
    var _b = useState(false), menuOpen = _b[0], setOpen = _b[1];
    var _c = useState(typeof defaultValue === 'string' ? defaultValue : ''), value = _c[0], setValue = _c[1];
    var handleOptionClick = function (value, isSelected) {
        // update value
        if (!multiple) {
            setOpen(false);
            setValue(value);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
        else {
            setValue('');
        }
        var updatedValues = [value];
        // click again to remove selected when is multiple mode
        if (multiple) {
            updatedValues = isSelected
                ? selectedValues.filter(function (v) { return v !== value; })
                : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    useEffect(function () {
        // focus input
        if (input.current) {
            input.current.focus();
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = '';
            }
            else {
                if (placeholder)
                    input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current =
                containerRef.current.getBoundingClientRect().width;
        }
    });
    useClickOutside(containerRef, function () {
        setOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, {
                    index: "select-".concat(i),
                });
            }
            else {
                console.error('Warning: Select has a child which is not a Option component');
            }
        });
    };
    var containerClass = classNames('rose-select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple,
    });
    return (React.createElement("div", { className: containerClass, ref: containerRef },
        React.createElement("div", { className: "rose-select-input", onClick: handleClick },
            React.createElement(Input, { ref: input, placeholder: placeholder, value: value, readOnly: true, icon: "angle-down", disabled: disabled, name: name })),
        React.createElement(SelectContext.Provider, { value: passedContext },
            React.createElement(Transition, { in: menuOpen, animation: "zoom-in-top", timeout: 300 },
                React.createElement("ul", { className: "rose-select-dropdown" }, generateOptions()))),
        multiple && (React.createElement("div", { className: "rose-selected-tags", style: { maxWidth: containerWidth.current - 32 } }, selectedValues.map(function (value, index) {
            return (React.createElement("span", { className: "rose-tag", key: "tag-".concat(index) },
                value,
                React.createElement(Icon, { icon: "times", onClick: function () {
                        handleOptionClick(value, true);
                    } })));
        })))));
};
Select.defaultProps = {
    name: 'rose-select',
    placeholder: '请选择',
};
export default Select;
