import React from 'react';
import { Descriptions, Space, Typography } from 'antd';
import './requestDetail.css';

const { Title, Text } = Typography;

export const RequestHistory = () => {
  return (
    <div>
      <Descriptions title='Histories' />
      <div className='history-status'>
        <Title level={5} className='history-heading'>
          Status
        </Title>
        <Space direction='vertical' className='history-details'>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Tellus integer feugiat scelerisque varius.
            Faucibus turpis in eu mi bibendum. Sed risus pretium quam vulputate dignissim
            suspendisse. Ut placerat orci nulla pellentesque dignissim. Curabitur vitae nunc sed
            velit. Aliquet nec ullamcorper sit amet risus nullam. Pharetra pharetra massa massa
            ultricies. Ut ornare lectus sit amet est placerat in egestas. Vulputate eu scelerisque
            felis imperdiet proin fermentum leo vel orci. Egestas integer eget aliquet nibh
            praesent. Ut ornare lectus sit amet est placerat in egestas.
          </Text>
        </Space>
      </div>
    </div>
  );
};
