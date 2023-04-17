import React from 'react';
import { useEffect, useRef } from 'react';
import 'antd/dist/reset.css';
import './auth.login.css';
import Logo from '../../assets/img/logo.png';
import { Col, Row, Form, Input, Button, Checkbox, Image } from 'antd';
import { Typography } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import IconGoogle from '../../assets/img/icons-google.png';
import ImageLogin from '../../assets/img/image_login.jpg';

const { Title, Text } = Typography;

function LoginPage() {
  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  }, []);
  return (
    <div className='login-form-bg'>
      <div className='form-login'>
        <div className='logo-form-login'>
          <Image src={Logo} alt='LogoLogo' className='img-logo' preview={false} />
        </div>
        <div className='left-image-form'>
          <Row justify='center'>
            <Col span={12} className='col-image-login'>
              <div className='image-login'>
                <Image align justify='center' src={ImageLogin} alt='Image Login' preview={false} />
              </div>
            </Col>
            <Col span={9} className='right-form-login'>
              <Title className='title-login'>Welcome Back</Title>
              <Text className='text-welcome'>
                To keep connected with us please login with your personal information email address
                and password
              </Text>
              <Form className='form-email-password'>
                <Form.Item
                  name={'Email'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email',
                    },
                    { type: 'email' },
                  ]}
                  hasFeedback
                >
                  <Input
                    size='large'
                    className='input-email'
                    placeholder='Enter your email'
                    prefix={<AiOutlineMail />}
                    ref={inputFocus}
                  />
                </Form.Item>
                <Form.Item
                  name={'Password'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password',
                    },
                    {
                      min: 8,
                    },
                    {
                      validator: (_, value) =>
                        !value.includes(" ")
                          ? Promise.resolve()
                          : Promise.reject(new Error("No spaces allowed"))
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size='large'
                    placeholder='Enter your password'
                    prefix={<RiLockPasswordLine />}
                    type='password'
                  />
                </Form.Item>
                <Row
                  style={{ alignItems: 'baseline' }}
                  justify='space-between'
                  className='option-and-link-change'
                >
                  <Col className='col-checkbox'>
                    <Checkbox className='checkbox-remember-me'>Remember me</Checkbox>
                  </Col>
                  <Col className='link-change-password'>
                    <a href='/'>Change password</a>
                  </Col>
                </Row>
                <Button
                  block
                  className='button-login'
                  align='center'
                  type='primary'
                  htmlType='submit'
                >
                  Login
                </Button>
                <div className='login-other-method'>
                  <Text className='text-other-method'>Or you can join with</Text>
                  <div className='icons-method'>
                    <img src={IconGoogle} alt='' />
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
