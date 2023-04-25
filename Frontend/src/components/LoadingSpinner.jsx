import React from 'react';
import { Alert, Space, Spin } from 'antd';

export const Spinner = (isLoading) => (
  <Space direction='vertical' style={{ width: '100%', maxHeight: '100%' }}>
    {/* <Space>
       <Spin tip='Loading' size='small'>
        <div className='content' />
      </Spin>
      <Spin tip='Loading'>
        <div className='content' />
      </Spin>
      <Spin tip='Loading' size='large'>
        <div className='content' />
      </Spin>
    </Space> */}

    <Spin tip='Loading...' loading={isLoading}>
      <Alert
        message='Please wait a second'
        description='Application is loading information'
        type='info'
      />
    </Spin>
  </Space>
);
