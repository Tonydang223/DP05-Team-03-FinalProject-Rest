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
import './accountStyle.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AccountTable = ({ dataAccountRequest, checkRole, name, onClick }) => {
  const navigate = useNavigate();
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
      render: (text, record) => {
        if (checkRole === 'Manager') {
          return (
            <div
              // to='/manager/dayoff/details'
              onClick={() => {
                record._id,
                  console.log(
                    '🚀 ~ file: AccountTable.jsx:74 ~ AccountTable ~ record._id:',
                    record._id,
                  );
                navigate(`/manager/${name}/details/${record._id}`);
              }}
            >
              {text}
            </div>
          );
        } else if (checkRole === 'Staff') {
          return (
            <div
              // to='/manager/dayoff/details'
              onClick={() => {
                record._id,
                  console.log(
                    '🚀 ~ file: AccountTable.jsx:74 ~ AccountTable ~ record._id:',
                    record._id,
                  );
                navigate(`/staff/${name}/details/${record._id}`);
              }}
            >
              {text}
            </div>
          );
        }
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Requester',
      dataIndex: 'requester',
      key: 'requester',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 'Rejected':
            return <Tag color='#eb2f06'>{status}</Tag>;
            break;
          case 'Approved':
            return <Tag color='#583da1'>{status}</Tag>;
          case 'Pending':
            return <Tag color='#f6b93b'>{status}</Tag>;
          default:
            break;
        }
      },
    },
    {
      title: 'Verifier',
      dataIndex: 'verifier',
      key: 'verifier',
      className: name === 'request' ? '' : 'hidden-column',
    },
    {
      title: 'Request Date',
      dataIndex: 'request_date',
      key: 'request_date',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        if (record.check_approver === 0) {
          return (
            <Space size='middle'>
              {/* <a style={{ fontSize: '20px' }} title={isTitle}>
                <EditFilled/>
              </a> */}
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalApprove}>
                <CheckCircleFilled />
              </a>
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalReject}>
                <CloseCircleFilled />
              </a>
            </Space>
          );
        } else {
          return (
            <Space size='middle'>
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={showEdit}>
                <UndoOutlined />
              </a>
              {/* <a style={{ fontSize: '20px' }} title={isTitle}>
                <EditFilled/>
              </a> */}
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalApprove}>
                <CheckCircleFilled />
              </a>
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={showModalReject}>
                <CloseCircleFilled />
              </a>
            </Space>
          );
        }
      },
      className: name === 'request' ? '' : 'hidden-column',
    },
  ];
  return (
    <>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={dataAccountRequest}
        scroll={{ x: true }}
      />
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
