/***
 * 1 点击 关闭 整个元素消失
   2 ⽀持四种主题颜⾊
     export type AlertType = ‘success’ | ‘default’ | ‘danger’ | 'warning’
   3 可以包含标题和内容，解释更详细的警告
   4 右侧是否显⽰关闭按钮可配置
 */

import classNames from 'classnames'
import { FC, useState } from 'react'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title: string
  type?: AlertType
  description?: string
  showClose?: boolean
  onClose?: () => void
}

const Alert: FC<AlertProps> = ({
  type = 'default',
  title,
  description,
  showClose = true,
  onClose,
}) => {
  const [hide, setHide] = useState(false)

  const classes = classNames('rose-alert', {
    [`rose-alert-${type}`]: type,
  })

  const titleClass = classNames('rose-alert-title', {
    'bold-title': description,
  })

  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true) // 隐藏 alert
  }

  if (hide) {
    return null
  }

  return (
    <div className={classes}>
      <span className={titleClass}>{title}</span>
      {description && <p className="rose-alert-desc">{description}</p>}
      {showClose && (
        <span className="rose-alert-close" onClick={handleClose}>
          {'x'}
        </span>
      )}
    </div>
  )
}

export default Alert
