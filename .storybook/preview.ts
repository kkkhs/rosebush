import type { Preview } from '@storybook/react'
import '../src/styles/index.scss' // 添加全局样式
import { Icon } from '@fortawesome/fontawesome-svg-core'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
