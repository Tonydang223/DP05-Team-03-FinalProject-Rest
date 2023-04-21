import React from 'react';
import { Form, Input, Layout, Breadcrumb, theme, Typography } from 'antd';
import ButtonComponents from '../../components/ButtonComponents.jsx';
import { useState } from 'react';
import ModalAll from '../../components/modal/ModalAll';
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isTitle, setTitle] = useState('');

  const showAddApprove = () => {
    setIsModalOpen(true);
    setTitle('Add_Member');
  };

  const handApproveAdd = () => {
    setIsModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpen(false);
  };

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
          <Typography.Title
            underline
            level={1}
            style={{ fontSize: '18px', marginLeft: '29px', float: 'left', color: '#1677ff' }}
          >
            Branding
          </Typography.Title>
          <button
            title={isTitle}
            onClick={showAddApprove}
            style={{ marginLeft: '800px', backgroundColor: '#1677ff', color: 'white' }}
          >
            + New Workspace
          </button>
          <ModalAll
            name={isTitle}
            open={isModalOpen}
            onOk={handApproveAdd}
            onCancel={handleCancelAdd}
          />
        </div>
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
