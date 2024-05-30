import { Meta, StoryObj } from '@storybook/react/*'
import Form from './form'
import Item from './formItem'
import Input from '../Input/input'
import Button from '../Button/button'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  id: 'Form',
  component: Form,
  parameters: {
    layout: 'centered',
    source: {
      type: 'code',
    },
  },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // args: { onSelect: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const ABasicForm: Story = () => {
  return (
    <Form>
      <Item label="用户名">
        <Input />
      </Item>
      <Item label="密码">
        <Input type="password" />
      </Item>
      <Item>
        <Input placeholder="no-label" />
      </Item>
      <div className="agreement-section" style={{ display: 'flex' }}>
        <Item>
          <input type="checkbox" />
        </Item>
        <span className="agree-text">
          注册即代表你同意
          <a href="#">用户协议</a>
        </span>
      </div>
      <div className="rose-form-submit-area">
        <Button type="submit" btnType="primary">
          登陆
        </Button>
      </div>
    </Form>
  )
}
ABasicForm.storyName = '基本的登陆表单'
