import { useReducer, useState } from 'react'
import Schema, { RuleItem, ValidateError } from 'async-validator'

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

// form 的状态
export interface FormState {
  isValid: boolean
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

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true })
  const [fields, dispatch] = useReducer(fieldsReducer, {})
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value
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
  return {
    fields,
    dispatch,
    form,
    validateField,
  }
}

export default useStore
