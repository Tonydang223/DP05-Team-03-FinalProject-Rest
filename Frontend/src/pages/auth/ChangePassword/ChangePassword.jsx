import React from 'react';
import { useEffect, useRef } from 'react';
import 'antd/dist/reset.css';
import { Col, Row, Form, Input, Button, Image } from 'antd';
import { Typography } from 'antd';
import { RiLockPasswordLine } from 'react-icons/ri';
import Logo from '../../../assets/img/logo.png';
import ImageLogin from '../../../assets/img/image_login.jpg';
import './ChangePassword.css';
const { Title, Text } = Typography;

const ChangePassword = () => {
  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  }, []);
  return (
    <div className='login-form-bg'>
      <div className='form-login'>
        <div className='logo-form-login'>
          <Image src={Logo} alt='Logo' className='img-logo' preview={false} />
        </div>
        <div className='left-image-form'>
          <Row justify='center'>
            <Col span={12} className='col-image-login'>
              <div className='image-login'>
                <Image src={ImageLogin} alt='img-login' preview={false} />
              </div>
            </Col>
            <Col span={9} className='right-form-login'>
              <Title className='title-login'>Change password</Title>
              <Form className='form-email-password'>
                <Form.Item
                  name={'OldPassword'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your old password',
                    },
                    {
                      min: 8,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    size='large'
                    className='input-email'
                    placeholder='Enter your old password'
                    prefix={<RiLockPasswordLine />}
                    ref={inputFocus}
                    type='password'
                  />
                </Form.Item>
                <Form.Item
                  name={'NewPassword'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your new password',
                    },
                    {
                      min: 8,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size='large'
                    placeholder='Enter your new password'
                    prefix={<RiLockPasswordLine />}
                    type='password'
                  />
                </Form.Item>
                <Form.Item
                  name={'ConfirmNewPassword'}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm new password',
                    },
                    {
                      min: 8,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('NewPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Two passwords do not match');
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size='large'
                    placeholder='Enter confirm new password'
                    prefix={<RiLockPasswordLine />}
                    type='password'
                  />
                </Form.Item>
                <Button
                  block
                  className='button-login'
                  align='center'
                  type='primary'
                  htmlType='submit'
                >
                  Change Password
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
