import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface FormItemProps {
  label?: string
  children?: ReactNode
}

const FormItem: FC<FormItemProps> = ({ label, children }: FormItemProps) => {
  const rowClass = classNames('rose-row', {
    'rose-row-no-label': !label,
  })
  return (
    <div className={rowClass}>
      {label && (
        <div>
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="rose-form-item">{children}</div>
    </div>
  )
}

export default FormItem
