import {
  UserOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  StarFilled,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Button, Divider, Drawer, Avatar } from 'antd';
import { useState } from 'react';
import './sidebar.css';
import sidebarLogo from '../../assets/sidebarLogo.png';
import collapedLogo from '../../assets/collapedLogo.png';

import { Link } from 'react-router-dom';
import AvatarIcon from '../../assets/avatar.png';

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
  getItem('Account', 'account', <UserOutlined />, [
    getItem(<Link to='/'>Dashboard</Link>, 'dashboard'),
    getItem(<Link to='/staff/log_off_form'>Requests</Link>, 'requests'),
    getItem(<Link to='/manager/days_off'>Days off</Link>, 'daysoff'),
  ]),
  getItem('Manager', 'manager', <TeamOutlined />, [
    getItem(<Link to='/staff'>Member</Link>, 'member'),
    getItem(<Link to='/manager/groups'>Groups</Link>, 'groups'),
    getItem(<Link to='/staff'>Notifications</Link>, 'notifications'),
    getItem(<Link to='/staff'>Sync</Link>, 'sync'),
  ]),
  getItem('Administrator', 'administrator', <CustomerServiceOutlined />, [
    getItem(<Link to='/admin/workspaces'>Workspaces</Link>, 'workspaces'),
  ]),
  getItem('My Account', 'myAccount', <StarFilled />, [
    getItem(<Link to='/staff'>My Profile</Link>, 'profile'),
    getItem('Logout', '10'),
  ]),
];

// const item = [
//   {
//     label: 'Account',
//     key: 'account',
//     icon: <UserOutlined />,
//     // children: [
//     //   label: '',
//     // ]
//   },
// ];

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
        style={{ backgroundColor: '#12131a' }}
        theme='dark'
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint='xl'
      >
        <Image
          preview={false}
          src={collapsed ? collapedLogo : sidebarLogo}
          style={collapsed ? { marginBottom: '140px' } : { marginBottom: '50px' }}
        />
        <Menu style={{ backgroundColor: '#12131a' }} theme='dark' items={items} />
        <Divider></Divider>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {collapsed === true ? (
            ''
          ) : (
            <Button className='custom-button' type='primary' shape='round'>
              Sign out
            </Button>
          )}
        </div>
      </Sider>
    </>
  );
}
