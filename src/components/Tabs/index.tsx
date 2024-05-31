import { FC } from 'react'
import Tabs, { TabsProps } from './tabs'
import TabItem, { TabsItemProps } from './tabItem'

export type ITabsComponent = FC<TabsProps> & {
  Item: FC<TabsItemProps>
}
const TransTabs = Tabs as ITabsComponent
TransTabs.Item = TabItem

export default TransTabs
