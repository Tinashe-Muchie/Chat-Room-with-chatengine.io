import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

function ChatsModal({handleClose}) {

    const handleSubmit = (e) => {
        e.preventDefault()

        handleClose()
    }

    return (
           <div className="modal-wrapper">
            <Modal.Header closeButton>
                <Modal.Title>Create New Chat</Modal.Title>
            </Modal.Header>  
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter Chat Title..." required />
                        </Form.Group>
                    <Button type="submit" variant="outline-primary" className="mb-3 float-right">
                        Create
                    </Button>
                </Form>
            </Modal.Body> 
        </div> 
    )
}

export default ChatsModal
