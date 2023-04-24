import React from 'react';
import { Layout, Breadcrumb, theme, Col, Row, Image, Space, Typography, Button } from 'antd';
import './Profile.css';
import image from '../../../assets/img/CoverProfile.png';
import Avatar from '../../../assets/img/traveler1.png';
const { Title, Text } = Typography;
const { Content } = Layout;
const Profile = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: '0 45px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
        <Breadcrumb.Item>Groups</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 530,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Row className="profile-container">
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="image-profile">
                <div className='travelers container section'>
                  <div className='sectionContainer'>
                    <div className='travelersContainer grid'>
                      <div className='singleTraveler'>
                        <img src={image} className='destinationImage' />

                        <div className='travelerDetails'>
                          <div className='travelerPicture'>
                            <img src={Avatar} className='travelerImage' />
                          </div>
                          <div className='travelerName'>
                            <span>VanHuy</span>
                            <p>vanhuy141520@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="info-profile">
              <Title strong className="information">Information</Title>
            <Space direction="vertical" className="content-info">
            <Space wrap className="name-profile">
              <Text><b className='title-name'>Name:</b> User name</Text>
            </Space>
            <Space wrap className="email-profile">
              <Text><b className="title-email">Email:</b> User@gmail.com</Text>
            </Space>
            <Space wrap className="role">
              <Text><b className='title-role'>Role:</b> Staff</Text>
            </Space>
            <Space wrap>
              <Button type="primary" htmlType='submit' className="button-edit">Edit Profile</Button>
              <Button type="primary" htmlType='submit' className="button-changePassword">Change password</Button>
            </Space>
            </Space>  
            </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Profile;
