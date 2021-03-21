import React, {useState, useContext} from 'react'
import {Modal, Form, Button, Alert} from 'react-bootstrap'
import axios from 'axios'
import {Context} from '../Context/Context'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'

function ChatsModal({handleClose}) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const {setChats, chats, setActiveChat} = useContext(Context)

    const authObject = {
        'Project-ID': projectID,
        'User-Name': localStorage.getItem('user'),
        'User-Secret': localStorage.getItem('password')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            axios.post(
                'https://api.chatengine.io/chats/',
                { 'title': title, 'admin_username': localStorage.getItem('user') },
                { headers: authObject },    
            )
            .then(response =>{
                setChats([...chats, response.data])
                setActiveChat(response.data.id)
            })
            .catch(error => console.log(error))
            handleClose()
        }catch(error){
            setError('Oops! something went wrong, try again.')
        }   
    }

    const err = (error) ? true : false

    return (
           <div className="modal-wrapper">
            <Modal.Header closeButton>
                <Modal.Title>Create New Chat</Modal.Title>
            </Modal.Header>  
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Chat Title..." 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)} 
                                required />
                        </Form.Group>
                    <Button type="submit" variant="outline-primary" className="mb-3 float-right">
                        Create
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

export default ChatsModal
