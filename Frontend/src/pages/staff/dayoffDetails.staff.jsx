import React from 'react';
import { Col, Row, Layout, Breadcrumb, theme } from 'antd';
import { DayoffInfo } from '../../components/dayoffDetails/dayoffInfo';
import { DayoffHistory } from '../../components/dayoffDetails/dayoffHistory';
import '../../components/dayoffDetails/dayoffDetails.css';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/LoadingSpinner';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDayoffDetails, fetchDayoffHistory } from '../../services/axiosInstance';
import { useEffect } from 'react';

export default function DayoffDetails() {
  const [loading, setLoading] = useState(false);
  const [dayoffData, setDayoffData] = useState([]);
  const [dayoffHistory, setDayoffHistory] = useState([]);
  // console.log(
  //   '🚀 ~ file: dayoffDetails.staff.jsx:17 ~ DayoffDetails ~ dayoffHistory:',
  //   dayoffHistory,
  // );
  // console.log(
  //   '🚀 ~ file: dayoffDetails.staff.jsx:18 ~ DayoffDetails ~ dayoffHistory:',
  //   dayoffHistory?.map((item) => item?.action),
  // );
  const userRole = localStorage.getItem('user_role');

  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { id } = useParams();

  const getDayoffInfo = async () => {
    const response = await fetchDayoffDetails(id);
    setDayoffData(response);
  };

  const getDayoffHistory = async () => {
    const response = await fetchDayoffHistory(id);
    setDayoffHistory(response);
  };

  useEffect(() => {
    getDayoffInfo();
    getDayoffHistory();
  }, []);

  return (
    <>
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
          {userRole && userRole === 'Staff' ? (
            <>
              <Breadcrumb.Item>
                <Link to='/staff'>Account</Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link to='/staff/dayoff'>Dayoff</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to='/staff/dayoff/details'>Details</Link>
              </Breadcrumb.Item>
            </>
          ) : (
            <>
              <Breadcrumb.Item>
                <Link to='/manager'>Manager</Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link to='/manager/days_off'>Dayoff</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to='/manager/dayoff/details'>Details</Link>
              </Breadcrumb.Item>
            </>
          )}
        </Breadcrumb>
        <Row
          style={{
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          {dayoffData && (
            <Col span={12}>
              <DayoffInfo
                startDate={dayoffData.from}
                endDate={dayoffData.to}
                Time={dayoffData.time}
                quantity={dayoffData.quantity}
                reason={dayoffData.reason}
                status={dayoffData.status}
              />
            </Col>
          )}

          <Col span={12}>
            <DayoffHistory data={dayoffHistory} />
          </Col>
        </Row>
        {/* <Spinner /> */}
      </Content>
    </>
  );
}
