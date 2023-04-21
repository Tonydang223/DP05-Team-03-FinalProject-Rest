import React, { useState } from 'react';
import { Table } from 'antd';
import { Layout, Breadcrumb, theme, Button, Typography, Space, Row, Col } from 'antd';
import ModalAll from '../../../src/components/modal/ModalAll';
const { Title, Text } = Typography;
import './index.manager.css';
const { Content } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Members',
    dataIndex: 'members',
  },
  {
    title: 'Master',
    dataIndex: 'master',
  },
];
const nameFull = 'Huy';
const data = [
  {
    key: '1',
    name: nameFull.charAt(0),
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'John Brown',
    members: 'Jim Green',
    master: 'Vo Van Thin',
  },
  {
    key: '3',
    name: 'Joe Black',
    members: 'hi',
    master: 'Vo Van Thin',
  },
];

export default function ManagerPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [isSubmit, setSubmit] = useState('');
  // Create Modal
  const CreateGroup = () => {
    setIsCreateOpen(true);
    setTitle('CreateGroup');
  };

  const handleCreateGroup = () => {
    setIsCreateOpen(false);
    // setSubmit('submit');
  };

  const handleCancelCreate = () => {
    setIsCreateOpen(false);
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
        <Breadcrumb.Item>Groups</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 530,
          background: colorBgContainer,
        }}
      >
        <Space wrap className='section1'>
          <Row className='row'>
            <Col xl={8} lg={8} xxl={1} md={13} sm={17} className='col-button'>
              <Button role='button' title={isTitle} onClick={CreateGroup}>
                Create new group
              </Button>
            </Col>
          </Row>
        </Space>
        <Table columns={columns} dataSource={data} scroll={{ x: true }} />
        <ModalAll
          name={isTitle}
          open={isCreateOpen}
          onCancel={handleCancelCreate}
          type={isSubmit}
        />
      </div>
    </Content>
  );
}
