import { FC } from 'react';
import { TabsProps } from './tabs';
import { TabsItemProps } from './tabItem';
export type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabsItemProps>;
};
declare const TransTabs: ITabsComponent;
export default TransTabs;
