import { React, useState, useEffect } from 'react';
import AccountTable from '../../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
import { fetchAccountRequest } from '../../../services/axiosInstance';
import moment from 'moment';

export default function AccountDayoff() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const checkRole = localStorage.getItem('user_role');
  // console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchAccountRequest();
        const dayOffWithUserData = result.data
          .filter((request) => request.status === 'Approved' || request.status === 'Rejected')
          .map(async (request) => {
            return {
              _id: request._id,
              request_for_date: `${
                request.from && request.to
                  ? moment(request.from).format('LL') + ' - ' + moment(request.to).format('LL')
                  : moment(request.from).format('LL')
              }`,
              quantity: request.quantity,
              requester: `${request.user.firstName + ' ' + request.user.lastName}`,
              status: request.status,
              request_date: `${moment(request.from, 'YYYYMMDD').fromNow()}`,
            };
          });
        const resolvedData = await Promise.all(dayOffWithUserData);
        setData(resolvedData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false); // Stop loading in case of error
        console.error(error);
      }
    };
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
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <AccountTable name='day-off' dataAccountRequest={data} checkRole={checkRole} />
          )}
        </div>
      </Content>
    </>
  );
}
