import type { Meta, StoryObj } from '@storybook/react'

import Input from './input'
import { fn } from '@storybook/test'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // args: { onClose: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultInput: Story = {
  args: {},
}

export const DisabledInput: Story = {
  args: {
    disabled: true,
    size: 'lg',
  },
}

export const IconInput: Story = {
  args: {
    icon: 'coffee',
  },
}

export const PrependInput: Story = {
  args: {
    prepend: 'is prepend',
  },
}

export const AppendInput: Story = {
  args: {
    append: 'is append',
  },
}
