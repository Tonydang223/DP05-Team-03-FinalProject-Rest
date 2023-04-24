import React from 'react';
import { Form, Layout, Breadcrumb, theme, Table, Button, Avatar, Space } from 'antd';
import { UserOutlined, InfoCircleFilled } from '@ant-design/icons';
import ModalAll from '../../components/modal/ModalAll';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchWorkspaces } from './../../services/axiosInstance';

const { Content } = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Workspaces = () => {
  //fetch data
  const getAllWorkspaces = async () => {
    const res = await fetchWorkspaces();
    console.log(res);
  };

  useEffect(() => {
    getAllWorkspaces();
  }, []);

  //Data
  const dataSource = [
    { key: 1, name: 'ST Software', state: 'Active', managers: '' },
    { key: 2, name: 'Devplus', state: 'Inactive', managers: '' },
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    {
      title: 'Managers',
      dataIndex: 'managers',
      render: () => (
        <>
          <Avatar size='small' icon={<UserOutlined />} />{' '}
          <Avatar size='small' icon={<UserOutlined />} />
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <Link to='/admin/workspace-details' style={{ fontSize: '20px' }} title={isTitle}>
            <InfoCircleFilled style={{ color: '#1677FF' }} />
          </Link>
        </Space>
      ),
    },
  ];

  //UI Theme
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');

  //Actions
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const showAddApprove = () => {
    setIsModalOpen(true);
    setTitle('Add_Workspace');
  };

  const handleApproveAdd = () => {
    setIsModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpen(false);
  };

  //JSX
  return (
    <Content
      style={{
        margin: '0 45px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
        items={[
          {
            title: 'Admin',
          },
          {
            title: 'Workspaces',
          },
        ]}
      />

      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <div>
          <Button
            role='button'
            title={isTitle}
            onClick={showAddApprove}
            style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
          >
            Add new workspace
          </Button>
          <ModalAll
            name={isTitle}
            open={isModalOpen}
            onOk={handleApproveAdd}
            onCancel={handleCancelAdd}
          />
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          />
        </div>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: true }} />
      </div>
    </Content>
  );
};

export default Workspaces;
