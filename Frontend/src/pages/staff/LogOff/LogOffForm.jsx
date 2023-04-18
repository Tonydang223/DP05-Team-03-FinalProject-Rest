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

const LogOffForm = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
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
        <Breadcrumb.Item>Staff</Breadcrumb.Item>
        <Breadcrumb.Item>Log off form</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <div>
          <Title className='title-form-log-off'>Log off form</Title>
          <Row className="form-log-off">
            <Col xl={6} lg={6} md={6} sm={6} xs={4}>
              <Space direction='vertical'>
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
              </Space>
            </Col>
            <Col xl={18} lg={18} md={18} sm={18} xs={20}>
              <Form>
                <Form.Item className='log-off'>
                  <Radio.Group onChange={onChange} value={value}>
                    <div className='radio-button'>
                      <Radio value={1}>Off</Radio>
                      <br />
                      <Radio value={2}>WFH</Radio>
                    </div>
                  </Radio.Group>
                </Form.Item>
                <Space wrap>
                  <Form.Item
                    className='log-off'
                    name={'day_start_day_off'}
                    rules={[
                      {
                        required: true,
                        message: 'Please choose day start off',
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker className='day-start-off' />
                  </Form.Item>
                  <Form.Item
                    className='log-off'
                    name={'select_day'}
                    rules={[
                      {
                        required: true,
                        message: 'Please select a time off work in 1 day',
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      className="select"
                      showSearch
                      placeholder='Choose a time off work in 1 day'
                      optionFilterProp='children'
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Morning',
                        },
                        {
                          value: '2',
                          label: 'Afternoon',
                        },
                        {
                          value: '3',
                          label: 'All day',
                        },
                      ]}
                    />
                  </Form.Item>
                </Space>
                <Form.Item
                  className='log-off-end-day'
                  name={'day_end_day_off'}
                  rules={[
                    {
                      required: true,
                      message: 'Please choose day end off',
                    },
                  ]}
                  hasFeedback
                >
                  <DatePicker className='day-end-off' />
                </Form.Item>
                <Form.Item
                  className='log-off'
                  name={'quantity'}
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
                <Space wrap>
                  <Link to='/staff'>
                    <Button className='button-cancel'>Cancel</Button>
                  </Link>
                  <Button type='primary' htmlType='submit' block className='button-send'>
                    Send
                  </Button>
                </Space>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default LogOffForm;
