import React from 'react';
import { Layout, Breadcrumb, theme, Table, Button, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ModalAll from '../../components/modal/ModalAll';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchWorkspaces, addWorkspace } from './../../services/axiosInstance';

const { Content } = Layout;

const Workspaces = () => {
  //State

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [workspaces, setWorkspaces] = useState([]);

  //fetch data
  const getAllWorkspaces = async () => {
    const res = await fetchWorkspaces();
    setWorkspaces(res);
  };

  useEffect(() => {
    getAllWorkspaces();
  }, [isModalOpen]);

  //Data
  // const dataSource = [
  //   { key: 1, name: 'ST Software', status: 'Active', managers: '' },
  //   { key: 2, name: 'Devplus', status: 'Inactive', managers: '' },
  // ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Managers',
      dataIndex: 'user',
      key: 'user',
      render: (user) =>
        user.length > 0 ? (
          <>
            <div key={user._id}>
              {user
                ?.filter((item) => item.role === 'Manager')
                ?.map((item) =>
                  item.img_profile ? (
                    // eslint-disable-next-line react/jsx-key
                    <Avatar
                      size='medium'
                      src={item.img_profile}
                      key={item._id}
                      style={{ marginRight: '10px' }}
                    />
                  ) : (
                    // eslint-disable-next-line react/jsx-key
                    <Avatar
                      size='medium'
                      icon={<UserOutlined />}
                      key={item._id}
                      style={{ marginRight: '10px' }}
                    />
                  ),
                )}
            </div>
          </>
        ) : (
          <p>N/A</p>
        ),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: '_id',
      render: (_id) => (
        <Space size='middle'>
          <Link
            to={{ pathname: `/admin/workspace-detail/${_id}`, state: { _id } }}
            style={{ fontSize: '20px' }}
            title={isTitle}
          >
            {/* <InfoCircleFilled style={{ color: '#1677FF' }} />{' '} */}
            <Button type='primary' title={isTitle}>
              Detail
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  //UI Theme
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //Actions
  const onFinish = async (values) => {
    await addWorkspace({ values });
    setIsModalOpen(false);
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
            onFinish={onFinish}
          />
        </div>
        <Table
          columns={columns}
          dataSource={workspaces}
          pagination={{
            pageSize: 6,
          }}
          rowKey='_id'
          scroll={{ x: true }}
        />
      </div>
    </Content>
  );
};

export default Workspaces;
