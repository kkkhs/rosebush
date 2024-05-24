import classNames from 'classnames'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = ({ className, theme, ...restProps }) => {
  // icon-primary
  const classes = classNames('rose-icon', className, {
    [`icon-${theme}`]: theme, // 可变的key使用[]包裹
  })

  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
