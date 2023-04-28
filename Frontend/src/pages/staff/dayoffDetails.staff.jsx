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
import ModalAll from '../../components/modal/ModalAll';

export default function DayoffDetails() {
  const [loading, setLoading] = useState(false);
  const [dayoffData, setDayoffData] = useState([]);
  // console.log('🚀 ~ file: dayoffDetails.staff.jsx:17 ~ DayoffDetails ~ dayoffData:', dayoffData);
  const [dayoffHistory, setDayoffHistory] = useState([]);

  const userRole = localStorage.getItem('user_role');
  const { id } = useParams();

  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
                <Link to='/staff'>Staff</Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link to='/staff/day-off'>Dayoff</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <div>Details</div>
              </Breadcrumb.Item>
            </>
          ) : (
            <>
              <Breadcrumb.Item>
                <div>Manager</div>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <div>Dayoff</div>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <div>Details</div>
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
                time={dayoffData.time}
                quantity={dayoffData.quantity}
                reason={dayoffData.reason}
                status={dayoffData.status}
                id={dayoffData?._id}
              />
            </Col>
          )}

          <Col span={12}>
            <DayoffHistory data={dayoffHistory} />
          </Col>
        </Row>
        {/* <ModalAll
          name={isTitle}
          title={isTitle}
          open={isModalOpen}
          onOk={handleApproveReject}
          onCancel={handleCancel}
        /> */}
        {/* <Spinner /> */}
      </Content>
    </>
  );
}
