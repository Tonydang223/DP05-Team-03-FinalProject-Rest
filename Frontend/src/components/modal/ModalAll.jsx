import React from 'react';
import { Modal, Input, Form, Button } from 'antd';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const ModalAll = ({ name, title, open, onOk, onCancel, type }) => {
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
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
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

          <Form name='basic' autoComplete='off'>
            <Form.Item
              label='Workspace Name'
              name='name'
              rules={[{ required: true, message: 'Please input workspace name' }]}
            >
              <Input placeholder='Workspace Name' />
            </Form.Item>
            <Form.Item
              label='Slack Id'
              name='id'
              rules={[{ required: true, message: 'Please input slack id' }]}
            >
              <Input placeholder='Slack Id' style={{ marginLeft: '72px', width: '315px' }} />
            </Form.Item>
            <Form.Item
              label='Member Name'
              name='member'
              rules={[{ required: true, message: 'Please input member name' }]}
            >
              <Input placeholder='Member' style={{ marginLeft: '17px', width: '315px' }} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
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

      {name === 'Add_Manager' && (
        <Modal title='Add New Manager' open={open} onOk={onOk} onCancel={onCancel}>
          <Form.Item
            label='Manager Name'
            name='name'
            rules={[{ required: true, message: 'Please input your name' }]}
          >
            <Input placeholder='Manager Name' />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email' }]}
          >
            <Input placeholder='Email' style={{ marginLeft: '74px', width: '330px' }} />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input placeholder='Password' style={{ marginLeft: '44px', width: '330px' }} />
          </Form.Item>
        </Modal>
      )}

      {name === 'Edit_Password' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
          <Form.Item
            label='Old Password'
            name='oldpassword'
            rules={[{ required: true, message: 'Please input your old password' }]}
            style={{ marginTop: '20px' }}
          >
            <Input placeholder='Old Password' style={{ marginLeft: '10px', width: '300px' }} />
          </Form.Item>
          <Form.Item
            label='New Password'
            name='newpassword'
            rules={[{ required: true, message: 'Please input your new password' }]}
          >
            <Input placeholder='New Password' style={{ marginLeft: '2px', width: '299px' }} />
          </Form.Item>
        </Modal>
      )}

      {name === 'Delete_Password' && (
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
          <p>Are you sure to delete?</p>
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
