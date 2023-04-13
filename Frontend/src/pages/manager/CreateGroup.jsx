import React from 'react';
import { useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
import "./CreateGroup.css";
const { Title, Text } = Typography;
const CreateGroup = () => {
  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <div>
      <Title className="title-login">Welcome Back</Title>
      <Text className="text-welcome">
        To keep connected with us please login with your personal information email address and
        password
      </Text>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete='off'
        className="form-input"
      >
        <Form.Item
          label='Group Name'
          name='groupname'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            { min: 2 },
          ]}
          hasFeedback
        >
          <Input
            className='input-group-name'
            placeholder='Enter your group name'
            ref={inputFocus}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit' className="button-create-group">
            Create Group
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateGroup;
