import React from 'react';
import { Layout, Breadcrumb, theme, Descriptions, Row, Col, Button, Form, Input } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../pages/manager/groupDetails.css';

export default function GroupDetailsPage() {
  const { TextArea } = Input;
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 16, span: 8 },
  };
  return (
    <>
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
          <Breadcrumb.Item>
            <Link to='/manager'>Manager</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/manager/group'>Group</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/manager/group/details'>Details</Link>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row
          style={{
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Col span={24}>
            <Descriptions title='Basic information' />
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
              <Form.Item name='groupName' label='Group Name'>
                <Input className='form-input' />
              </Form.Item>
              <Form.Item name='master' label='Masters'>
                <TextArea rows={6} />
              </Form.Item>
              <Form.Item name='member' label='Members'>
                <TextArea rows={6} />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button className='info-form-button'>Cancel</Button>
                <Button htmlType='submit' className='info-form-button'>
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </>
  );
}
