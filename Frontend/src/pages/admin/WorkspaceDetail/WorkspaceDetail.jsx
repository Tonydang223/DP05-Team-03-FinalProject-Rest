import React from 'react';
import { Table, Button, Space, Layout, theme, Breadcrumb, Typography, Col, Row } from 'antd';
import './WorkSpaceDetail.css';
import ModalAll from '../../../components/modal/ModalAll';
import { EditOutlined } from '@ant-design/icons';

import { useParams } from 'react-router-dom';
import {
  detailWorkspace,
  setWorkspaceStatus,
  deleteManager,
  resetPasswordManager,
  addManager,
  editWorkspace,
} from './../../../services/axiosInstance';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import {
  detailWorkspace,
  setWorkspaceStatus,
  deleteManager,
  resetPasswordManager,
  addManager,
} from './../../../services/axiosInstance';
import { useEffect, useState } from 'react';

const { Content } = Layout;
const { Title } = Typography;

const WorkspaceDetail = () => {
  const { id } = useParams(); //id nay la workspace id truyen tu ben workspace sang

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [workspace, setWorkspace] = useState(null);
  const [workspaceManager, setWorkspaceManager] = useState(null);
  const [manager, setManager] = useState(null);

  const getWorkspace = async (id) => {
    const res = await detailWorkspace(id);
    setWorkspace(res);
    setWorkspaceManager(res.user.filter((user) => user.role === 'Manager'));
  };

  const deleteManagerButton = async () => {
    await deleteManager({ manager, id });
  };

  useEffect(() => {
    getWorkspace(id);
  }, [isModalOpen]);

  const onFinish = async (values) => {
    isTitle === 'Set_Status' && (await setWorkspaceStatus({ id, values }));
    isTitle === 'Reset_Password' && (await resetPasswordManager({ manager, values }));
    isTitle === 'Add_Manager' && (await addManager({ id, values }));
    isTitle === 'Edit_Workspace' && (await editWorkspace({ id, values }));

    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //data
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (user) => (
        <Space size='middle'>
          <Button type='primary' title={isTitle} onClick={() => showEditPassword(user._id)}>
            Reset Password
          </Button>
          <Button type='primary' title={isTitle} onClick={() => showDeleteManager(user._id)} danger>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  //edit manager password
  const showEditPassword = (_id) => {
    setIsModalOpen(true);
    setManager(_id);
    setTitle('Reset_Password');
  };

  //delete manager
  const showDeleteManager = (_id) => {
    setIsModalOpen(true);
    setManager(_id);
    setTitle('Delete_Manager');
  };

  //edit workspace name
  const showEditWorkspaceName = () => {
    setIsModalOpen(true);
    setTitle('Edit_Workspace');
  };

  //status
  const showStatusModal = () => {
    setIsModalOpen(true);
    setTitle('Set_Status');
  };

  //manager
  const showAddManagerModal = () => {
    setIsModalOpen(true);
    setTitle('Set_Status');
  };

  //Modal Actions
  const handleApprove = () => {
    isTitle === 'Delete_Manager' && deleteManagerButton();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setManager(null);
    setIsModalOpen(false);
    setTitle('');
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
        items={[
          {
            title: 'Admin',
          },
          {
            title: 'Workspaces',
          },
          {
            title: 'Details',
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
        <Row style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Col>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Title style={{ marginBottom: '5px' }} level={4}>
                {workspace?.name} Workspace
              </Title>
              <EditOutlined
                style={{
                  color: 'black',
                  fontSize: '20px',
                }}
                onClick={showEditWorkspaceName}
              />
            </div>
            <Title level={5} style={{ marginTop: '5px' }}>
              Status: {workspace?.status}
            </Title>
          </Col>
          <div
            style={{
              marginBottom: '20px',
              marginTop: '13px',
              display: 'flex',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <Button role='button' title={isTitle} onClick={showStatusModal}>
              Set Status
            </Button>
            <Button role='button' title={isTitle} onClick={showAddManagerModal}>
              Add Manager
            </Button>
          </div>
        </Row>

        <Table
          columns={columns}
          dataSource={workspaceManager}
          pagination={{
            pageSize: 6,
          }}
          rowKey='_id'
          scroll={{ x: true }}
        />

        <ModalAll
          name={isTitle}
          open={isModalOpen}
          onOk={handleApprove}
          onCancel={handleCancel}
          onFinish={onFinish}
        />
      </div>
    </Content>
  );
};

export default WorkspaceDetail;
