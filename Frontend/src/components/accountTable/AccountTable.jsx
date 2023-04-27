import { React, useState, useEffect } from 'react';
import { Space, Table, Button, Form, Input, Tag, Alert, Modal } from 'antd';
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
import { approveRequest, revertRequest } from '../../services/axiosInstance';

const AccountTable = ({dataAccountRequest, checkRole, name, fetchData}) => {

  const initialErrorMessage = {
    message: '',
    visible: false
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRevertOpen, setIsRevertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [visbleAlert, setVisibleAlert] = useState(initialErrorMessage)
  const [requestId, setRequestId] = useState(null);
  const [typeApprove, setTypeApprove] = useState(null);

  // Approve modal
  const showModalApprove = (id) => {
    setIsApproveOpen(true);
    setRequestId(id);
    setTypeApprove("Approved");
    setTitle('Approve');
    console.log(id);
  };

  // reject modal
  const showModalReject = (id) => {
    setIsModalOpen(true);
    setRequestId(id);
    setTypeApprove("Rejected");
    setTitle('Reject');
  };

  // Revert modal
  const showRevert = (id) => {
    setIsRevertOpen(true);
    setRequestId(id)
    setTitle('Revert');
  };

  // Edit modal
  const showEdit = (id) => {
    setIsEditOpen(true);
    setRequestId(id)
    setTitle('Edit');
  }

  const handleApproveRevert = () => {
    revertRequest(requestId)
      .then(() => {
        setIsRevertOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelRevert = () => {
    setIsRevertOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
  }

  const handleApprove = () => {
    approveRequest(requestId, typeApprove)
      .then(() => {
      setIsApproveOpen(false);    
      fetchData();  
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      if(error?.response?.status === 400)
      {
        setVisibleAlert({message: error?.response?.data?.message, visible: true});
      }
      setIsApproveOpen(false);
    });
  };

  const handleCancel = () => {
    setIsApproveOpen(false);
  };

  const handleReject = () => {
    approveRequest(requestId, typeApprove)
      .then(() => {
      setIsModalOpen(false);
      fetchData();  
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      setIsModalOpen(false);
      setVisibleAlert({message: error?.response?.data?.message, visible: true});
    });
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
      render: (_, record) => 
      {
          const handleApproveClick = () => {
            showModalApprove(record._id)
          }

          const handleRejectClick = () => {
            showModalReject(record._id);
          }

          const handleEditClick = () => {
            showEdit(record._id)
          }
          if(name === 'request')
          {
            return (
              <Space size='middle'>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleEditClick}>
                  <EditFilled/>
                </a>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleApproveClick} >
                  <CheckCircleFilled  />
                </a>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleRejectClick}>
                  <CloseCircleFilled />
                </a>
              </Space>
            )
          }
          else if (name === "day-off") {
            const handleRevertClick = () => {
              showRevert(record._id)
            }
            return(
            <Space>
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleRevertClick}>
                  <UndoOutlined/>
              </a>
            </Space>
            )
          }
      },
    },
  ];
  return (
    <>
    <Space direction="vertical" style={{ width: '100%', paddingBottom: '15px' }}>
      {visbleAlert.visible && (
      <Alert
      message="Error"
      description={`${visbleAlert.message}`}
      type="error" 
      showIcon
      closable
      onClose={() => setVisibleAlert(initialErrorMessage)}
      />
      )}
    </Space>
      <Table rowKey={record => record._id} columns={columns} dataSource={dataAccountRequest} scroll={{ x: true }} />
      <ModalAll
        name={isTitle}
        title={isTitle}
        open={isApproveOpen}
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
        open={isRevertOpen}
        onOk={handleApproveRevert}
        onCancel={handleCancelRevert}
      />

      <Modal 
        name={isTitle}
        open={isEditOpen}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form initialValues={dataAccountRequest} onFinish="" style={{marginTop: '20px'}}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AccountTable;
