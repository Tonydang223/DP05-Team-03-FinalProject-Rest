import React from 'react'
import { Space, Table} from 'antd';
import {CheckCircleFilled, CloseCircleFilled, EditFilled} from '@ant-design/icons'

const columns = [
    {
      title: 'Resquest for date',
      dataIndex: 'request_for_date',
      key: 'request_for_date',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Request Date',
      key: 'request_date',
      dataIndex: 'request_date',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a style={{fontSize: "20px"}} title='Edit'><EditFilled /></a>
          <a style={{fontSize: "20px"}} title='Approve'><CheckCircleFilled /></a>
          <a style={{fontSize: "20px"}} title='Reject'><CloseCircleFilled /></a>
        </Space>
      ),
    },
  ];

//   fake data
const data = [
    {
      key: '1',
      request_for_date: 'John Brown',
      qty: 32,
      status: 'New York No. 1 Lake Park',
      request_date: ['nice', 'developer'],
    },
    {
      key: '2',
      request_for_date: 'John Brown',
      qty: 32,
      status: 'New York No. 1 Lake Park',
      request_date: ['nice', 'developer'],
    },
    {
      key: '3',
      request_for_date: 'John Brown',
      qty: 32,
      status: 'New York No. 1 Lake Park',
      request_date: ['nice', 'developer'],
    },
  ];

const AccountTable = () => {
  return (
    <>
        <Table columns={columns} dataSource={data}/>
    </>
  )
}

export default AccountTable
