import React from 'react';
import { Form, Layout, Breadcrumb, theme, Row, Col, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
          <UserOutlined />
          <UserOutlined />
        </>
      ),
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <div style={{ marginLeft: '50px' }}>
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
