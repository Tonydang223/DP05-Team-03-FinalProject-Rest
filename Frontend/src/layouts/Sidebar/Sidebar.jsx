import { UserOutlined, 
    TeamOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import {Layout, Menu, Image, Button, Divider} from 'antd';
import { useState } from 'react';
import './sidebar.css'
import logoSidebar from '../../assets/logoTeam.png';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  // getItem('Option 1', '1', <PieChartOutlined />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Account', 'sub1', <UserOutlined />, [
    getItem('Dashboard', '1'),
    getItem('Requests', '2'),
    getItem('Days off', '3'),
  ]),
  getItem('Manager', 'sub2', <TeamOutlined />, [
    getItem('Memeber', '4'), 
    getItem('Groups', '5'),
    getItem('Notifications', '6'),
    getItem('Sync', '7'),
  ]),
  getItem('Administrator', 'sub3', <CustomerServiceOutlined />, [
    getItem('Workspaces' ,' 8')
  ]),
];


export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Image preview={false} src={logoSidebar}/>
        <Menu theme="light"  items={items} />
        <Divider></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button type="primary">Sign out</Button>
        </div>
      </Sider>
  )
}