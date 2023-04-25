import React from 'react';
import { Col, Row, Layout, Breadcrumb, theme } from 'antd';
import { DayoffInfo } from '../../components/dayoffDetails/dayoffInfo';
import { DayoffHistory } from '../../components/dayoffDetails/dayoffHistory';
import '../../components/dayoffDetails/dayoffDetails.css';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/LoadingSpinner';
import { useState } from 'react';

export default function DayoffDetails() {
  const [loading, setLoading] = useState(false);
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
            <Link to='/staff'>Account</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to='/staff/dayoff'>Dayoff</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/staff/dayoff/details'>Details</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row
          style={{
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Col span={12}>
            <DayoffInfo />
          </Col>
          <Col span={12}>
            <DayoffHistory />
          </Col>
        </Row>
        {/* <Spinner /> */}
      </Content>
    </>
  );
}
