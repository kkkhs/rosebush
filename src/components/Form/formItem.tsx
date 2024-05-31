import classNames from 'classnames'
import React, {
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import { FormContext } from './form'
import { RuleItem } from 'async-validator/dist-types/interface'

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export interface FormItemProps {
  name: string
  label?: string
  children?: ReactNode
  valuePropName?: string
  trigger?: string // 何时更新
  getValueFromEvent?: (event: any) => any
  rules?: RuleItem[]
  validateTrigger?: string
}

const FormItem = ({
  name,
  label,
  children,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFromEvent = (e) => e.target.value,
  rules,
  validateTrigger = 'onBlur',
}: FormItemProps) => {
  // 子组件拿到context的值
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext)
  const rowClass = classNames('rose-row', {
    'rose-row-no-label': !label,
  })

  useEffect(() => {
    // FormStore初始化
    const value = (initialValues && initialValues[name]) || ''
    dispatch({
      type: 'addField',
      name,
      value: { label, name, value, rules, isValid: true },
    })
  }, [])

  // 获取store中对应的value
  const fieldState = fields[name]
  const value = fieldState?.value
  // 获取错误信息
  const errors = fieldState?.errors
  const isRequired = rules?.some((rule) => rule.required)
  const hasError = errors && errors.length > 0
  const labelClass = classNames({
    'rose-form-item-required': isRequired,
  })
  const itemClass = classNames('rose-form-item-control', {
    'rose-form-item-has-error': hasError,
  })

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    console.log('new Value', value)
    dispatch({ type: 'updateValue', name, value })
  }

  const onValueValidate = async () => {
    await validateField(name)
  }
  // 实现store中数据的自动更新
  // 1、手动地创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
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
        <div className="rose-form-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="rose-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="rose-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormItem
