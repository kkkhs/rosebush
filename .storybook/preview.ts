import type { Preview } from '@storybook/react'
import '../src/styles/index.scss' // 添加全局样式

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
