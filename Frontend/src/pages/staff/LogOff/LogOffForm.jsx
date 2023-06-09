import React from 'react';
import 'antd/dist/reset.css';
import { Col, Row, Form, Space, Radio, DatePicker, Select, Input, Button } from 'antd';
import { Typography } from 'antd';
const { Title, Text } = Typography;
import { Layout, Breadcrumb, theme } from 'antd';
import './LogOffFrom.css';
const { Content } = Layout;
const { TextArea } = Input;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logOffForm } from '../../../services/axiosInstance';
import { useSelector } from 'react-redux';
import moment from 'moment';

const LogOffForm = () => {
  const validateStartDate = (_, value) => {
    if (value && value < moment().startOf('day')) {
      return Promise.reject(new Error('Start date must be greater than or equal to today'));
    }
    return Promise.resolve();
  };
  const [form] = Form.useForm();
  const validateEndDate = (_, value) => {
    const { getFieldValue } = form;
    const startDate = getFieldValue('from');
    if (value && value <= startDate) {
      return Promise.reject(new Error('End date must be greater than start date'));
    }
    return Promise.resolve();
  };
  const { user } = useSelector((state) => state.auth);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [value, setValue] = useState('Off');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onFinish = async (values) => {
    await logOffForm({ ...values });
  };
  return (
    <Content
      style={{
        margin: '0 45px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Staff</Breadcrumb.Item>
        <Breadcrumb.Item>Send Request</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
        }}
      >
        <div scroll={{ x: true }}>
          <Row className='form-log-off'>
            <Col xl={6} lg={6} md={6} sm={6} xs={5}>
              <div className='type-day-off'>
                <Text>Type of day off</Text>
              </div>
              <div className='day-from'>
                <Text>From</Text>
              </div>
              <div className='day-to'>
                <Text>To</Text>
              </div>
              <div className='quantity'>
                <Text>Quantity</Text>
              </div>
              <div className='reason'>
                <Text>Reason</Text>
              </div>
            </Col>
            <Col xl={18} lg={6} md={6} sm={6} xs={5}>
              {user && (
                <Form onFinish={onFinish} form={form}>
                  <Form.Item className='log-off' name='type_of_work' initialValue='Off'>
                    <Radio.Group onChange={onChange} value={value}>
                      <div className='radio-button'>
                        <Radio value='Off'>Off</Radio>
                        <br />
                        <Radio value='WAH'>WAH</Radio>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                  <Space wrap>
                    <Form.Item
                      className='log-off'
                      name='from'
                      rules={[
                        {
                          required: true,
                          message: 'Please choose day start off',
                        },
                        { validator: validateStartDate },
                      ]}
                      hasFeedback
                    >
                      <DatePicker className='day-start-off' />
                    </Form.Item>
                    <Form.Item
                      className='log-off'
                      name='time'
                      rules={[
                        {
                          required: true,
                          message: 'Please select a time off duration',
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        className='select'
                        showSearch
                        placeholder='Time off Duration'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: 'Morning',
                            label: 'Morning',
                          },
                          {
                            value: 'Afternoon',
                            label: 'Afternoon',
                          },
                          {
                            value: 'All day',
                            label: 'All day',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Space>
                  <Form.Item
                    className='log-off-end-day'
                    name='to'
                    rules={[
                      {
                        required: true,
                        message: 'Please choose day end off',
                      },
                      { validator: validateEndDate },
                    ]}
                    hasFeedback
                  >
                    <DatePicker className='day-end-off' />
                  </Form.Item>
                  <Form.Item
                    className='log-off'
                    name='quantity'
                    rules={[
                      {
                        required: true,
                        message: 'Please input quantity',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder='0.5 1 2 3...' className='input-quantity' />
                  </Form.Item>
                  <Form.Item
                    name={'reason'}
                    rules={[
                      {
                        required: true,
                        message: 'Please input reason of day off',
                      },
                      { min: 4 },
                    ]}
                    hasFeedback
                  >
                    <TextArea rows={3} className='text-area' />
                  </Form.Item>

                  <Form.Item>
                    <Space wrap>
                      <Link to='/staff'>
                        <Button className='button-cancel'>Cancel</Button>
                      </Link>
                      <Button type='primary' htmlType='submit' block className='button-send'>
                        Send
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default LogOffForm;
