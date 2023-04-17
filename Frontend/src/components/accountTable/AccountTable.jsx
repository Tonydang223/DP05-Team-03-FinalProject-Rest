import { React, useState } from 'react';
import { Space, Table } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, EditFilled } from '@ant-design/icons';
import ModalApproveRequest from '../modal/ModalApproveRequest';
import ModalEditRequest from '../modal/ModalEditRequest';

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

const AccountTable = ({role}) => {
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
          <a style={{ fontSize: '20px' }} title='Edit' onClick={showEdit}>
            <EditFilled />
          </a>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalApprove}>
            <CheckCircleFilled />
          </a>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalReject}>
            <CloseCircleFilled />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ x: true }}/>
      <ModalApproveRequest
        title={isTitle}
        open={isModalOpen}
        onOk={handleApprove}
        onCancel={handleCancel}
      />
      <ModalApproveRequest
        title={isTitle}
        open={isModalOpen}
        onOk={handleReject}
        onCancel={handleCancelReject}
      />
      <ModalEditRequest open={isEditOpen} onOk={handleApproveEdit} onCancel={handleCancelEdit} />
    </>
  );
};

export default AccountTable;
