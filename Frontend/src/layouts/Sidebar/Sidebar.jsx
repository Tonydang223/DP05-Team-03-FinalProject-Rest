import { UserOutlined, TeamOutlined, CustomerServiceOutlined, 
    LogoutOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Layout, Menu, Image, Button, Divider, Drawer } from 'antd';
import { useState } from 'react';
import './sidebar.css';
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
  getItem('Administrator', 'sub3', <CustomerServiceOutlined />, [getItem('Workspaces', ' 8')]),
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    
  };
  // responsive
  const onBreakpoint = (broken) => {
    setIsMobile(broken);
    if (broken) {
      setCollapsed(true);
      
    } else {
      setCollapsed(false);
    }
  };
  
  return (
    <>
      <Sider
        theme='light'
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint='xl'
      >
        
        <Image preview={false} src={logoSidebar} />
        <Menu theme='light' items={collapsed ? '' : items} />
        <Divider></Divider>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {collapsed === true ? '': <Button className='custom-button' type="primary" shape="round">
            Sign out
          </Button>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {collapsed === true && <Button type="primary" onClick={showDrawer}>
              <ArrowRightOutlined title="show" />
            </Button>}
        </div>
      </Sider>
      
      <Drawer title="" placement="left" onClose={onClose} open={open}>
        <Image preview={false} src={logoSidebar} />
          <Menu theme='light' items={items} />
          <Divider></Divider>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button className='custom-button' type='primary'>
              Sign out
            </Button>
          </div>
      </Drawer>
    </>
  );
}
