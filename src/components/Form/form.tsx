import { FC } from 'react'
import useStore from './useStore'

export interface FormProps {
  name?: string
  children?: React.ReactNode
}

export const Form: FC<FormProps> = ({
  name = 'rose_form',
  children,
}: FormProps) => {
  const { form, fields } = useStore()

  return (
    <>
      <form name={name} className="rose-form">
        {children}
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
