import React from 'react';
import { Form, Layout, Breadcrumb, theme, Row, Col, Table, Button, Avatar, Space } from 'antd';
import { UserOutlined, InfoCircleFilled } from '@ant-design/icons';
import ModalAll from '../../components/modal/ModalAll';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Workspaces = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isTitle, setTitle] = useState('');

  const showAddApprove = () => {
    setIsModalOpen(true);
    setTitle('Add_Workspace');
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
        margin: '0 45px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
        <Breadcrumb.Item>All Workspaces</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 530,
          background: colorBgContainer,
        }}
      >
        <div>
          <Button role='button' title={isTitle} onClick={showAddApprove}>
            Add new workspace
          </Button>
          <ModalAll
            name={isTitle}
            open={isModalOpen}
            onOk={handApproveAdd}
            onCancel={handleCancelAdd}
          />
        </div>
        <div>
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <div style={{ marginLeft: '50px', marginTop: '100px' }}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                  <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default Workspaces;
