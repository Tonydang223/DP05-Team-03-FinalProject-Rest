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
import { detailGroup, AllUser } from '../../../services/axiosInstance';
const { TextArea } = Input;
const { Content } = Layout;
export default function GroupDetailsPage() {
  //mentions
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [master, setMaster] = useState([]);
  const [member, setMember] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [isTitle, setTitle] = useState('');
  const [groupDetail, setGroupDetail] = useState(null);
  const [formValues, setFormValues] = useState({});
  // console.log(groupDetail);

  //Select master in group
  const options = [];

  const getGroupDetail = async (id) => {
    const res = await detailGroup(id);
    console.log(res);
    setFormValues(res);
    setMaster(
      res?.masters?.map((item) => {
        return item._id;
      }),
    );
    setMember(
      res?.members?.map((item) => {
        return item._id;
      }),
    );
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
  useEffect(() => {
    getGroupDetail(id);
    getAllUsers();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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

  const handleSelectChange = (value) => {
    setSelectedValues(value);
  };

  const filteredOptions =
    options.length > 0 &&
    options.map((option) => {
      if (selectedValues.includes(option.value)) {
        return { ...option, checked: true };
      }
      return option;
    });
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
            {master.length > 0 && (
              <Form
                {...layout}
                name='normal_login'
                className='login-form'
                onFinish={onFinish}
                colon={false}
                initialValues={formValues}
              >
                <Form.Item label='Group Name'>
                  <Input value={formValues.name} name='name' className='form-input' />
                </Form.Item>
                <Form.Item name='master' label='Masters'>
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
                      defaultValue={master}
                      options={options}
                      onChange={filteredOptions}
                    />
                  </Space>
                </Form.Item>
                <Form.Item name='member' label='Members'>
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
                      defaultValue={member}
                      onChange={handleSelectChange}
                      // value={selectedValues.filter((value) =>
                      //   filteredOptions.some((option) => option.value === value),
                      // )}
                      options={filteredOptions}
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
            )}
          </Col>
        </Row>
      </Content>
    </>
  );
}
