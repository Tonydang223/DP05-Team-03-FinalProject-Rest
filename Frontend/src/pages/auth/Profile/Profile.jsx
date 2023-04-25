import React, { useState } from 'react';
import { Layout, Breadcrumb, theme, Col, Row, Image, Space, Typography, Button } from 'antd';
import './Profile.css';
import image from '../../../assets/img/CoverProfile.png';
import Avatar from '../../../assets/img/traveler1.png';
const { Title, Text } = Typography;
const { Content } = Layout;
import ModalAll from '../../../../src/components/modal/ModalAll';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');

  const showEditProfile = () => {
    setIsModalOpen(true);
    setTitle('Edit_Profile');
  };
  const showChangePassword = () => {
    setIsModalOpen(true);
    setTitle('ChangePassword');
  };
  const handApproveAdd = () => {
    setIsModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpen(false);
  };
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
          display: 'flex',
        }}
      >
        <Space direction='vertical'>
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
          <Space wrap className='button'>
            <Button
              title={isTitle}
              onClick={showEditProfile}
              type='primary'
              htmlType='submit'
              style={{ fontWeight: 'bold' }}
            >
              Edit Profile
            </Button>
            <Button
              title={isTitle}
              onClick={showChangePassword}
              type='primary'
              htmlType='submit'
              style={{ fontWeight: 'bold' }}
            >
              Change password
            </Button>
            <ModalAll
              name={isTitle}
              open={isModalOpen}
              onOk={handApproveAdd}
              onCancel={handleCancelAdd}
            />
          </Space>
        </Space>
      </div>
    </Content>
  );
};

export default Profile;
