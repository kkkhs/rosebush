import { useReducer, useState } from 'react'
import Schema, { RuleItem, ValidateError } from 'async-validator'
import { mapValues, each } from 'lodash-es'

export type CustomRuleFunc = ({
  getFieldValue,
}: {
  getFieldValue: (key: string) => string
}) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc
// 每个 field 的接口
export interface FieldDetail {
  name: string
  value: string
  rules: CustomRule[]
  isValid: boolean
  errors: ValidateError[]
}

// 全部 field 的接口 ( 键值类型 )
export interface FieldsState {
  [key: string]: FieldDetail
}

export interface ValidateErrorType extends Error {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

// form 的状态
export interface FormState {
  isValid: boolean
  isSubmitting: boolean
  errors: Record<string, ValidateError[]>
}

// Fields 操作接口
export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult'
  name: string
  value: any
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value },
      }
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      }
    case 'updateValidateResult':
      const { isValid, errors } = action.value
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      }
    default:
      return state
  }
}

function useStore(initialValues?: Record<string, any>) {
  // form state
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {},
  })
  const [fields, dispatch] = useReducer(fieldsReducer, {})

  // 获取 key 对应的value值
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value
  }

  // 获取全部字段的 value 值
  const getFieldsValue = () => {
    return mapValues(fields, (item) => item.value)
  }

  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: 'updateValue', name, value })
    }
  }

  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({ type: 'updateValue', name, value })
        }
      })
    }
  }

  // 转换规则类型
  const transfromRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === 'function') {
        // 如果是 CustomRuleFunc 则返回执行后的值
        const calledRule = rule({ getFieldValue })
        return calledRule
      } else {
        // 如果是ruleItem直接返回
        return rule
      }
    })
  }
  // 验证单个字段
  const validateField = async (name: string) => {
    const { value, rules } = fields[name]
    const descriptor = {
      [name]: transfromRules(rules),
    }
    const valueMap = {
      [name]: value,
    }
    // 创建实例 validator
    const validator = new Schema(descriptor)
    let isValid = true
    let errors: ValidateError[] = []
    try {
      //   开始验证
      await validator.validate(valueMap)
    } catch (e) {
      //  处理验证错误
      isValid = false
      const err = e as any
      console.log('e', err.errors)
      console.log('fields', err.fields)
      errors = err.errors
    } finally {
      console.log('errors', isValid)
      dispatch({
        type: 'updateValidateResult',
        name,
        value: { isValid, errors },
      })
    }
  }

  // 表单的整体验证逻辑
  const validateAllFields = async function () {
    let isValid = true
    let errors: Record<string, ValidateError[]> = {}
    // valueMap 结构: {'username': 'abc}
    const valueMap = mapValues(fields, (item) => item.value)
    const descriptor = mapValues(fields, (item) => transfromRules(item.rules))
    const validator = new Schema(descriptor)
    setForm({ ...form, isSubmitting: true })
    try {
      await validator.validate(valueMap)
    } catch (e) {
      isValid = false
      const err = e as ValidateErrorType
      errors = err.fields
      each(fields, (value, name) => {
        // 判断 errors 中是否有对应的 key
        if (errors[name]) {
          const itemErrors = errors[name]
          dispatch({
            type: 'updateValidateResult',
            name,
            value: { isValid: false, errors: itemErrors },
          })
        } else if (value.rules.length > 0 && !errors[name]) {
          // 有对应的 rules 并且没有 errors
          dispatch({
            type: 'updateValidateResult',
            name,
            value: { isValid: true, errors: [] },
          })
        }
      })
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors })
      return {
        isValid,
        errors,
        values: valueMap,
      }
    }
  }
  return {
    fields,
    dispatch,
    form,
    validateField,
    validateAllFields,
    getFieldsValue,
    setFieldValue,
    resetFields,
  }
}

export default useStore
