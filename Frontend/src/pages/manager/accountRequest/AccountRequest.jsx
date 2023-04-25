import { React, useEffect, useState } from 'react';
import AccountTable from '../../../components/accountTable/AccountTable';
import { Layout, Breadcrumb, theme } from 'antd';
import {
  fetchAccountRequest,
  fetchApprove,
  fetchInfoUser,
} from '../../../services/axiosInstance.js';
import moment from 'moment';

const AccountRequest = () => {
  const checkRole = localStorage.getItem('user_role');
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchAccountRequest();

        const requestsWithUserData = result.data.filter(request => request.status === 'Pending')
            .map(async (request) => {
                const verifier = await fetchApprove(request._id);
                return {
                    _id: request._id,
                    request_for_date: `${
                    request.from && request.to
                        ? moment(request.from).format('LL') + ' - ' + moment(request.to).format('LL')
                        : moment(request.from).format('LL')
                    }`,
                    quantity: request.quantity,
                    requester: `${(request.user.firstName + ' ' +request.user.lastName) ? (request.user.firstName + '' + request.user.lastName) : ''}`,
                    status: request.status,
                    verifier: ` ${verifier.data.approve.length} / ${verifier.data.verifier}`,
                    check_approver: verifier.data.approve.length,
                    request_date: `${moment(request.from, 'YYYYMMDD').fromNow()}`,
                };
        });
            const resolvedData = await Promise.all(requestsWithUserData);
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
            <AccountTable name='request' dataAccountRequest={data} checkRole={checkRole}/>
          )}
        </div>
      </Content>
    </>
  );
};

export default AccountRequest;
