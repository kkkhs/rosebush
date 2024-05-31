import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

// 将子组件作为属性赋值
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
