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
        <Breadcrumb.Item>Auth</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 530,
          background: colorBgContainer,
          justifyContent: 'center',
        }}
      >
        <Space direction="vertical">
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
                      <p className='role'>Staff</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Space wrap>
            <Button>Edit Profile</Button>
            <Button>Change password</Button>
          </Space>
        </Space>
      </div>
    </Content>
  );
};

export default Profile;
