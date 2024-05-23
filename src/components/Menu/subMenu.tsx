import { FunctionComponentElement, useContext } from 'react'
import { MenuContext } from './menu'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import React from 'react'

export interface subMenuProps {
  index?: number
  title?: string
  className?: string
  children?: React.ReactNode
}

const SubMenu: React.FC<subMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  })

  const renderChildren = () => {
    // 遍历每个subMenu的子元素判断是否为MenuItem
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component'
        )
      }
    })
    return <ul className="rose-submenu">{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
