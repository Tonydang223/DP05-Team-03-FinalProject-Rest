import React from 'react';
import { useEffect, useState } from 'react';
import {
  Layout,
  Breadcrumb,
  theme,
  Descriptions,
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  Space,
} from 'antd';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './groupDetails.css';
import {
  detailGroup,
  AllUser,
  fetchWorkspaces,
  UpdateGroup,
} from '../../../services/axiosInstance';
const { TextArea } = Input;
const { Content } = Layout;
export default function GroupDetailsPage() {
  //mentions
  const { id } = useParams();
  const [allUser, setAllUser] = useState([]);
  const [workspace, setWorkspace] = useState([]);

  const initialValuesAllMember = {
    name: '',
    masters: [],
    members: [],
  };
  const [valuesAddedMem, setValuesAddedMem] = useState(initialValuesAllMember);

  // Get workspace
  const getWorkSpace = async () => {
    const allWorkspace = await fetchWorkspaces();
    setWorkspace(allWorkspace);
  };

  //Select master in group
  const options = [];
  const optionsWorkspace = [];

  const getGroupDetail = async (id) => {
    return await detailGroup(id);
  };

  const getAllUsers = async () => {
    const user = await AllUser();
    setAllUser(user);
  };
  if (allUser) {
    for (let i = 0; i < allUser.length; i++) {
      const element = allUser[i];
      options.push({
        label: `${element.firstName} ${element.lastName}`,
        value: element._id,
      });
    }
  }

  if (workspace) {
    for (let i = 0; i < workspace.length; i++) {
      const element = workspace[i];
      optionsWorkspace.push({
        label: `${element.name}`,
        value: element._id,
      });
    }
  }

  useEffect(() => {
    getGroupDetail(id).then((res) => {
      const getIds = (arr) => {
        return arr.map((v) => v._id);
      };
      setValuesAddedMem({
        ...res,
        masters: getIds(res.masters),
        members: getIds(res.members),
        id_workspace: res.workspace._id,
        name: res.name,
      });
    });
    getAllUsers();
    getWorkSpace();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 16, span: 8 },
  };

  const [selectedValues, setSelectedValues] = useState([]);

  //update group
  const submitUpdateGroup = async () => {
    await UpdateGroup(valuesAddedMem);
  };
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
          <Breadcrumb.Item>
            <Link to='/manager'>Manager</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/manager/group'>Group</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/manager/group/details'>Details</Link>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row
          style={{
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Col span={24}>
            <Descriptions title='Basic information' />
            <Form
              {...layout}
              name='nor_login'
              autoComplete='off'
              onFinish={submitUpdateGroup}
              initialValues={initialValuesAllMember}
            >
              <Form.Item name='name' label='Name group'>
                <div>
                  <Input
                    value={valuesAddedMem?.name}
                    onChange={(e) => setValuesAddedMem({ ...valuesAddedMem, name: e.target.value })}
                  />
                </div>
              </Form.Item>
              <Form.Item
                name='masters'
                label='Masters'
                rules={[
                  () => ({
                    validator() {
                      if (!valuesAddedMem.masters.length) {
                        return Promise.reject('Please add a master');
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <Space
                  style={{
                    width: '100%',
                  }}
                  direction='vertical'
                >
                  <Select
                    mode='multiple'
                    // allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder='Please select'
                    value={valuesAddedMem?.masters}
                    options={options?.filter(
                      (item) => !valuesAddedMem?.members?.includes(item?.value),
                    )}
                    onChange={(v) => setValuesAddedMem({ ...valuesAddedMem, masters: [...v] })}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name='members'
                label='Member'
                rules={[
                  () => ({
                    validator() {
                      if (!valuesAddedMem.members.length) {
                        return Promise.reject('Please add a member');
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <Space
                  style={{
                    width: '100%',
                  }}
                  direction='vertical'
                >
                  <Select
                    mode='multiple'
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder='Please select'
                    value={valuesAddedMem?.members}
                    onChange={(v) => setValuesAddedMem({ ...valuesAddedMem, members: [...v] })}
                    options={options?.filter(
                      (item) => !valuesAddedMem?.masters?.includes(item?.value),
                    )}
                  />
                </Space>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button className='info-form-button'>Cancel</Button>
                <Button htmlType='submit' className='info-form-button'>
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </>
  );
}
