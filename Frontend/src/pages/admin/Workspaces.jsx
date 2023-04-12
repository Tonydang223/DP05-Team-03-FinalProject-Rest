import React from 'react';
import { Table, Row, Col } from 'antd';

const dataSource = [
  { key: 1, name: 'ST Software', state: 'Active', managers: '' },
  { key: 2, name: 'Devplus', state: 'Inactive', managers: '' },
];

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'State', dataIndex: 'state', key: 'state' },
  { title: 'Managers', dataIndex: 'managers', key: 'managers' },
];

export default function Workspaces() {
  return (
    <div style={{ marginLeft: '50px' }}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Col>
      </Row>
    </div>
  );
}
