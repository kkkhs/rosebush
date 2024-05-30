import { FC } from 'react'

export interface FormProps {
  name?: string
  children?: React.ReactNode
}

export const Form: FC<FormProps> = ({
  name = 'rose_form',
  children,
}: FormProps) => {
  return (
    <form name={name} className="rose-form">
      {children}
    </form>
  )
}

export default Form
