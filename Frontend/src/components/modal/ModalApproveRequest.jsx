import React from 'react';
import {Modal} from 'antd'
const ModalApproveRequest = ({title, open, onOk, onCancel}) => {
  
  return (
    <>
      <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
        <p>Are you sure to {title}?</p>
      </Modal>
    </>
  );
};

export default ModalApproveRequest;
