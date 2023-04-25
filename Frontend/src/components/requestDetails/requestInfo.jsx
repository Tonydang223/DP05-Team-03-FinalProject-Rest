import { React, useState } from 'react';
import { Descriptions, Space, Table } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './requestDetail.css';
import ModalAll from '../modal/ModalAll';

export const RequestInfo = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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

  return (
    <div>
      <Descriptions title='Basic Infomation' />
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item name='startDate' label='From'>
          <Input className='form-input' bordered={false} disabled={true} />
        </Form.Item>
        <Form.Item name='endDate' label='To'>
          <Input className='form-input' bordered={false} disabled={true} />
        </Form.Item>
        <Form.Item name='time' label='Time'>
          <Input className='form-input' bordered={false} disabled={true} />
        </Form.Item>
        <Form.Item name='quantity' label='Quantity'>
          <Input className='form-input' bordered={false} disabled={true} />
        </Form.Item>
        <Form.Item name='reason' label='Reason'>
          <Input className='form-input' bordered={false} disabled={true} />
        </Form.Item>
        <Form.Item name='status' label='Status'>
          <Input className='form-input' bordered={false} disabled={true} />
        </Form.Item>

        <Descriptions title='Action' />
        <Form.Item>
          <Button type='primary' className='info-form-button' onClick={showEdit}>
            <RedoOutlined />
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            className='info-form-button'
            onClick={showModalApprove}
          >
            <CheckOutlined />
          </Button>
          <Button type='primary' className='info-form-button' onClick={showModalReject}>
            <CloseOutlined />
          </Button>
          <Button type='primary' className='info-form-button'>
            <EditOutlined />
          </Button>
        </Form.Item>

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
      </Form>
    </div>
  );
};
