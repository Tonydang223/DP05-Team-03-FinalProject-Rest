import React from 'react';
import { Table, Layout, Breadcrumb } from 'antd';
import { useState } from 'react';
import ModalAll from '../../components/modal/ModalAll';
import { EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Content } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    width: '30%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '40%',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '30%',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    email: 'New York No. 1 Lake Park',
    action: (
      <Link to='/manager/member-details' style={{ fontSize: '20px' }}>
        <EditFilled style={{ color: 'blue' }} />
      </Link>
    ),
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    email: 'London No. 2 Lake Park',
  },
];

export default function ManagerPage() {
  const onChange = (pagination) => {
    console.log('params', pagination);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');

  const showAddMember = () => {
    setIsModalOpen(true);
    setTitle('Add_Member');
  };
  
  const handApproveAdd = () => {
    setIsModalOpen(false);
  };
  
  const handleCancelAdd = () => {
    setIsModalOpen(false);
  };
  return (
    <>
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
        </Breadcrumb>
        <div>
          <button
            title={isTitle}
            onClick={showAddMember}
            style={{
              float: 'right',
              marginBottom: '30px',
              fontWeight: 'bold',
              marginRight: '20px',
              backgroundColor: '#1677ff',
              color: 'white',
            }}
          >
            + New member
          </button>
          <ModalAll
            name={isTitle}
            open={isModalOpen}
            onOk={handApproveAdd}
            onCancel={handleCancelAdd}
          />
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: true }} />
      </Content>
    </>
  );
}
