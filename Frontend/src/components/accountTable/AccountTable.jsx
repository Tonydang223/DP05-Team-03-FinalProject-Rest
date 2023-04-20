import { React, useState } from 'react';
import { Space, Table, Button, Row, Col } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditFilled,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import ModalAll from '../modal/ModalAll';

//   fake data
const data = [
  {
    key: '1',
    request_for_date: 'John Brown',
    qty: 32,
    status: 'New York No. 1 Lake Park',
    request_date: ['nice', 'developer'],
  },
  {
    key: '2',
    request_for_date: 'John Brown',
    qty: 32,
    status: 'New York No. 1 Lake Park',
    request_date: ['nice', 'developer'],
  },
  {
    key: '3',
    request_for_date: 'John Brown',
    qty: 32,
    status: 'New York No. 1 Lake Park',
    request_date: ['nice', 'developer'],
  },
];

const AccountTable = ({ role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTitle, setTitle] = useState('');

  // Approve modal
  const showModalApprove = () => {
    setIsModalOpen(true);
    setTitle('Approve');
  };

  // reject modal
  const showModalReject = () => {
    setIsModalOpen(true);
    setTitle('Reject');
  };

  // Edit modal
  const showEdit = () => {
    setIsEditOpen(true);
    setTitle('Edit');
  };

  const handleApproveEdit = () => {
    setIsEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
  };

  const handleApprove = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReject = () => {
    setIsModalOpen(false);
  };

  const handleCancelReject = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Resquest for date',
      dataIndex: 'request_for_date',
      key: 'request_for_date',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Request Date',
      key: 'request_date',
      dataIndex: 'request_date',
      //   render: (_, { tags }) => (
      //     <>
      //       {tags.map((tag) => {
      //         let color = tag.length > 5 ? 'geekblue' : 'green';
      //         if (tag === 'loser') {
      //           color = 'volcano';
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showEdit}>
            <EditFilled style={{ color: 'blue' }} />
          </a>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalApprove}>
            <CheckCircleFilled style={{ color: 'green' }} />
          </a>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalReject}>
            <CloseCircleFilled style={{ color: 'red' }} />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row style={{ marginBottom: '20px', gap: '10px', justifyContent: 'center' }}>
        <Button>
          <CheckOutlined /> Approved day off
        </Button>
        <Button>
          <CloseOutlined /> Reject day off
        </Button>
        <Button>
          <UndoOutlined /> Reverted day off
        </Button>
      </Row>
      <Table columns={columns} dataSource={data} scroll={{ x: true }} />
      <ModalAll
        name={isTitle}
        title={isTitle}
        open={isModalOpen}
        onOk={handleApprove}
        onCancel={handleCancel}
      />
      <ModalAll
        name={isTitle}
        title={isTitle}
        open={isModalOpen}
        onOk={handleReject}
        onCancel={handleCancelReject}
      />
      <ModalAll
        name={isTitle}
        open={isEditOpen}
        onOk={handleApproveEdit}
        onCancel={handleCancelEdit}
      />
    </>
  );
};

export default AccountTable;
