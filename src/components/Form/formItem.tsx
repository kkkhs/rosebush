import classNames from 'classnames'
import React, {
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import { FormContext } from './form'

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export interface FormItemProps {
  name: string
  label?: string
  children?: ReactNode
  valuePropName?: string
  trigger?: string // 何时更新
  getValueFromEvent?: (event: any) => any
}

const FormItem = ({
  name,
  label,
  children,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFromEvent = (e) => e.target.value,
}: FormItemProps) => {
  // 子组件拿到context的值
  const { dispatch, fields, initialValues } = useContext(FormContext)
  const rowClass = classNames('rose-row', {
    'rose-row-no-label': !label,
  })

  useEffect(() => {
    // FormStore初始化
    const value = (initialValues && initialValues[name]) || ''
    dispatch({ type: 'addField', name, value: { label, name, value } })
  }, [])

  // 获取store中对应的value
  const fieldState = fields[name]
  const value = fieldState?.value

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    console.log('new Value', value)
    dispatch({ type: 'updateValue', name, value })
  }

  // 实现store中数据的自动更新
  // 1、手动地创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  // 2、获取 children 数组的第一个元素
  const childrenList = React.Children.toArray(children)
  if (childrenList.length === 0) {
    console.error(
      'From.Item has no children, please provide at least on children!'
    )
  } else if (childrenList.length > 1) {
    console.warn('Only support one child element in Form.item')
  } else if (!React.isValidElement(childrenList[0])) {
    // 判断children是否是ReactElement
    console.error('Child Element is not a valid React Element')
  }
  const child = childrenList[0] as ReactElement
  // 3、使用 cloneElement, 混合这个 child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  })

  return (
    <div className={rowClass}>
      {label && (
        <div>
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="rose-form-item">{returnChildNode}</div>
    </div>
  )
}

export default FormItem
