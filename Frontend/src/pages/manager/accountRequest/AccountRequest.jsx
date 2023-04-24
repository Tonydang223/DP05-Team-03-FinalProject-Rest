import {React, useEffect, useState} from 'react'
import AccountTable from '../../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
// import {fetchAccountRequest} from '../../../services/axiosInstance.js';


const AccountRequest = () => {

    const checkRole = localStorage.getItem('user_role');
    const token = localStorage.getItem('access_token');
    const { Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          };
        fetch('http://localhost:8888/api/request/getAll', { headers })
            .then(response => response.json())
            .then(data => setData(data));
        
    }, []);
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
    )
}

export default AccountRequest
