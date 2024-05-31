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
import { CustomRule } from './useStore'

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export interface FormItemProps {
  /**
   * 字段名
   * */
  name: string
  /**
   * label 标签的文本
   * */
  label?: string
  children?: ReactNode
  /**
   * 子节点的值的属性，如 checkbox 的是 'checked'
   * */
  valuePropName?: string
  /**
   * 设置收集字段值变更的时机
   * */
  trigger?: string
  /**
   * 设置如何将 event 的值转换成字段值
   * */
  getValueFromEvent?: (event: any) => any
  /**
   * 校验规则，设置字段的校验逻辑。请看 async validator 了解更多规则
   * */
  rules?: CustomRule[]
  /**
   * 设置字段校验的时机
   * */
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
      value: {
        label,
        name,
        value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    })
  }, [])

  // 获取store中对应的value
  const fieldState = fields[name]
  const value = fieldState?.value
  // 获取错误信息
  const errors = fieldState?.errors
  const isRequired = rules?.some(
    (rule) => typeof rule !== 'function' && rule.required
  )
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
