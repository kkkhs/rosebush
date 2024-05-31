import { Dispatch, FC, createContext } from 'react'
import useStore from './useStore'

export interface FormProps {
  name?: string
  initialValues?: Record<string, any>
  children?: React.ReactNode
}

// 拿到函数返回值的类型 ReturnType
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields'
> &
  Pick<FormProps, 'initialValues'>

// 创建 Context
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = ({
  name = 'rose_form',
  children,
  initialValues,
}: FormProps) => {
  const { form, fields, dispatch } = useStore()

  // Context传递的数据
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
  }

  return (
    <>
      <form name={name} className="rose-form">
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
