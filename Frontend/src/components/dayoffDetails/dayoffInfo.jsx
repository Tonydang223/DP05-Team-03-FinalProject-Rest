import React from 'react';
import { Descriptions } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './dayoffDetails.css';

export const DayoffInfo = () => {
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
          <Button type='primary' className='info-form-button'>
            <RedoOutlined />
          </Button>
          <Button type='primary' htmlType='submit' className='info-form-button'>
            <CheckOutlined />
          </Button>
          <Button type='primary' className='info-form-button'>
            <CloseOutlined />
          </Button>
          <Button type='primary' className='info-form-button'>
            <EditOutlined />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
