import { ChangeEvent, useState } from 'react'
import Input, { InputProps } from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[]
  onSelect?: (item: string) => void
}

export const AutoComplete = ({
  fetchSuggestions,
  onSelect,
  value,
  ...restProps
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const result = fetchSuggestions(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }

  const handleClick = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleClick(item)}>
              {item}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="rose-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
