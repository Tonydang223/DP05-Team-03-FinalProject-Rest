import React from 'react'
import {Input, Modal} from 'antd'

const ModalEditRequest = ({open, onOk, onCancel}) => {
  return (
    <>
        <Modal open={open} onOk={onOk} onCancel={onCancel}>
            <h4>Reason for revert </h4>
            <Input.TextArea placeholder="Need more detail"/>
        </Modal>
    </>
  )
}

export default ModalEditRequest
