import React, { useState } from 'react';
import { Table } from 'antd';
import { Layout, Breadcrumb, theme, Button } from 'antd';
import ModalAll from '../../../src/components/modal/ModalAll';
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
const nameFull = "Huy";
const data = [
  {
    key: '1',
    name:nameFull.charAt(0),
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

  console.log(
    isSubmit
  );
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
        margin: '0 16px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
        <Breadcrumb.Item>Manager </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <Button title={isTitle} onClick={CreateGroup}>Create group</Button>
        <Table columns={columns} dataSource={data} />
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
