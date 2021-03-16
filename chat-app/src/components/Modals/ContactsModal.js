import React, {useRef} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

function ContactsModal({handleClose}) {
    const idRef = useRef()
    const nameRef = useRef()
    
    function handleSubmit(e){
        e.preventDefault()
        
        handleClose()
    }
    return (
        <div className="modal-wrapper">
            <Modal.Header closeButton>
                <Modal.Title>Create New Contact</Modal.Title>
            </Modal.Header>  
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter ID" ref={idRef}required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter Username" ref={nameRef} required/>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="mb-3 float-right">
                        Create
                    </Button>
                </Form>
            </Modal.Body>        
        </div>
    )
}

export default ContactsModal
