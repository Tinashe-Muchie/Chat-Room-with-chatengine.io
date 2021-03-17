import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

function ContactsModal({handleClose, contacts}) {
    
    const handleSubmit = (e)=> {
        e.preventDefault()
        
        handleClose()
    }

    const handleCheck = () => {

    }

    return (
        <div className="modal-wrapper">
            <Modal.Header closeButton>
                <Modal.Title>Add Person to Chat</Modal.Title>
            </Modal.Header>  
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {
                        (contacts) && contacts.map((contact)=>(
                            (contact.username === localStorage.getItem('user'))
                            ? null
                            : <Form.Group key={contact.id}>
                                <Form.Check 
                                    type="checkbox"
                                    label={contact.username}
                                    value
                                    onChange={()=>handleCheck(contact.id)}
                                />
                            </Form.Group>
                        ))
                    }
                    <Button type="submit" variant="outline-primary" className="mb-3 float-right">
                        Add
                    </Button>
                </Form>
            </Modal.Body>        
        </div>
    )
}

export default ContactsModal
