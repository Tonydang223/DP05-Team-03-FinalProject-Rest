import React from 'react'
import {Layout, Breadcrumb, theme} from 'antd'
import AccountTable from '../../components/accountTable/AccountTable'

const {Content} = Layout;

const MainContent = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Account</Breadcrumb.Item>
            <Breadcrumb.Item>Request</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
            }}
          >
            <AccountTable/>
          </div>
        </Content>
  )
}

export default MainContent
