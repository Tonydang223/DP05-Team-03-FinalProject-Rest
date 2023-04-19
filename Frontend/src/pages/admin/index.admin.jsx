import React from 'react';
import AccountTable from '../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
export default function AdminPage() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
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
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item>Request</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 530,
            background: colorBgContainer,
          }}
        >
          <AccountTable />
        </div>
      </Content>
    </>
  );
}
