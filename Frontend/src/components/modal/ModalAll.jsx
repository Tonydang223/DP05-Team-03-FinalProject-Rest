import { useRef, useEffect, useState } from 'react';
import { Modal, Input, Form, Button, Radio, Select, Space } from 'antd';
import makeAnimated from 'react-select/animated';
import { AllUser, fetchWorkspaces, addGroup } from '../../../src/services/axiosInstance';

const animatedComponents = makeAnimated();
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 9,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 30,
    },
  },
};

const ModalAll = ({ name, title, open, onOk, onFinish, onCancel, type }) => {
  const [reason, setReason] = useState('');
  const handleTextReason = (e) => {
    setReason(e.target.value);
  };
  const [allUser, setAllUser] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const initialValuesAllMember = {
    name: '',
    id_workspace: '',
    masters: [],
    members: [],
  };
  const [valuesAddedMem, setValuesAddedMem] = useState(initialValuesAllMember);
  const options = [];
  const optionsWorkspace = [];
  const getAllUsers = async () => {
    const user = await AllUser();
    setAllUser(user);
  };
  const getWorkSpace = async () => {
    const allWorkspace = await fetchWorkspaces();
    setWorkspace(allWorkspace);
  };
  if (workspace) {
    for (let i = 0; i < workspace.length; i++) {
      const element = workspace[i];
      optionsWorkspace.push({
        label: `${element.name}`,
        value: element._id,
      });
    }
  }
  if (allUser) {
    for (let i = 0; i < allUser.length; i++) {
      const element = allUser[i];
      options.push({
        label: `${element.firstName} ${element.lastName}`,
        value: element._id,
      });
    }
  }

  const submitAddGroup = async () => {
    await addGroup(valuesAddedMem);
    
  };

  useEffect(() => {
    getAllUsers();
    getWorkSpace();
  }, []);

  return (
    <>
      {name === 'Logout' && (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to {title}?</p>
        </Modal>
      )}

      {name === 'Approve' && (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to {title}?</p>
        </Modal>
      )}

      {name === 'Reject' && (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to {title}?</p>
        </Modal>
      )}

      {name === 'Revert' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
          <h4>Reason for revert </h4>
          <Form>
            <Input.TextArea
              placeholder='Need more detail'
              value={reason}
              onChange={handleTextReason}
            />
          </Form>
        </Modal>
      )}

      {name === 'CreateGroup' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Create a new group
          </h2>

          <Form
            name='basic'
            autoComplete='off'
            initialValues={initialValuesAllMember}
            {...formItemLayout}
            onFinish={submitAddGroup}
          >
            <Form.Item
              label='Name group'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input name of group',
                },
              ]}
            >
              <div>
                <Input
                  value={valuesAddedMem.name}
                  onChange={(e) => setValuesAddedMem({ ...valuesAddedMem, name: e.target.value })}
                />
              </div>
            </Form.Item>
            <Form.Item
              label='Add member'
              name='members'
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
                  value={valuesAddedMem.members}
                  onChange={(v) => setValuesAddedMem({ ...valuesAddedMem, members: [...v] })}
                  options={options?.filter(
                    (item) => !valuesAddedMem.masters?.includes(item?.value),
                  )}
                />
              </Space>
            </Form.Item>
            <Form.Item
              label='Add master'
              name='masters'
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
              hasFeedback
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
                  value={valuesAddedMem.masters}
                  options={options?.filter(
                    (item) => !valuesAddedMem.members?.includes(item?.value),
                  )}
                  onChange={(v) => setValuesAddedMem({ ...valuesAddedMem, masters: [...v] })}
                />
              </Space>
            </Form.Item>
            <Form.Item
              label='Workspace'
              name='id_workspace'
              rules={[
                () => ({
                  validator() {
                    if (!valuesAddedMem.id_workspace) {
                      return Promise.reject('Please add a workspace');
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
              hasFeedback
            >
              <Space
                style={{
                  width: '100%',
                }}
                direction='vertical'
              >
                <Select
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder='Please select'
                  value={valuesAddedMem.id_workspace}
                  options={optionsWorkspace}
                  onChange={(v) => setValuesAddedMem({ ...valuesAddedMem, id_workspace: v })}
                />
              </Space>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginLeft: '60px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' onClick={onOk} htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Add_Workspace' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Add new workspace
          </h2>

          <Form name='basic' autoComplete='off' onFinish={onFinish} {...formItemLayout}>
            <Form.Item
              label='Workspace Name'
              name='name'
              rules={[{ required: true, message: 'Please input workspace name' }]}
              hasFeedback
            >
              <Input placeholder='Workspace Name' />
            </Form.Item>

            <Form.Item name='status' label='Status' initialValue='open'>
              <Radio.Group>
                <Radio value='open'>open</Radio>
                <Radio value='close'>close</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Set_Status' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Set Workspace Status
          </h2>

          <Form name='basic' autoComplete='off' onFinish={onFinish}>
            <Form.Item name='status' label='Status' initialValue='open'>
              <Radio.Group>
                <Radio value='open'>open</Radio>
                <Radio value='close'>close</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Add_Manager' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Add Manager
          </h2>

          <Form name='basic' autoComplete='off' onFinish={onFinish} {...formItemLayout}>
            <Form.Item
              label='First Name'
              name='firstName'
              rules={[{ required: true, message: 'Please input first name' }]}
              hasFeedback
            >
              <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[{ required: true, message: 'Please input last name' }]}
              hasFeedback
            >
              <Input placeholder='Last Name' />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                { required: true, message: 'Please input manager email' },
              ]}
              hasFeedback
            >
              <Input placeholder='Manager Email' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input password' }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Slack Id'
              name='slackId'
              rules={[{ required: true, message: 'Please input manager slack Id' }]}
              hasFeedback
            >
              <Input placeholder='U055GG1R132' />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Reset_Password' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Reset Password
          </h2>

          <Form onFinish={onFinish}>
            <Form.Item
              label='New Password'
              name='password'
              rules={[{ required: true, message: 'Please input new password' }]}
              hasFeedback
            >
              <Input.Password style={{ marginLeft: '2px', width: '299px' }} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Edit_Workspace' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Edit Workspace Name
          </h2>

          <Form onFinish={onFinish}>
            <Form.Item
              label='Workspace Name'
              name='name'
              rules={[{ required: true, message: 'Please input new workspace name' }]}
              hasFeedback
            >
              <Input placeholder='Workspace Name' style={{ marginLeft: '2px', width: '299px' }} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Delete_Manager' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to delete this Manager?</p>
        </Modal>
      )}

      {name === 'Add_Member' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '23px',
              fontWeight: '600',
            }}
          >
            Add Member
          </h2>

          <Form name='basic' autoComplete='off' onFinish={onFinish} {...formItemLayout}>
            <Form.Item
              label='First Name'
              name='firstName'
              rules={[{ required: true, message: 'Please input first name' }]}
              hasFeedback
            >
              <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[{ required: true, message: 'Please input last name' }]}
              hasFeedback
            >
              <Input placeholder='Last Name' />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                { required: true, message: 'Please input manager email' },
              ]}
              hasFeedback
            >
              <Input placeholder='Manager Email' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input password' }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Phone Number'
              name='phoneNumber'
              rules={[
                {
                  required: true,
                  message: 'Please input phone number of member',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Slack Id'
              name='slackId'
              rules={[{ required: true, message: 'Please input manager slack Id' }]}
              hasFeedback
            >
              <Input placeholder='U055GG1R132' />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {name === 'Edit_Profile' && (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '25px',
              fontWeight: '600',
            }}
          >
            Edit profile account
          </h2>
          <Form
            name='basic'
            {...formItemLayout}
            initialValues={{
              remember: true,
            }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <Form.Item
              label='First Name'
              name='firstName'
              rules={[
                {
                  required: true,
                  message: 'Please input first name of account',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'Please input last name of account',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input email of account',
                },
                { type: 'email' },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
      {name === 'ChangePassword' && (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} footer={null}>
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '25px',
              fontWeight: '600',
            }}
          >
            Change password account
          </h2>
          <Form
            name='basic'
            {...formItemLayout}
            initialValues={{
              remember: true,
            }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <Form.Item
              label='Old password'
              name='oldPass'
              rules={[
                {
                  required: true,
                  message: 'Please input old password',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='New password'
              name='newPass'
              rules={[
                {
                  required: true,
                  message: 'Please input new password',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Confirm password'
              name='confirm_new_password'
              rules={[
                {
                  required: true,
                  message: 'Please confirm new password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPass') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Two passwords do not match');
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType='button'
                onClick={onCancel}
                style={{
                  marginRight: '20px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalAll;
