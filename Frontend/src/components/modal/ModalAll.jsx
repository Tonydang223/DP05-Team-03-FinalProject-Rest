import { useRef } from 'react';
import { Modal, Input, Form, Button, Radio } from 'antd';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
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

      {name === 'Edit' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
          <h4>Reason for revert </h4>
          <Input.TextArea placeholder='Need more detail' />
        </Modal>
      )}

      {name === 'CreateGroup' && (
        <Modal open={open} onCancel={onCancel} footer={null}>
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

          <Form name='basic' autoComplete='off'>
            <Form.Item
              label='Name group'
              name='groupname'
              rules={[
                {
                  required: true,
                  message: 'Please input name of group',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Add member'
              name='addPeople'
              rules={[
                {
                  required: true,
                  message: 'Please add people to group!',
                },
              ]}
              hasFeedback
            >
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
              />
            </Form.Item>
            <Form.Item>
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
              <Radio.Group defaultValue='open'>
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

      {name === 'Delete_Manager' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to delete this Manager?</p>
        </Modal>
      )}

      {name === 'Add_Member' && (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to {title}?</p>
        </Modal>
      )}
    </>
  );
};

export default ModalAll;
