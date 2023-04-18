import React from 'react';
import { useEffect, useRef } from 'react';
import { Form, Input, Row, Col, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import "./CreateGroup.css";
import {Layout, Breadcrumb, theme} from 'antd'
const {Content} = Layout;
const { Title, Text } = Typography;
const CreateGroup = () => {
  // const inputFocus = useRef(null);
  // useEffect(() => {
  //   inputFocus.current.focus();
  // }, []);
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
      <Breadcrumb.Item>Account</Breadcrumb.Item>
      <Breadcrumb.Item>Request</Breadcrumb.Item>
    </Breadcrumb>
    <div
      style={{
        padding: 24,
        minHeight: 600,
        background: colorBgContainer,
      }}
    >
      <Row>
        <Col>
          <Space wrap>
            <Title>Create new group</Title> 
          </Space>
          <Form>
            <Form.Item>
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  </Content>
  );
};

export default CreateGroup;
