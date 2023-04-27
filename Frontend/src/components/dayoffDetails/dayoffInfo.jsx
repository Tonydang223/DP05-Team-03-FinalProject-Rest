import React from 'react';
import { Descriptions } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert, Typography } from 'antd';
import './dayoffDetails.css';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import ModalAll from '../modal/ModalAll';
import { useParams } from 'react-router-dom';
import { approveRequest, revertRequest } from '../../services/axiosInstance';

const initialErrorMessage = {
  message: '',
  visible: false,
};
const { Title } = Typography;

export const DayoffInfo = ({ startDate, endDate, time, quantity, reason, status, id, master }) => {
  // console.log('🚀 ~ file: dayoffInfo.jsx:13 ~ DayoffInfo ~ id:', id);
  const userRole = localStorage.getItem('user_role');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  // console.log('🚀 ~ file: dayoffInfo.jsx:18 ~ DayoffInfo ~ isTitle:', isTitle);
  const [updatedData, setUpdatedData] = useState();
  const [requestType, setRequestType] = useState();
  // console.log('🚀 ~ file: dayoffInfo.jsx:20 ~ DayoffInfo ~ requestType:', requestType);
  const [visbleAlert, setVisibleAlert] = useState(initialErrorMessage);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const showModalApprove = () => {
    setIsModalOpen(true);
    setTitle('Approve');
    setRequestType('Approved');
  };

  // reject modal
  const showModalReject = () => {
    setIsModalOpen(true);
    setTitle('Reject');
    setRequestType('Rejected');
  };

  const showModalEdit = () => {
    setIsModalOpen(true);
    setTitle('Revert');
    setRequestType('Revert');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleApproveReject = async () => {
    try {
      if (isTitle === 'Approve') {
        const response = await approveRequest(id, requestType);
        console.log(
          '🚀 ~ file: dayoffInfo.jsx:61 ~ handleApproveReject ~ response:',
          response.message,
        );

        setIsModalOpen(false);
      } else if (isTitle === 'Reject') {
        await approveRequest(id, requestType);
        setIsModalOpen(false);
      } else if (isTitle === 'Revert') {
        // alert('123');
        await revertRequest(id);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsModalOpen(false);
        setVisibleAlert({ message: error?.response?.data?.message, visible: true });
      }
    }
  };
  useEffect(() => {});

  return (
    <div>
      <Descriptions title='Basic Infomation' />
      <Form
        {...layout}
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        colon={false}
      >
        <Form.Item label='From'>
          <Input
            className='form-input'
            bordered={false}
            disabled={true}
            value={moment(startDate).format('MMMM Do YYYY')}
          />
        </Form.Item>
        <Form.Item label='To'>
          <Input
            className='form-input'
            bordered={false}
            disabled={true}
            value={moment(endDate).format('MMMM Do YYYY')}
          />
        </Form.Item>
        <Form.Item label='Time'>
          <Input className='form-input' bordered={false} disabled={true} value={time} />
        </Form.Item>
        <Form.Item label='Quantity'>
          <Input className='form-input' bordered={false} disabled={true} value={quantity} />
        </Form.Item>
        <Form.Item label='Reason'>
          <Input className='form-input' bordered={false} disabled={true} value={reason} />
        </Form.Item>
        <Form.Item label='Status'>
          <Input className='form-input' bordered={false} disabled={true} value={status} />
        </Form.Item>

        <Descriptions title='Action' />
        {userRole === 'Manager' && status === 'Approved' ? (
          <>
            <Title level={3}>No Action Here</Title>
          </>
        ) : // : userRole === 'Manager' && status === 'Pending' ? (
        //   <>
        //     <Button type='primary' className='info-form-button' onClick={() => showModalApprove()}>
        //       <CheckOutlined />
        //     </Button>
        //     <Button type='primary' className='info-form-button' onClick={() => showModalReject()}>
        //       <CloseOutlined />
        //     </Button>
        //   </>
        // )
        userRole === 'Staff' && status === 'Approved' ? (
          <Form.Item>
            <Button type='primary' className='info-form-button' onClick={() => showModalEdit()}>
              <RedoOutlined />
            </Button>
          </Form.Item>
        ) : userRole === 'Staff' ? (
          <>
            <Button type='primary' className='info-form-button' onClick={() => showModalApprove()}>
              <CheckOutlined />
            </Button>
            <Button type='primary' className='info-form-button' onClick={() => showModalReject()}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <>
            <Title level={3}>No Action Here</Title>
          </>
        )}
      </Form>
      <ModalAll
        name={isTitle}
        title={isTitle}
        open={isModalOpen}
        onOk={handleApproveReject}
        onCancel={handleCancel}
      />
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
    </div>
  );
};
