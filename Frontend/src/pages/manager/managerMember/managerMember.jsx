import { useEffect, useState } from 'react';
import { Table, Button, Layout, theme, Breadcrumb } from 'antd';
import ModalAll from '../../../../src/components/modal/ModalAll';
import { fetchMember, addMember } from './../../../services/axiosInstance';

const { Content } = Layout;

export default function ManagerMember() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setTitle] = useState('');
  const [members, setMembers] = useState([]);

  //fetch data
  const getAllMembers = async () => {
    const res = await fetchMember();
    setMembers(res);
  };

  useEffect(() => {
    getAllMembers();
  }, [isModalOpen]);

  const onFinish = async (values) => {
    isTitle === 'Add_Member' && (await addMember({ values }));
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //data
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SlackId',
      dataIndex: 'slackId',
      key: 'slackId',
    },
  ];

  //member
  const showAddMemberModal = () => {
    setIsModalOpen(true);
    setTitle('Add_Member');
  };

  //modal
  const handleApprove = () => {
    setIsModalOpen(false);
    setTitle('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <Content
      style={{
        margin: '0 16px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
        items={[
          {
            title: 'Manager',
          },
          {
            title: 'Members',
          },
        ]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 600,
          background: colorBgContainer,
        }}
      >
        <Button
          role='button'
          title={isTitle}
          onClick={showAddMemberModal}
          style={{ marginBottom: '20px' }}
        >
          Add Member
        </Button>

        <Table
          columns={columns}
          dataSource={members}
          pagination={{
            pageSize: 6,
          }}
          rowKey='_id'
          scroll={{ x: true }}
        />

        <ModalAll
          name={isTitle}
          open={isModalOpen}
          onOk={handleApprove}
          onCancel={handleCancel}
          onFinish={onFinish}
        />
      </div>
    </Content>
  );
}
