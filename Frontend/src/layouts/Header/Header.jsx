import React from 'react';
import { Layout, theme, Row, Col, Button, Avatar } from 'antd';
import AvatarIcon from '../../assets/avatar.png'
import './header.css'
const { Header} = Layout;


export default function Navbar() {

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  return (
    <Layout className="site-layout">
        <Header>
          <Row justify="end">
            <Col xl={18}></Col>
            <Col xl={2}>
              <Button type="primary">Log off</Button>
            </Col>
            <Col xl={2}>
              <Avatar size={40} src={AvatarIcon}/>
            </Col>
          </Row>
        </Header>
        
      </Layout>
  )
}
