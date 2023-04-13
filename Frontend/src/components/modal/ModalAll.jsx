import React from 'react';
import { Modal, Input, Form, Button } from 'antd';
const ModalAll = ({ name, title, open, onOk, onCancel, type }) => {

  return (
    <>
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
        <Modal open={open} type={type} onCancel={onCancel} footer={null}>
          <h2 style={{ textAlign: 'center', paddingBottom: '10px' }}>Create a new group</h2>

          <Form
            name='basic'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete='off'
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password1'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: (_, value) =>
                    !value.includes(" ")
                      ? Promise.resolve()
                      : Promise.reject(new Error("No spaces allowed"))
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button type='primary' htmlType='button' onClick={onCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalAll;
