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
          <h2
            style={{
              textAlign: 'center',
              paddingBottom: '10px',
              fontSize: '25px',
              fontWeight: '600',
            }}
          >
            Create a new group
          </h2>

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
    </>
  );
};

export default ModalAll;
