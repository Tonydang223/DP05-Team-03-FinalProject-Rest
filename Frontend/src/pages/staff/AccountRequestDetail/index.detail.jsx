import React from 'react';
import { Col, Row } from 'antd';
import 'react-icons';
import './index.detail.css';
import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
// import { IoReloadCircleOutline } from 'react-icons/io';

export default function AccountDetailPage() {
  return (
    <Row>
      <Col span={12}>
        <Row className='Title-Row'>Basic Information</Row>
        <Row className='Information-Row'>
          <Col span={12}>From</Col>
          <Col span={12}>2022-10-22</Col>
        </Row>
        <Row className='Information-Row'>
          <Col span={12}>To</Col>
          <Col span={12}>2022-11-22</Col>
        </Row>
        <Row className='Information-Row'>
          <Col span={12}>Time</Col>
          <Col span={12}>All Day</Col>
        </Row>
        <Row className='Information-Row'>
          <Col span={12}>Quantity</Col>
          <Col span={12}>4</Col>
        </Row>
        <Row className='Information-Row'>
          <Col span={12}>Reason</Col>
          <Col span={12}>Personal issue</Col>
        </Row>
        <Row className='Information-Row'>
          <Col span={12}>Status</Col>
          <Col span={12}>Approved(1/2)</Col>
        </Row>
        <Row className='Action-Row'>Actions</Row>
        <Col span={2}>
          <MdOutlineCheckCircle />
          <MdOutlineCancel />
          {/* <IoReloadCircleOutline /> */}
        </Col>
      </Col>
      <Col span={12}>
        <Row className='Title-Row'>Histories</Row>
      </Col>
    </Row>
  );
}
