import React from 'react';
import { Col, Row } from 'antd';
import { DayoffInfo } from '../../../../src/components/dayoffDetails/dayoffInfo';
import { DayoffHistory } from '../../../../src/components/dayoffDetails/dayoffHistory';

export default function AccountDetailPage() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <DayoffInfo />
        </Col>
        <Col span={12}>
          <DayoffHistory />
        </Col>
      </Row>
    </div>
  );
}
