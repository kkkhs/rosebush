import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /**
   * 设置 Button 的内容
   */
  className?: string
  /**
   * 设置 Button 的禁用
   */
  disabled?: boolean
  /**
   * 设置 Button 的尺寸
   */
  size?: ButtonSize
  /**
   * 设置 Button 的类型
   */
  btnType?: ButtonType
  children: React.ReactNode
  /**
   * 设置 Link Button 的跳转链接
   */
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

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，同时支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'rosebush'
 * ```
 */
const Button = ({
  btnType = 'default',
  className,
  disabled = false,
  size,
  children,
  href,
  ...restProps
}: BaseButtonProps) => {
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
