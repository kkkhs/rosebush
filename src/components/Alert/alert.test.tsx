import { render } from '@testing-library/react'
import Alert from './alert'

// alert 组件测试
describe('test Alert component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Alert title="你好"></Alert>)
    // expect(wrapper.tagName).toEqual('BUTTON')
  })
})
