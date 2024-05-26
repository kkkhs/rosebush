import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './tabs'
import TabItem from './tabItem'
import { fn } from '@storybook/test'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // args: { onSelect: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const LineTabs: Story = {
  args: {
    type: 'line',
    children: <TabItem label={'card-1'}>this is TabItem</TabItem>,
  },
}

export const CardTabs: Story = {
  args: {
    type: 'card',
    children: <TabItem label={'card-1'}>this is TabItem</TabItem>,
  },
}
