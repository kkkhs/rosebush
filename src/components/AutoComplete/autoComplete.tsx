import { ChangeEvent, useEffect, useState, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition/transition'

// 来源数据的类型
interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps
  extends Omit<InputProps, 'onSelect' | 'onChange'> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /**
   * 点击选中建议项时触发的回调
   */
  onSelect?: (item: DataSourceType) => void
  /**
   * 文本框发生改变的时候触发的事件
   */
  onChange?: (value: string) => void
  /**
   * 支持自定义渲染下拉项，返回 ReactElement
   */
  renderOption?: (item: DataSourceType) => React.ReactElement
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'rosebush'
 * ~~~
 */
export const AutoComplete = ({
  fetchSuggestions,
  onSelect,
  onChange,
  value,
  renderOption,
  ...restProps
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  // 搜索框 onChange 时发生
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        // 如果是Primise请求在 then 中处理
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        // 普通请求直接处理
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  // 键盘互动的下标变化处理
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  // 支持键盘互动功能
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // enter
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: // 上
        console.log(e.key)
        highlight(highlightIndex - 1)
        break
      case 40: // 下
        highlight(highlightIndex + 1)
        break
      case 27: // esc
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (onChange) {
      onChange(value)
    }
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  // 处理是否传入自定义模板样式
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'item-highlighted': index === highlightIndex,
          })
          return (
            <Transition
              in={showDropdown || loading}
              animation="zoom-in-top"
              timeout={300}
              onExited={() => {
                setSuggestions([])
              }}
            >
              <ul className="rose-suggestion-list">
                {loading && (
                  <div className="suggstions-loading-icon">
                    <Icon icon="spinner" spin />
                  </div>
                )}
                {suggestions.map((item, index) => {
                  const cnames = classNames('suggestion-item', {
                    'is-active': index === highlightIndex,
                  })
                  return (
                    <li
                      key={index}
                      className={cnames}
                      onClick={() => handleSelect(item)}
                    >
                      {renderTemplate(item)}
                    </li>
                  )
                })}
              </ul>
            </Transition>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="rose-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
