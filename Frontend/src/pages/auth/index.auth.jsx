import React from 'react';
import { useEffect, useRef, useState } from 'react';
import 'antd/dist/reset.css';
import './auth.login.css';
import Logo from '../../assets/img/logo.png';
import { Col, Row, Form, Input, Button, Checkbox, Image, Alert } from 'antd';
import { Typography } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import IconGoogle from '../../assets/img/icons-google.png';
import ImageLogin from '../../assets/img/image_login.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { loginFunc } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth, login } from '../../redux/slice/userSlice';
// console.log('🚀 ~ file: index.auth.jsx:45 ~ handleLogin ~ loggedInUser:', loggedInUser);

const { Title, Text } = Typography;

function LoginPage() {
  const inputFocus = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderRoute = (isLoggedIn, userRole) => {
    if (isLoggedIn) {
      switch (userRole) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'Manager':
          navigate('/manager');
          break;
        case 'Staff':
          navigate('/staff');
          break;
      }
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await loginFunc(values);
      const { token, data: loggedInUser } = response.data;

      if (!token) return;

      dispatch(login());
      // dispatch(setAuth(loggedInUser));

      localStorage.setItem('access_token', token);
      localStorage.setItem('user_role', loggedInUser.role);

      // navigate('/');

      if (localStorage.getItem('access_token')) {
        renderRoute(true, response.data.data.role);
      }
    } catch (error) {
      alert('Incorrect. Password please enter again!');
    }
  };

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
                <Image justify='center' src={ImageLogin} alt='Image Login' preview={false} />
              </div>
            </Col>
            <Col span={9} className='right-form-login'>
              <Title className='title-login'>Welcome Back</Title>
              <Text className='text-welcome'>
                To keep connected with us please login with your personal information email address
                and password
              </Text>
              <Form
                className='form-email-password'
                initialValues={{
                  remember: true,
                }}
                onFinish={handleLogin}
              >
                <Form.Item
                  name={'email'}
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
                  name={'password'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password',
                    },
                    {
                      min: 3,
                    },
                    {
                      validator: (_, value) =>
                        !value.includes(' ')
                          ? Promise.resolve()
                          : Promise.reject(new Error('No spaces allowed')),
                    },
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
                    {/* <img src={IconGoogle} alt='' /> */}
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
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
