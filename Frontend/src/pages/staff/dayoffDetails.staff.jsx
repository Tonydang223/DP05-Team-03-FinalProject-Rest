import React from 'react';
import { Col, Row } from 'antd';
import { DayoffInfo } from '../../components/dayoffDetails/dayoffInfo';
import { DayoffHistory } from '../../components/dayoffDetails/dayoffHistory';
import '../../components/dayoffDetails/dayoffDetails.css';

export const DayoffDetails = () => {
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
};
