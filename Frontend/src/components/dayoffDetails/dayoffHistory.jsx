import React from 'react';
import { Descriptions, Space, Typography, Row, Col } from 'antd';
import './dayoffDetails.css';
import { useState, useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;

export const DayoffHistory = ({ data }) => {
  const [status, setStatus] = useState('');
  const [createdDetail, setCreatedDetail] = useState('');
  const [updatedDetail, setUpdatedDetail] = useState('');

  // useEffect(() => {
  //   data?.map((item) => {
  //     switch (item.action) {
  //       case 'Created':
  //         setStatus(item.action);
  //         setCreatedDetail(item.action);
  //         break;
  //       case 'Updated':
  //         setStatus(item.action);
  //         setCreatedDetail(item.action);
  //         break;
  //       case 'Approved':
  //         setStatus(item.action);
  //         setCreatedDetail(item.action);
  //         break;
  //     }
  //   });
  // }, [data]);

  return (
    <div>
      <Descriptions title='Histories' />
      {data?.map((item) => (
        <div className='history-status' key={item._id}>
          <Title level={5} className='history-heading'>
            Request {item.action}
          </Title>
          <Space direction='vertical' className='history-details'>
            {item.action === 'Created' ? (
              <>
                <Text>{item.created_request.userName} requested</Text>
                <Text>From: {moment(item.created_request.from).format('MMMM Do YYYY')} </Text>
                <Text>To: {moment(item.created_request.to).format('MMMM Do YYYY')} </Text>
                <Text>Time: {item.created_request.time} </Text>
                <Text>Quantity: {item.created_request.quantity} </Text>
                <Text>Reason: {item.created_request.reason} </Text>
              </>
            ) : item.action === 'Updated' ? (
              <>
                <Text>{item.updated_request.userName} update request</Text>
                <Row>
                  <Col span={10}>
                    <Text>From: {moment(item.created_request.from).format('MMMM Do YYYY')} </Text>
                    <Text>To: {moment(item.created_request.to).format('MMMM Do YYYY')} </Text>
                    <Text>Time: {item.created_request.time} </Text>
                    <Text>Quantity: {item.created_request.quantity} </Text>
                    <Text>Reason: {item.created_request.reason} </Text>
                  </Col>
                  <Col span={4}>
                    <ArrowRightOutlined />
                  </Col>
                  <Col span={10}>
                    <Text>From: {moment(item.updated_request.from).format('MMMM Do YYYY')} </Text>
                    <Text>To: {moment(item.updated_request.to).format('MMMM Do YYYY')} </Text>
                    <Text>Time: {item.updated_request.time} </Text>
                    <Text>Quantity: {item.updated_request.quantity} </Text>
                    <Text>Reason: {item.updated_request.reason} </Text>
                  </Col>
                </Row>
              </>
            ) : item.action === 'Approved' ? (
              <Text>{item.approved_request.userName} approved</Text>
            ) : item.action === 'Rejected' ? (
              <Text>{item.approved_request.userName} rejected</Text>
            ) : (
              <Text>Someone need you to change reason </Text>
            )}
          </Space>
        </div>
      ))}
    </div>
  );
};
