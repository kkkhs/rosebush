import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Icon from './icon'
import Button from '../Button/button'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  id: 'Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ADefaultIcons: Story = () => (
  <>
    <Icon icon="check" size="3x" />
    <Icon icon="times" size="3x" />
    <Icon icon="anchor" size="3x" />
    <Icon icon="trash" size="3x" />
    <Button size="lg" btnType="primary">
      <Icon icon="check" /> check{' '}
    </Button>
  </>
)
ADefaultIcons.storyName = '默认图标'
export const BThemeIcons: Story = () => (
  <>
    <Icon icon="check" size="3x" theme="success" />
    <Icon icon="times" size="3x" theme="danger" />
    <Icon icon="anchor" size="3x" theme="primary" />
    <Icon icon="exclamation-circle" size="3x" theme="warning" />
  </>
)
BThemeIcons.storyName = '不同主题的 Icon'
export const CCustomIcons: Story = () => (
  <>
    <Icon icon="spinner" size="3x" theme="primary" spin />
    <Icon icon="spinner" size="3x" theme="success" pulse />
  </>
)
CCustomIcons.storyName = '更多行为的 Icon'
