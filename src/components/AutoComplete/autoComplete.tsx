import { ChangeEvent, useEffect, useState } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'

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
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => React.ReactElement
}

export const AutoComplete = ({
  fetchSuggestions,
  onSelect,
  value,
  renderOption,
  ...restProps
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedValue) {
      const result = fetchSuggestions(debouncedValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
  }, [debouncedValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="rose-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
          ...loading
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
