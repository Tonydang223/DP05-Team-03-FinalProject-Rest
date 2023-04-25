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
  Col,
  Row,
} from 'antd';
import './WorkSpaceDetail.css';
import ModalAll from '../../../components/modal/ModalAll';
import { useParams } from 'react-router-dom';
import { detailWorkspace, setWorkspaceStatus } from './../../../services/axiosInstance';
import { useEffect, useState } from 'react';

const { Content } = Layout;
const { Title } = Typography;

const WorkspaceDetail = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [workspace, setWorkspace] = useState(null);

  const getWorkspace = async (id) => {
    const res = await detailWorkspace(id);
    setWorkspace(res);
  };

  useEffect(() => {
    getWorkspace(id);
  }, [isModalOpen]);

  const onFinish = async (values) => {
    await setWorkspaceStatus({ id, values });
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

      render: () => (
        <Space size='middle'>
          <Button type='primary' title={isTitle} onClick={showEditPassword}>
            Reset Password
          </Button>
          <Button type='primary' title={isTitle} onClick={showDeletePassword} danger>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

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
    setTitle('Set_Status');
  };

  const handleApproveAdd = () => {
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
            <Title level={4}>{workspace?.name} Workspace</Title>
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
            <Button role='button' title={isTitle} onClick={showAddApprove}>
              Set Status
            </Button>
            <Button role='button' title={isTitle} onClick={showAddApprove}>
              Add Manager
            </Button>
          </div>
        </Row>

        <Table
          columns={columns}
          dataSource={workspace?.user}
          pagination={{
            pageSize: 6,
          }}
          rowKey='_id'
          scroll={{ x: true }}
        />

        <ModalAll
          name={isTitle}
          open={isModalOpen}
          onOk={handleApproveAdd}
          onCancel={handleCancelAdd}
          onFinish={onFinish}
        />
      </div>
    </Content>
  );
};

export default WorkspaceDetail;
