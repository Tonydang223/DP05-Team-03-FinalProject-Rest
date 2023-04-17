import React from 'react';
import { Descriptions } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './dayoffDetails.css';

export const DayoffInfo = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
          <Button type='primary' className='info-form-button'>
            <RedoOutlined />
          </Button>
          <Button type='primary' htmlType='submit' className='info-form-button'>
            <CheckOutlined />
          </Button>
          <Button type='primary' className='info-form-button'>
            <CloseOutlined />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
