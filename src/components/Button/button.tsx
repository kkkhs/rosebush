import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children?: React.ReactNode
  href?: string
}

// 普通按钮类型 交叉类型&
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>

// 链接按钮类型
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>

// 最终按钮类型 Partial(将类型定义的所有属性都修改为可选)
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = ({
  btnType = 'default',
  className,
  disabled = false,
  size,
  children,
  href,
  ...restProps
}) => {
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled, // 如果是a链接, 则将disabled添加到class
  })

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

export default Button
