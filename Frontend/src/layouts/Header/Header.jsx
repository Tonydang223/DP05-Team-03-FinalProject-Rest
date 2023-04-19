import React from 'react';
import { Layout, theme, Row, Col, Button, Avatar } from 'antd';
import AvatarIcon from '../../assets/avatar.png';
import './header.css';
const { Header } = Layout;

export default function Navbar() {
  return (
    <Layout className='site-layout'>
      <Header>
        <Row justify='end'>
          <Col xl={18}></Col>
          <Col xl={4}>
            <Button className="custom-button" type='primary'>Log off</Button>
          </Col>
          <Col xl={2}>
            <Avatar size={40} src={AvatarIcon} />
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}
