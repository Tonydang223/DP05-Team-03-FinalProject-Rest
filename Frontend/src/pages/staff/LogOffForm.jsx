import React from 'react'
import "antd/dist/reset.css";
import { Col, Row, Form, Input, Button, Checkbox, Image } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;

const LogOffForm = () => {
  return (
    <div className="logoff">
      <Row>
        <Col span="12">
          <Text>Type of day off</Text>
          <Text>Type of day off</Text>
        </Col>
        <Col span="12">
        <Text>Type of day off</Text>
        
        </Col>
      </Row>
    </div>
  )
}

export default LogOffForm