import type { Meta, StoryObj } from '@storybook/react'

import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultButton: Story = {
  args: {
    btnType: 'default',
    children: 'Default Button',
  },
}

export const PrimiryButton: Story = {
  args: {
    btnType: 'primary',
    children: 'Primiry Button',
  },
}

export const DangerButton: Story = {
  args: {
    btnType: 'danger',
    children: 'Primiry Button',
  },
}

export const LinkButton: Story = {
  args: {
    btnType: 'link',
    href: 'http://www.baidu.com',
    children: 'link to Baidu',
  },
}

export const SmallButton: Story = {
  args: {
    btnType: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
}

export const LargeButton: Story = {
  args: {
    btnType: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
}
