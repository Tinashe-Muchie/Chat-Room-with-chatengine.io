import React, {useState, useContext} from 'react'
import {Modal, Form, Button, Alert} from 'react-bootstrap'
import axios from 'axios'
import {Context} from '../Context/Context'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'

function ContactsModal({handleClose, contacts}) {

    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const {selectChat} = useContext(Context)

    const authObject = {
        'Project-ID': projectID,
        'User-Name': localStorage.getItem('user'),
        'User-Secret': localStorage.getItem('password')
    }
    
    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            await axios.post(
                `https://api.chatengine.io/chats/${selectChat.id}/people/`,
                { 'username': username },
                { headers: authObject },    
            )
            handleClose()
        }catch(error){
            setError('Oops! something went wrong, try again.')
        }
    }

    const err = (error) ? true : false

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
                                    value={contact.username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                            </Form.Group>
                        ))
                    }
                    <Button type="submit" variant="outline-primary" className="mb-3 float-right">
                        Add
                    </Button>
                    <div className="mt-3" style={{display:'flex', justifyContent:'center'}}>
                        {(err) && <Alert variant='dark' style={{color: '#C5C6C7', backgroundColor: '#3500D3'}}>
                            {error}
                        </Alert>}
                    </div>
                </Form>
            </Modal.Body>        
        </div>
    )
}

export default ContactsModal
