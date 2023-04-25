import {React, useState, useEffect} from 'react';
import AccountTable from '../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
import { fetchAccountRequest, fetchInfoUser } from '../../services/axiosInstance';
import moment from 'moment'

export default function AdminPage() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(data);
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
                    // console.log(row.status);
                    return {
                      _id: row._id,
                      request_for_date: `${(row.from && row.to) ? (moment(row.from).format('LL') + ' - ' + moment(row.to).format('LL')) : (moment(row.from).format('LL'))}`,
                      quantity: row.quantity,
                      requester: row.user.firstName,
                      status: row.status,
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
          <Breadcrumb.Item>Workspaces</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 530,
            background: colorBgContainer,
          }}
        >
          {isLoading ? <div>Loadding....</div> : <AccountTable name="day-off" dataAccountRequest={data}/>}
        </div>
      </Content>
    </>
  );
}
