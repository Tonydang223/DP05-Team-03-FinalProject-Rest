import { React, useEffect, useState } from 'react';
import AccountTable from '../../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
import { fetchAccountRequest, fetchApprove } from '../../../services/axiosInstance.js';
import moment from 'moment';
import { useSelector } from 'react-redux';

const AccountRequest = () => {
  const checkRole = localStorage.getItem('user_role');
  const { user } = useSelector((state) => state.auth);
  // console.log(user._id);
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await fetchAccountRequest();

      const requestsWithUserData = result.data
        .filter((request) => request.status === 'Pending' )
        .map((request) => {
          // console.log(request);
          try {
            return {
              _id: request._id,
              from: request.from,
              to: request.to,
              reason: request.reason,
              time: request.time,
              type_of_work: request.type_of_work,
              request_for_date: `${
                request.from && request.to
                  ? moment(request.from).format('LL') + ' - ' + moment(request.to).format('LL')
                  : moment(request.from).format('LL')
              }`,
              quantity: request.quantity,
              requester: `${
                request.user.firstName + ' ' + request.user.lastName
                  ? request.user.firstName + ' ' + request.user.lastName
                  : ''
              }`,
              user_id: request.user._id,
              status: request.status,
              request_date: `${moment(request.from, 'YYYYMMDD').fromNow()}`,
            };
          } catch (error) {
            console.log(error);
            return null;
          }
        });
      // const resolvedData = await Promise.all(requestsWithUserData);
      setData(requestsWithUserData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  useEffect(() => {
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
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            data.length > 0 && (
              <AccountTable
                name='request'
                fetchData={fetchData}
                dataAccountRequest={data}
                checkRole={checkRole}
              />
            )
          )}
        </div>
      </Content>
    </>
  );
};

export default AccountRequest;
