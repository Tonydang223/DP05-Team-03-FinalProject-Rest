import { useState, useEffect } from 'react';
import { Space, Table, Button, Form, Input, Tag, Alert, Modal, Select, notification } from 'antd';
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
import { approveRequest, revertRequest, updateRequest } from '../../services/axiosInstance';
import { useSelector } from 'react-redux';

const AccountTable = ({ dataAccountRequest, checkRole, name, fetchData }) => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const initialErrorMessage = {
    message: '',
    visible: false,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRevertOpen, setIsRevertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [visbleAlert, setVisibleAlert] = useState(initialErrorMessage);
  const [requestId, setRequestId] = useState(null);
  const [typeApprove, setTypeApprove] = useState(null);

  const [oldData, setOldData] = useState({
    from: '',
    to: '',
    quantity: '',
    reason: '',
    status: '',
    type_of_works: '',
  });

  const [form] = Form.useForm();

  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '-');

  // Approve modal
  const showModalApprove = (id) => {
    setIsApproveOpen(true);
    setRequestId(id);
    setTypeApprove('Approved');
    setTitle('Approve');
    console.log(id);
  };

  // reject modal
  const showModalReject = (id) => {
    setIsModalOpen(true);
    setRequestId(id);
    setTypeApprove('Rejected');
    setTitle('Reject');
  };

  // Revert modal
  const showRevert = (id) => {
    setIsRevertOpen(true);
    setRequestId(id);
    setTitle('Revert');
  };

  // Edit modal
  const showEdit = (id) => {
    setIsEditOpen(true);
    setRequestId(id);
    setTitle('Edit');
  };

  const handleApproveRevert = () => {
    revertRequest(requestId)
      .then(() => {
        setIsRevertOpen(false);
        fetchData();
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          setVisibleAlert({ message: error?.response?.data?.message, visible: true });
        }
        setIsRevertOpen(false);
      });
  };

  const handleCancelRevert = () => {
    setIsRevertOpen(false);
    fetchData();
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
  };

  const handleApprove = () => {
    approveRequest(requestId, typeApprove)
      .then(() => {
        setIsApproveOpen(false);
        fetchData();
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        if (error?.response?.status === 400 || error?.response?.status === 403) {
          setVisibleAlert({ message: error?.response?.data?.message, visible: true });
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
        setVisibleAlert({ message: error?.response?.data?.message, visible: true });
      });
  };

  const handleCancelReject = () => {
    setIsModalOpen(false);
  };

  const handleSubmitEdit = async (values) => {
    try {
      await updateRequest({ requestId, values });
      notification.success({
        message: 'Request updated',
        description: 'The request has been successfully updated.',
      });
      fetchData();
    } catch (error) {
      console.error(error);
      setIsEditOpen(false);
      notification.error({
        message: 'Error Message',
        description: error.response.data.message,
      });
      fetchData();
    }
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
                  console.log('🚀 ~ file: AccountTable.jsx:74 ~ AccountTable ~ record._id:', name);
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
      title: 'Request Date',
      dataIndex: 'request_date',
      key: 'request_date',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const handleApproveClick = () => {
          showModalApprove(record._id);
        };

        const handleRejectClick = () => {
          showModalReject(record._id);
        };

        const handleEditClick = () => {
          showEdit(record._id);
          setOldData({
            from: formatDate(record.from),
            to: formatDate(record.to),
            time: record.time,
            quantity: record.quantity,
            reason: record.reason,
            status: record.status,
            type_of_works: record.type_of_work,
          });
          console.log(record.time);
        };
        if (name === 'request') {
          if (checkRole === 'Staff') {
            return (
              <>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleEditClick}>
                  <EditFilled />
                </a>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleApproveClick}>
                  <CheckCircleFilled />
                </a>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleRejectClick}>
                  <CloseCircleFilled />
                </a>
              </>
            );
          } else {
            return (
              <Space size='middle'>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleEditClick}>
                  <EditFilled />
                </a>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleApproveClick}>
                  <CheckCircleFilled />
                </a>
                <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleRejectClick}>
                  <CloseCircleFilled />
                </a>
              </Space>
            );
          }
        } else if (name === 'day-off' && record.status != 'Rejected') {
          const handleRevertClick = () => {
            showRevert(record._id);
          };
          return (
            <Space>
              <a style={{ fontSize: '20px' }} title={isTitle} onClick={handleRevertClick}>
                <UndoOutlined />
              </a>
            </Space>
          );
        }
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' style={{ width: '100%', paddingBottom: '15px' }}>
        {visbleAlert.visible && (
          <Alert
            message='Error'
            description={`${visbleAlert.message}`}
            type='error'
            showIcon
            closable
            onClose={() => setVisibleAlert(initialErrorMessage)}
          />
        )}
      </Space>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={dataAccountRequest}
        scroll={{ x: true }}
      />
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

      <Modal name={isTitle} open={isEditOpen} onOk={form.submit} onCancel={handleCancelEdit}>
        <Form
          form={form}
          onFinish={handleSubmitEdit}
          style={{ marginTop: '20px' }}
          initialValues={oldData}
        >
          <Form.Item label='From' name='from'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='To' name='to'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='Reason' name='reason'>
            <Input />
          </Form.Item>
          <Form.Item label='Status' name='status'>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name='time'
            label='Time'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select allowClear>
              <Select.Option value='All Day'>All Day</Select.Option>
              <Select.Option value='Morning'>Morning</Select.Option>
              <Select.Option value='Afternoon'>Afternoon</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='type_of_works'
            label='Type Of Works'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select allowClear>
              <Select.Option value='Off'>Off</Select.Option>
              <Select.Option value='WAH'>WAH</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AccountTable;
