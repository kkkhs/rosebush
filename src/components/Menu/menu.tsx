import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: number) => void

export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  children?: React.ReactNode
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallback
}

// 创建 context
export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = ({
  className,
  mode = 'horizontal',
  style,
  children,
  defaultIndex = 0,
  onSelect,
}) => {
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('rose-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  // context 传递的数据
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    // 遍历每个Menu的子元素判断是否为MenuItem
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index, // 使用React.cloneElement自动赋值index
        })
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        )
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
