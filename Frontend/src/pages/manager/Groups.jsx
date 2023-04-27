import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Layout, Breadcrumb, theme, Button, Typography, Space, Row, Col, Avatar } from 'antd';
import ModalAll from '../../components/modal/ModalAll';
import './index.manager.css';
import { Link } from 'react-router-dom';
const { Content } = Layout;
import { fetchGroup } from '../../services/axiosInstance';
import { UserOutlined } from '@ant-design/icons';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Members',
    dataIndex: 'members',
    key: 'members',
    render: (members) =>
      members.length > 0 ? (
        <>
          <div key={members._id}>
            {members.slice(0, 3)?.map((item) =>
              item.img_profile ? (
                // eslint-disable-next-line react/jsx-key
                <Avatar size='medium' src={item.img_profile} key={item._id} />
              ) : (
                // eslint-disable-next-line react/jsx-key
                <Avatar size='medium' icon={<UserOutlined />} key={item._id} />
              ),
            )}
          </div>
        </>
      ) : (
        <p style={{ marginTop: '15px' }}>No member</p>
      ),
  },
  {
    title: 'Masters',
    dataIndex: 'masters',
    key: 'masters',
    render: (masters) =>
      masters.length > 0 ? (
        <>
          <div key={masters._id}>
            {masters.slice(0, 3)?.map((item) =>
              item.img_profile ? (
                // eslint-disable-next-line react/jsx-key
                <Avatar size='medium' src={item.img_profile} key={item._id} />
              ) : (
                // eslint-disable-next-line react/jsx-key
                <Avatar size='medium' icon={<UserOutlined />} key={item._id} />
              ),
            )}
          </div>
        </>
      ) : (
        <p style={{ marginTop: '15px' }}>No master</p>
      ),
  },
  {
    title: 'WorkSpace',
    dataIndex: 'workspace',
    key: 'workspace',
    render: (workspace) => (
      <>
        <div>
          <p style={{ marginTop: '15px' }}>{workspace.name}</p>
        </div>
      </>
    ),
  },
  {
    title: 'Action',
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Space size='middle'>
        <Link
          style={{ fontSize: '20px' }}
          to={{ pathname: `/manager/groups/groups-details/${_id}`, state: { _id } }}
        >
          <Button type='primary'>Detail</Button>
        </Link>
      </Space>
    ),
  },
];

export default function ManagerPage() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const getAllGroup = async () => {
      const res = await fetchGroup();
      setGroups(res);
    };
    getAllGroup();
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const handleApproveAdd = () => {
    setIsCreateOpen(false);
    fetchGroup();
  };
  // Create Modal
  const CreateGroup = () => {
    setIsCreateOpen(true);
    setTitle('CreateGroup');
  };

  const handleCreateGroup = () => {
    setIsCreateOpen(false);
    // setSubmit('submit');
  };

  const handleCancelCreate = () => {
    setIsCreateOpen(false);
  };
  return (
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
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
        <Breadcrumb.Item>Groups</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 530,
          background: colorBgContainer,
        }}
      >
        <Space wrap className='section1'>
          <Row className='row'>
            <Col xl={8} lg={8} xxl={1} md={13} sm={17} className='col-button'>
              <Button role='button' title={isTitle} onClick={CreateGroup}>
                Create new group
              </Button>
            </Col>
          </Row>
        </Space>
        <Table
          columns={columns}
          dataSource={groups}
          scroll={{ x: true }}
          pagination={{
            pageSize: 5,
          }}
        />
        <ModalAll
          name={isTitle}
          open={isCreateOpen}
          onOk={handleApproveAdd}
          onCancel={handleCancelCreate}
        />
      </div>
    </Content>
  );
}
