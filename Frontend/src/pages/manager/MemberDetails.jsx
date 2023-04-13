import React from 'react';
import { Form, Input, Typography } from 'antd';
import ButtonComponents from '../../components/ButtonComponents.jsx';

const MemberDetails = () => {
  return (
    <div className='form-wrapper'>
      <div>
        <Typography.Title level={1} style={{ fontSize: '16px', marginLeft: '29px' }}>
          Basic Information
        </Typography.Title>
      </div>
      <Form style={{ marginLeft: '-355px' }}>
        <Form.Item label='First name' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='Khoa' style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item label='Last name' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='Nguyen' style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item label='Email' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='khoa.nguyen@stunited.vn' style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item label='Slack Id' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='1234dd' style={{ width: '250px' }} />
        </Form.Item>
      </Form>
      <ButtonComponents />
    </div>
  );
};

export default MemberDetails;
