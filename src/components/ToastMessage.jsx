import { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

import './ToastMessage.css'

const ToastMessage = ({ bg, title, body }) => {
  const [show, setShow] = useState(true)

  return (
    <ToastContainer position='bottom-right' className='toast-container'>
      <Toast
        bg={bg}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className='me-auto'>{title}</strong>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastMessage
