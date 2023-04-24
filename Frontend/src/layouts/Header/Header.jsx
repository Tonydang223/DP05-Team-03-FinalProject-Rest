import React from 'react';
import { UserOutlined, TeamOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Layout, Avatar, Menu } from 'antd';
import AvatarIcon from '../../assets/avatar.png';
import './header.css';
import HeaderLogo from '../../assets/logoHeader.png';
import { Link } from 'react-router-dom';
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
  getItem('Account', 'account', <UserOutlined />, [
    getItem(<Link to='/'>Dashboard</Link>, 'dashboard'),
    getItem(<Link to='/staff/log_off_form'>Requests</Link>, 'requests'),
    getItem(<Link to='/manager/days_off'>Days off</Link>, 'daysoff'),
  ]),
  getItem('Manager', 'manager', <TeamOutlined />, [
    getItem(<Link to='/manager/member'>Member</Link>, 'member'),
    getItem(<Link to='/manager/groups'>Groups</Link>, 'groups'),
    getItem(<Link to='/staff'>Notifications</Link>, 'notifications'),
    getItem(<Link to='/staff'>Sync</Link>, 'sync'),
  ]),
  getItem('Administrator', 'administrator', <CustomerServiceOutlined />, [
    getItem(<Link to='/admin/workspaces'>Workspaces</Link>, ' workspaces'),
  ]),
  getItem(
    undefined,
    'sub4',
    <Avatar
      className='avatar-profile'
      style={{ top: '9px', left: '4px' }}
      size={35}
      src={AvatarIcon}
    />,
    [getItem(<Link to='/profile'>My Profile</Link>, '9'), getItem('Logout', '10')],
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
