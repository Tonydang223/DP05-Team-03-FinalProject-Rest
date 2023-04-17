import React from 'react';
import { Form, Input, Layout, Breadcrumb, theme } from 'antd';
import ButtonComponents from '../../components/ButtonComponents.jsx';
// import './memberDetail.css';
const { Content } = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const MemberDetails = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: '0 16px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
        <Breadcrumb.Item>Members</Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <div>
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <div className='title-text'>
              <h2>Basic Information</h2>
            </div>
            <Form.Item name={['user', 'name']} label='First Name'>
              <Input placeholder='Khoa' />
            </Form.Item>
            <Form.Item name={['user', 'name']} label='Last Name'>
              <Input placeholder='Nguyen' />
            </Form.Item>
            <Form.Item name={['user', 'email']} label='Email'>
              <Input placeholder='KhoaNguyen@gmail.com' />
            </Form.Item>
            <Form.Item name={['user', 'name']} label='Slack Id'>
              <Input placeholder='12345' />
            </Form.Item>
           
          </Form>
        </div>

        <ButtonComponents />
      </div>
    </Content>
  );
};

export default MemberDetails;
