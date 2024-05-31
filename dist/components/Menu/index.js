import Menu from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';
// 将子组件作为属性赋值
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
