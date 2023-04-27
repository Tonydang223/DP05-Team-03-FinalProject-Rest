import React from 'react';
import { Descriptions } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './dayoffDetails.css';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import ModalAll from '../modal/ModalAll';
import { useParams } from 'react-router-dom';

export const DayoffInfo = ({ startDate, endDate, time, quantity, reason, status, id }) => {
  console.log('🚀 ~ file: dayoffInfo.jsx:13 ~ DayoffInfo ~ id:', id);
  const userRole = localStorage.getItem('user_role');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [updatedData, setUpdatedData] = useState();

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
  };

  // reject modal
  const showModalReject = () => {
    setIsModalOpen(true);
    setTitle('Reject');
  };

  const showModalEdit = () => {
    setIsModalOpen(true);
    setTitle('Edit');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleApproveReject = () => {
    if (isTitle === 'Approve') {
      alert('123');
    } else if (isTitle === 'Reject') {
      alert('456');
    } else {
      alert('789');
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
          <></>
        ) : userRole === 'Manager' && status === 'Pending' ? (
          <>
            <Button type='primary' className='info-form-button' onClick={() => showModalApprove()}>
              <CheckOutlined />
            </Button>
            <Button type='primary' className='info-form-button' onClick={() => showModalReject()}>
              <CloseOutlined />
            </Button>
          </>
        ) : userRole === 'Staff' ? (
          <Form.Item>
            <Button type='primary' className='info-form-button' onClick={() => showModalEdit()}>
              <RedoOutlined />
            </Button>
          </Form.Item>
        ) : (
          <></>
        )}
      </Form>
      <ModalAll
        name={isTitle}
        title={isTitle}
        open={isModalOpen}
        onOk={handleApproveReject}
        onCancel={handleCancel}
      />
    </div>
  );
};
