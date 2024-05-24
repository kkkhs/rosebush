import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ marginLeft: '20px', marginRight: '20px' }}
      >
        <FontAwesomeIcon icon={faCoffee} />
        <h3>按钮</h3>
        <div>
          <Button btnType="default" autoFocus>
            Button
          </Button>
          <Button disabled>Disabled Button</Button>
          <Button btnType="primary" size="lg">
            Large Primary
          </Button>
          <Button btnType="danger" size="sm">
            Small Danger
          </Button>
          <Button btnType="link" href="http://www.baidu.com">
            Baidu Link
          </Button>
          <Button btnType="link" href="http://www.baidu.com" disabled>
            Disabled Link
          </Button>
        </div>
        <hr />
        <h3>警告</h3>
        <div>
          <Alert title="danger" type={'danger'} showClose={false} />
          <Alert title="warning" type={'warning'} />
          <Alert title="success" type={'success'} showClose={false} />
          <Alert title="默认" description="123" />
        </div>
        <hr />
        <h3>菜单</h3>
        <div>
          <Menu onSelect={(index) => console.log(index)}>
            <MenuItem> cool link</MenuItem>
            <MenuItem disabled>cool link 1</MenuItem>
            <SubMenu title="123">
              <MenuItem>dropdown 1</MenuItem>
              <MenuItem>dropdown 2</MenuItem>
            </SubMenu>
            <MenuItem> cool link 2</MenuItem>
          </Menu>

          <Menu
            mode="vertical"
            onSelect={(index) => console.log(index)}
            defaultOpenSubMenus={['2']}
          >
            <MenuItem> cool link</MenuItem>
            <MenuItem disabled>cool link 1</MenuItem>
            <SubMenu title="123">
              <MenuItem>dropdown 1</MenuItem>
              <MenuItem>dropdown 2</MenuItem>
            </SubMenu>
            <MenuItem> cool link 2</MenuItem>
          </Menu>
        </div>
        <hr />
        <h3>Tabs</h3>
        <div>
          <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
            <TabItem label="card1" disabled>
              this is card one
            </TabItem>
            <TabItem label="card2">this is content two</TabItem>
            <TabItem label="disabled">this is content three</TabItem>
          </Tabs>
          <Tabs
            defaultIndex={0}
            onSelect={(index) => console.log(index)}
            type="card"
          >
            <TabItem label="card1">this is card one</TabItem>
            <TabItem label="card2">this is content two</TabItem>
            <TabItem label="disabled">this is content three</TabItem>
          </Tabs>
        </div>
        <h3>Icon</h3>
        <Icon icon="coffee" theme="danger" size="xl"></Icon>
      </header>
    </div>
  )
}

export default App
