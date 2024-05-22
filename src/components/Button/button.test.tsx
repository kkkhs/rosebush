import { render } from '@testing-library/react'

import Button, { ButtonType } from './button'

// button 组件测试
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on diffent props', () => {
    const wrapper = render(
      <Button onClick={() => {}} className="123">
        Nice
      </Button>
    )
    const element = wrapper.getByText('Nice')
    expect(element).toHaveClass('btn 123')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="www.baidu.com">
        Nice
      </Button>
    )
    const element = wrapper.getByText('Nice')
    expect(element).toHaveClass('btn btn-link')
    expect(element).toHaveAttribute('href')
  })
  it('should render disabled button', () => {
    const wrapper = render(<Button disabled>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeDisabled()
  })
})
