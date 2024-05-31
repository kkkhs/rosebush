import { Dispatch, FC, createContext } from 'react'
import { ValidateError } from 'async-validator'

import useStore from './useStore'

export interface FormProps {
  name?: string
  initialValues?: Record<string, any>
  children?: React.ReactNode
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void
}

// 拿到函数返回值的类型 ReturnType
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>

// 创建 Context
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = ({
  name = 'rose_form',
  children,
  initialValues,
  onFinish,
  onFinishFailed,
}: FormProps) => {
  const { form, fields, dispatch, validateField, validateAllFields } =
    useStore()

  // Context传递的数据
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  }

  const submitFrom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // 拿到函数返回的 isValid, errors, values
    const { isValid, errors, values } = await validateAllFields()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }

  return (
    <>
      <form name={name} className="rose-form" onSubmit={submitFrom}>
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>

      {/* 调试 */}
      <div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

export default Form
