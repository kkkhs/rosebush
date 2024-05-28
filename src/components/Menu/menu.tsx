import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
  /**
   * 默认 active 的菜单项的索引值
   */
  defaultIndex?: string
  className?: string
  /**
   * 菜单类型 横向或者纵向
   */
  mode?: MenuMode
  style?: React.CSSProperties
  /**
   * 点击菜单项触发的回掉函数
   */
  onSelect?: (selectedIndex: string) => void
  /**
   * 设置子菜单的默认打开 只在纵向模式下生效
   */
  defaultOpenSubMenus?: string[]
  children?: React.ReactNode
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

// 创建 context
export const MenuContext = createContext<IMenuContext>({ index: '0' })

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ```javascript
 * import { Menu } from 'rosebush'
 *
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
const Menu: React.FC<MenuProps> = ({
  className,
  mode = 'horizontal',
  style,
  children,
  defaultIndex = '0',
  onSelect,
  defaultOpenSubMenus = [],
}) => {
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('rose-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  // context 传递的数据
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    // 遍历每个Menu的子元素判断是否为MenuItem
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(), // 使用React.cloneElement 自动赋值index
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
