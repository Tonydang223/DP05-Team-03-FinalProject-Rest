import React from 'react';
import { UserOutlined, TeamOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Layout, Avatar, Menu } from 'antd';
import AvatarIcon from '../../assets/avatar.png';
import './header.css';
import HeaderLogo from '../../assets/logoHeader.png';
const { Header } = Layout;

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
    getItem('Member', '4'),
    getItem('Groups', '5'),
    getItem('Notifications', '6'),
    getItem('Sync', '7'),
  ]),
  getItem('Administrator', 'sub3', <CustomerServiceOutlined />, [getItem('Workspaces', ' 8')]),
  getItem(
    undefined,
    'sub4',
    <Avatar
      className='avatar-profile'
      style={{ top: '9px', left: '4px' }}
      size={35}
      src={AvatarIcon}
    />,
    [getItem('My Profile', '9'), getItem('Logout', '10')],
  ),
];

export default function Navbar() {
  return (
    <Header style={{ backgroundColor: 'white' }}>
      <div className='logo'>
        <img src={HeaderLogo} alt='' />
      </div>
      <Menu style={{ justifyContent: 'flex-end' }} mode='horizontal' items={items} />
    </Header>
  );
}
