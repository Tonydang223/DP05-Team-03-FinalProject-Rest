import {React, useEffect, useState} from 'react'
import AccountTable from '../../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
import {fetchAccountRequest, fetchApprove, fetchInfoUser} from '../../../services/axiosInstance.js';
import moment from 'moment';


const AccountRequest = () => {

    const checkRole = localStorage.getItem('user_role');
    const { Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(data);
    useEffect(() => {
        const fetchData = async() => {
            try {
                setIsLoading(true);
                const result = await fetchAccountRequest();
                const usersResponse = await fetchInfoUser();
                const userData = usersResponse.data;
                
                const requestsWithUserData = result.data.map((request) => {
                    const user = userData.find((user) => user._id === request.user);
                    
                    return { ...request, user };
                  });
                  const requestData = requestsWithUserData.map(async (row) => {
                    // passing id for fetch approve
                    const verifier = await fetchApprove(row._id);
                    console.log(verifier.data.verifier);
                    return {
                      _id: row._id,
                      request_for_date: `${(row.from && row.to) ? (moment(row.from).format('LL') + ' - ' + moment(row.to).format('LL')) : (moment(row.from).format('LL'))}`,
                      quantity: row.quantity,
                      requester: row.user.firstName,
                      status: row.status,
                      verifier: ` ${verifier.data.approve.length} / ${verifier.data.verifier}`,
                      request_date: `${moment(row.from, 'YYYYMMDD').fromNow()}`,
                    };
                  });
                const resolvedData = await Promise.all(requestData);
                setData(resolvedData);
                setIsLoading(false);
                
            } catch (error) {
                setIsLoading(false); // Stop loading in case of error
                console.error(error);
            }
        }
        fetchData();
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
            {isLoading ? <div>Loading....</div> : <AccountTable dataAccountRequest={data} /> }
            </div>
        </Content>
        </>
    )
}

export default AccountRequest
