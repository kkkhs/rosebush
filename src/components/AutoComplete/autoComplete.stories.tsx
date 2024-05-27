import { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AutoComplete from './autoComplete'

const meta: Meta<typeof AutoComplete> = {
  title: 'Components/AutoComplete',
  id: 'AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAutoCompletes: Story = () => {
  const lakers = [
    'khs',
    'popr',
    'cook',
    'cousins',
    'AD',
    'green',
    'howard',
    'kuzma',
    'rando',
    'McGee',
    'james',
    'caruso',
  ]

  const handleFetch = (query: string) => {
    return lakers.filter((name) => name.includes(query))
  }

  return (
    <AutoComplete fetchSuggestions={handleFetch} onSelect={action('select')} />
  )
}
DefaultAutoCompletes.storyName = '默认AutoComplete'
