import React from 'react';
import { Table } from 'antd';
import '../../assets/AdminPage.css';

const dataSource = [
  {
    key: '1',
    name: 'ST Software',
    state: 'Active',
    managers: '',
  },
  {
    key: '2',
    name: 'Devplus',
    state: 'Inactive',
    managers: '',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Managers',
    dataIndex: 'managers',
    key: 'managers',
  },
];

export default function AdminPage() {
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} className='custom-table' />
  );
}
