import React from 'react';
import { Col, Row } from 'antd';
import { RequestInfo } from '../../../../src/components/requestDetails/requestInfo';
import { RequestHistory } from '../../../../src/components/requestDetails/requestHistory';

export default function AccountDetailPage() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <RequestInfo />
        </Col>
        <Col span={12}>
          <RequestHistory />
        </Col>
      </Row>
    </div>
  );
}
