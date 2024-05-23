import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  // 在每次test执行前都会执行
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('acive')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on defalt props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('rose-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)

    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')

    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).no.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(disabledElement).toHaveBeenCalledWith(0) // 0次调用
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup() // 清除之前的wrapper等
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
