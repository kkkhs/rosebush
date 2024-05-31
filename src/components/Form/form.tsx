import {
  FC,
  ReactNode,
  createContext,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { ValidateError } from 'async-validator'
import useStore, { FormState } from './useStore'

export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  /**
   * 表单名称，会作为表单字段 id 前缀使用
   * */
  name?: string
  /**
   * 表单默认值，只有初始化以及重置时生效
   * */
  initialValues?: Record<string, any>
  children?: ReactNode | RenderProps
  /**
   * 提交表单且数据验证成功后回调事件
   * */
  onFinish?: (values: Record<string, any>) => void
  /**
   * 提交表单且数据验证失败后回调事件
   * */
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

// Omit 忽略类型
export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'form'
>

// 创建 Context
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form = forwardRef<IFormRef, FormProps>(
  (
    {
      name = 'rose_form',
      children,
      initialValues,
      onFinish,
      onFinishFailed,
    }: FormProps,
    ref
  ) => {
    const { form, fields, dispatch, ...restProps } = useStore(initialValues)
    const { validateField, validateAllFields } = restProps

    // 自定义 ref 暴露的内容
    useImperativeHandle(ref, () => {
      return {
        ...restProps,
      }
    })

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

    // 判断 children是 renderProps 还是普通的 ReactNode
    let childrenNode: ReactNode
    if (typeof children === 'function') {
      childrenNode = children(form)
    } else {
      childrenNode = children
    }

    return (
      <>
        <form name={name} className="rose-form" onSubmit={submitFrom}>
          <FormContext.Provider value={passedContext}>
            {childrenNode}
          </FormContext.Provider>
        </form>

        {/* 调试 */}
        {/* <div>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
        </div> */}
      </>
    )
  }
)

export default Form
