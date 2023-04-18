import React from 'react';
import {Modal, Input} from 'antd'
const ModalAll = ({name, title, open, onOk, onCancel}) => {
  
  return (
    <>
      {name === 'Approve' && <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
        <p>Are you sure to {title}?</p>
      </Modal>}
      
      {name === 'Reject' && <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
        <p>Are you sure to {title}?</p>
      </Modal>}

      {name === 'Edit' && <Modal open={open} onOk={onOk} onCancel={onCancel}>
        <h4>Reason for revert </h4>
        <Input.TextArea placeholder='Need more detail' />
      </Modal>}
    </>
  );
};

export default ModalAll;
