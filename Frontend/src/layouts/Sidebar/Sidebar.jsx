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
import ModalAll from '../../components/modal/ModalAll';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slice/userSlice';
import { useDispatch } from 'react-redux';

const { Sider } = Layout;

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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
  };

  // Approve modal
  const showModalApprove = () => {
    setIsModalOpen(true);
    setTitle('Logout');
  };

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
      getItem(
        <p className='logoutBtn' title={isTitle} onClick={() => showModalApprove()}>
          Log Out
        </p>,
        '10',
      ),
    ]),
  ];

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
      </Sider>
      <ModalAll
        name={isTitle}
        title={isTitle}
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={handleCancelEdit}
      />
    </>
  );
}
