import React from 'react';
import { Form, Layout, Breadcrumb, theme, Row, Col, Table, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ModalAll from '../../components/modal/ModalAll';
import { useState } from 'react';

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
        margin: '0 16px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
        <Breadcrumb.Item>Members</Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <div>
          <Typography.Title
            underline
            level={1}
            style={{ fontSize: '18px', marginLeft: '29px', float: 'left', color: '#1677ff' }}
          >
            Branding
          </Typography.Title>
          <button
            title={isTitle}
            onClick={showAddApprove}
            style={{ marginLeft: '990px', backgroundColor: '#1677ff', color: 'white' }}
          >
            + New Workspace
          </button>
          <ModalAll
            name={isTitle}
            open={isModalOpen}
            onOk={handApproveAdd}
            onCancel={handleCancelAdd}
          />
          <Avatar
            size='large'
            icon={<UserOutlined />}
            style={{ marginRight: '100px', float: 'right' }}
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
