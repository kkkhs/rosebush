import { Meta, StoryObj } from '@storybook/react'
import Select from './select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    source: {
      type: 'code',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const MultiSelect: Story = () => {
  const subSelect = ['1', '你好', '2', '3']
  return <Select />
}

MultiSelect.storyName = '单选Select'
