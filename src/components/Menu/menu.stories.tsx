import type { Meta, StoryObj } from '@storybook/react'

import Menu from './menu'
import MenuItem from './menuItem'
import { fn } from '@storybook/test'
import SubMenu from './subMenu'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  id: 'Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    source: {
      type: 'code',
    },
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: { onSelect: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const DfaultMenu: Story = () => {
  return (
    <Menu>
      <MenuItem>this is MenuItem1</MenuItem>
      <MenuItem>this is MenuItem2</MenuItem>
      <MenuItem>this is MenuItem3</MenuItem>
    </Menu>
  )
}
DfaultMenu.storyName = '默认的 Menu'

export const VerticalMenu: Story = () => {
  return (
    <Menu mode="vertical">
      <MenuItem>this is MenuItem1</MenuItem>
      <MenuItem>this is MenuItem2</MenuItem>
      <MenuItem>this is MenuItem3</MenuItem>
    </Menu>
  )
}

VerticalMenu.storyName = '竖直方向的 Menu'

export const HorizontalMenu: Story = () => {
  return (
    <Menu>
      <MenuItem>this is MenuItem1</MenuItem>
      <MenuItem disabled>this is disabled</MenuItem>
      <MenuItem>this is MenuItem3</MenuItem>
    </Menu>
  )
}
HorizontalMenu.storyName = '禁止的 Menu'

export const HorizontalSubMenu: Story = () => {
  return (
    <Menu>
      <SubMenu title="this is SubMenu">
        <MenuItem>SubMenuItem1</MenuItem>
        <MenuItem>SubMenuItem1</MenuItem>
      </SubMenu>
      <MenuItem disabled>this is disabled</MenuItem>
      <MenuItem>this is MenuItem</MenuItem>
    </Menu>
  )
}
HorizontalSubMenu.storyName = '带下拉菜单的 Menu'

export const VerticalSubMenu: Story = () => {
  return (
    <Menu mode="vertical">
      <SubMenu title="this is SubMenu">
        <MenuItem>SubMenuItem1</MenuItem>
        <MenuItem>SubMenuItem1</MenuItem>
      </SubMenu>
      <MenuItem disabled>this is disabled</MenuItem>
      <MenuItem>this is MenuItem</MenuItem>
    </Menu>
  )
}
VerticalSubMenu.storyName = '竖直带下拉菜单的 Menu'
