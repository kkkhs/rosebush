import type { Meta, StoryObj } from '@storybook/react'

import Menu from './menu'
import MenuItem from './menuItem'
import { fn } from '@storybook/test'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: { onSelect: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalMenu: Story = {
  args: {
    mode: 'horizontal',
    children: <MenuItem>this is MenuItem</MenuItem>,
  },
}

export const VerticalMenu: Story = {
  args: {
    mode: 'vertical',
    children: <MenuItem>this is MenuItem</MenuItem>,
  },
}
