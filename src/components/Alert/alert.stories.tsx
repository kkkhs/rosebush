import type { Meta, StoryObj } from '@storybook/react'

import Alert from './alert'
import { fn } from '@storybook/test'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: { onClose: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultButton: Story = {
  args: {
    type: 'default',
    title: 'This a default alert',
    showClose: true,
  },
}

export const SuccessButton: Story = {
  args: {
    type: 'success',
    title: 'This a succss alert title',
    description: 'this is description',
  },
}

export const DangerButton: Story = {
  args: {
    type: 'danger',
    title: 'This a danger alert',
  },
}

export const WarningButton: Story = {
  args: {
    type: 'warning',
    title: 'This a warning alert',
    showClose: false,
  },
}
