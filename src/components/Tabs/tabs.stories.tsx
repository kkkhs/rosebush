import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './tabs'
import TabItem from './tabItem'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    source: {
      type: 'code',
    },
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const LineTabs: Story = () => {
  return (
    <Tabs>
      <TabItem label={'card-1'}>default TabItem111</TabItem>
      <TabItem label={'card-2'}>default TabItem222</TabItem>
      <TabItem label={'card-3'}>default TabItem333</TabItem>
    </Tabs>
  )
}
LineTabs.storyName = '默认的 Tabs'

export const CardTabs: Story = () => {
  return (
    <Tabs type="card">
      <TabItem label={'card-1'}>card TabItem111</TabItem>
      <TabItem label={'card-2'}>card TabItem222</TabItem>
      <TabItem label={'card-3'}>card TabItem333</TabItem>
    </Tabs>
  )
}
CardTabs.storyName = '卡片样式的 Tabs'

export const LineDisabledTabs: Story = () => {
  return (
    <Tabs>
      <TabItem label={'card-1'}>default TabItem111</TabItem>
      <TabItem label={'card-2'} disabled>
        default TabItem222
      </TabItem>
      <TabItem label={'card-3'}>default TabItem333</TabItem>
    </Tabs>
  )
}
LineDisabledTabs.storyName = '带禁止的 Tabs'
