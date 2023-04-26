import { UserOutlined, TeamOutlined, CustomerServiceOutlined, StarFilled } from '@ant-design/icons';
import { Layout, Menu, Image, Avatar } from 'antd';
import { useState } from 'react';
import './sidebar.css';
import sidebarLogo from '../../assets/sidebarLogo.png';
import collapedLogo from '../../assets/collapedLogo.png';
import { Link } from 'react-router-dom';
import AvatarIcon from '../../assets/avatar.png';
import ModalAll from '../../components/modal/ModalAll';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
  };

  // Approve modal
  const showModalApprove = () => {
    setIsModalOpen(true);
    setTitle('Logout');
  };

  // function getItem(label, key, icon, children) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //   };
  // }

  // const items = [
  //   getItem('Account', 'account', <UserOutlined />, [
  //     getItem(<Link to='/'>Dashboard</Link>, 'dashboard'),
  //     getItem(<Link to='/manager/request'>Requests</Link>, 'requests'),
  //     getItem(<Link to='/manager/days_off'>Days off</Link>, 'daysoff'),
  //   ]),
  //   getItem('Manager', 'manager', <TeamOutlined />, [
  //     getItem(<Link to='/staff'>Member</Link>, 'member'),
  //     getItem(<Link to='/manager/groups'>Groups</Link>, 'groups'),
  //     getItem(<Link to='/staff'>Notifications</Link>, 'notifications'),
  //     getItem(<Link to='/staff'>Sync</Link>, 'sync'),
  //   ]),
  //   getItem('Administrator', 'administrator', <CustomerServiceOutlined />, [
  //     getItem(<Link to='/admin/workspaces'>Workspaces</Link>, 'workspaces'),
  //   ]),
  //   getItem('My Account', 'myAccount', <StarFilled />, [
  //     getItem(<Link to='/staff'>My Profile</Link>, 'profile'),
  //     getItem(
  //       <p className='logoutBtn' title={isTitle} onClick={() => showModalApprove()}>
  //         Log Out
  //       </p>,
  //       '10',
  //     ),
  //   ]),
  // ];

  const navigations = [
    {
      label: 'Account',
      key: 'account',
      icon: <UserOutlined />,
      roles: ['Staff'],
      children: [
        {
          label: <Link to='/dashboard'>Dashboard</Link>,
          key: 'dashboard',
          roles: ['Admin', 'Manager', 'Staff'],
        },
        {
          label: <Link to='/manager/request'>Requests</Link>,
          key: 'staff/log_off_form',
          roles: ['Staff'],
        },
        {
          label: <Link to='/manager/days_off'>Days off</Link>,
          key: 'manager/days_off',
          roles: ['Staff'],
        },
      ],
    },
    {
      label: 'Manager',
      key: 'manager',
      icon: <TeamOutlined />,
      roles: ['Manager'],
      children: [
        {
          label: <Link to='/dashboard'>Dashboard</Link>,
          key: 'dashboard',
          roles: ['Admin', 'Manager', 'Staff'],
        },
        {
          label: <Link to='/manager/groups'>Groups</Link>,
          key: 'groups',
          roles: ['Manager'],
        },
        {
          label: <Link to='/staff'>Notifications</Link>,
          key: 'notifications',
          roles: ['Manager'],
        },
        {
          label: <Link to='/staff'>Sync</Link>,
          key: 'sync',
          roles: ['Manager'],
        },
      ],
    },
    {
      label: 'Administrator',
      key: 'myAccount',
      icon: <CustomerServiceOutlined />,
      roles: ['Admin'],
      children: [
        {
          label: <Link to='/dashboard'>Dashboard</Link>,
          key: 'dashboard',
          roles: ['Admin', 'Manager', 'Staff'],
        },
        {
          label: <Link to='/admin/workspaces'>Workspaces</Link>,
          key: 'workspaces',
          roles: ['Admin'],
        },
      ],
    },
    {
      label: 'My Account',
      key: 'administrator',
      icon: <StarFilled />,
      roles: ['Admin', 'Manager', 'Staff'],
      children: [
        {
          label: <Link to='/profile'>My Profile</Link>,
          key: 'profile',
          roles: ['Admin', 'Manager', 'Staff'],
        },
        {
          label: (
            <p className='logoutBtn' title={isTitle} onClick={() => showModalApprove()}>
              Log Out
            </p>
          ),
          key: 'logout',
          roles: ['Admin', 'Manager', 'Staff'],
        },
      ],
    },
  ];

  const acceptedRoute = navigations.reduce((result, current) => {
    if (current.children) {
      const children = current.children.filter((item) => item.roles?.includes(user?.role));
      current = { ...current, children };
    }

    if (current.roles) {
      if (current.roles.some((role) => role === user?.role)) {
        result.push(current);
      }
    } else {
      result.push(current);
    }

    return result;
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
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
          onClick={() => navigate('/dashboard')}
        />
        <Menu style={{ backgroundColor: '#12131a' }} theme='dark' items={acceptedRoute} />
        <div className='user-login'>
          <Avatar
            className='user-avatar'
            size={40}
            src={user?.img_profile ? user?.img_profile : AvatarIcon}
          />
          <h3 className='user-name'>Hi! {user?.role}</h3>
        </div>
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
