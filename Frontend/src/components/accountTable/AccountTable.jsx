import { React, useState } from 'react';
import { Space, Table, Button, Row, Col, Tag } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditFilled,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import ModalAll from '../modal/ModalAll';
import './accountStyle.css'
import {Link} from 'react-router-dom';


const AccountTable = ({dataAccountRequest, checkRole, name}) => {
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
      title: 'Request for Date',
      dataIndex: 'request_for_date',
      key: 'request_for_date',
      render: (text) => {
      if(checkRole === 'Manager')
      {
        return (
          <Link to='/manager/dayoff/details'>{text}</Link>
        )
      }
      else if (checkRole === 'Staff')
        {
          return (
            <Link to='/staff/dayoff/details'>{text}</Link>
          )
        }
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Requester',
      dataIndex: 'requester',
      key: 'requester'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {          
            switch (status) {
              case 'Rejected':
                return (
                  <Tag color="#eb2f06">
                      {status}
                  </Tag>
                )
                break;
              case 'Approved':
                return (
                  <Tag color="#583da1">
                      {status}
                  </Tag>
                )
                case 'Pending':
                  return (
                    <Tag color="#f6b93b">
                        {status}
                    </Tag>
                  )
              default:
                break;
            }
      }
    },
    {
      title: 'Verifier',
      dataIndex: 'verifier',
      key: 'verifier',
      className: name === 'request' ? '':'hidden-column'
    },
    {
      title: 'Request Date',
      dataIndex: 'request_date',
      key: 'request_date'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showEdit}>
            <EditFilled style={{ color: 'blue' }} />
          </a>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalApprove}>
            <CheckCircleFilled  />
          </a>
          <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalReject}>
            <CloseCircleFilled />
          </a>
        </Space>
      ),
      className: name === 'request' ? '':'hidden-column'
    },
  ];
  return (
    <>
      <Table rowKey={record => record._id} columns={columns} dataSource={dataAccountRequest} scroll={{ x: true }} />
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
