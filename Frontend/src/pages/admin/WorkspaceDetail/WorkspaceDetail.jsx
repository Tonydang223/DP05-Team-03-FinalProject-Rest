import React from 'react';
import {
  Form,
  Input,
  Switch,
  Table,
  Button,
  Space,
  Layout,
  theme,
  Breadcrumb,
  Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './WorkSpaceDetail.css';
import ModalAll from '../../../components/modal/ModalAll';

const { Content } = Layout;
const WorkspaceDetail = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [checkStrictly, setCheckStrictly] = useState(false);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '12%',
    },
    {
      title: 'Action',
      key: 'action',

      render: () => (
        <Space size='middle'>
          <Button className='btn-space' title={isTitle} onClick={showEditPassword}>
            <EditOutlined />
            Reset Password
          </Button>
          <Button className='btn-space' title={isTitle} onClick={showDeletePassword}>
            <DeleteOutlined />
            Remove
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: 'Khoa Nguyen',
      email: 'khoanguyen@gmail.com',
      address: 'New York No. 1 Lake Park',
    },

    {
      key: 2,
      name: 'Nam Nguyen',
      email: 'namnguyen@gmail.com',
      address: 'Sydney No. 1 Lake Park',
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isTitle, setTitle] = useState('');

  const showEditPassword = () => {
    setIsModalOpen(true);
    setTitle('Edit_Password');
  };
  const showDeletePassword = () => {
    setIsModalOpen(true);
    setTitle('Delete_Password');
  };

  const showAddApprove = () => {
    setIsModalOpen(true);
    setTitle('Add_Manager');
  };

  const handApproveAdd = () => {
    setIsModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpen(false);
  };
  return (
    <Content
      style={{
        margin: '0 16px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Account</Breadcrumb.Item>
        <Breadcrumb.Item>Request</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <div className='workspace-container'>
          <div>
            <Typography.Title level={1} style={{ fontSize: '18px', marginLeft: '29px' }}>
              Basic Information
            </Typography.Title>
          </div>
          <Form.Item name={['user', 'name']} label='Name'>
            <Input placeholder='' className='workspace-text' />
          </Form.Item>
          <div className='wrap-btn'>
            <Button className='btn-workspace' title={isTitle} onClick={showAddApprove}>
              + New Manager
            </Button>
            <ModalAll
              name={isTitle}
              open={isModalOpen}
              onOk={handApproveAdd}
              onCancel={handleCancelAdd}
            />
          </div>
          <Space align='center' className='head-wrap'>
            Status:{''}
            <Switch checked={checkStrictly} onChange={setCheckStrictly} />
          </Space>
          <div className='table-container'>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default WorkspaceDetail;
