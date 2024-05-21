import classNames from 'classnames'

// 枚举类型
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

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

const Button: React.FC<ButtonProps> = (
  props = { disabled: false, btnType: ButtonType.Default } // 默认值
) => {
  const { btnType, className, disabled, size, children, href, ...restProps } =
    props

  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled, // 如果是a链接, 则将disabled添加到class
  })

  if (btnType === ButtonType.Link && href) {
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
