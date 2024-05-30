import { useReducer, useState } from 'react'

// 每个 field 的接口
export interface FieldDetail {
  name: string
  value: string
  rule: any[]
  isValid: boolean
  errors: any[]
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
  type: 'addField' | 'updateValue'
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
    default:
      return state
  }
}

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true })
  const [fields, dispatch] = useReducer(fieldsReducer, {})

  return {
    fields,
    dispatch,
    form,
  }
}

export default useStore
