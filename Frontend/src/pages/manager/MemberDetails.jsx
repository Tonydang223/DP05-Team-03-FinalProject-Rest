import React from 'react';
import { Form, Input, Typography } from 'antd';

const MemberDetails = () => {
  return (
    <div className='form-wrapper'>
      <div>
        <Typography.Title level={1} style={{ fontSize: '14px'}}>Basic Information</Typography.Title>
      </div>
      <Form>
        <Form.Item label='First name' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='Khoa' />
        </Form.Item>
        <Form.Item label='Last name' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='Nguyen' />
        </Form.Item>
        <Form.Item label='Email' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='khoa.nguyen@stunited.vn' />
        </Form.Item>
        <Form.Item label='Slack ID' labelCol={{ xs: 24, sm: 6 }} wrapperCol={{ xs: 24, sm: 18 }}>
          <Input placeholder='1234dd' />
        </Form.Item>
      </Form>
    </div>
  );
};

export default MemberDetails;
