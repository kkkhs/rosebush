import classNames from 'classnames'
import React, { FunctionComponentElement, useState } from 'react'
import { createContext } from 'react'
import { TabsItemProps } from './tabItem'

export interface TabsProps {
  /**
   * 当前激活 tab 面板的 index，默认为0
   */
  defaultIndex?: number
  /**
   * 点击 Tab 触发的回调函数
   */
  onSelect?: (selectIndex: number) => void
  /**
   * 可以扩展的 className
   */
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  /**
   * Tabs的样式，两种可选，默认为 line
   */
  type?: 'line' | 'card'
}

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'rosebush'
 * ~~~
 */
const Tabs: React.FC<TabsProps> = ({
  defaultIndex = 0,
  onSelect,
  className,
  style,
  children,
  type = 'line',
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleClick = (index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }
  const navClass = classNames('rose-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  })

  // 返回上方NavLinks
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabsItemProps>
      const { label, disabled, className, style } = childElement.props
      const classes = classNames('rose-tabs-nav-item', className, {
        'is-active': activeIndex === index,
        disabled: disabled,
      })

      return (
        <li
          className={classes}
          style={style}
          key={`nav-item-${index}`}
          onClick={() => handleClick(index, disabled)}
        >
          {label}
        </li>
      )
    })
  }

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }
  return (
    <div className={`rose-tabs ${className}`} style={style}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <ul className="rose-tabs-content">{renderContent()}</ul>
    </div>
  )
}

export default Tabs
