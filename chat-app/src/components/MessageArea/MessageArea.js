import React, {useState, useContext} from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'
import {sendMessage} from 'react-chat-engine'
import {Icon} from '@iconify/react'
import paperPlane from '@iconify-icons/fa-regular/paper-plane'
import {Context} from '../Context/Context'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'

function MessageArea() {

    const [message, setMessage] = useState('')
    const {selectChat, messages} = useContext(Context)

    const authObject = {
        publicKey: projectID,
        userName: localStorage.getItem('user'),
        userSecret: localStorage.getItem('password'),
    };
    const callback = (data)=> console.log(data)
      
    const handleSubmit = (e)=> {
        e.preventDefault()
        sendMessage(authObject, selectChat.id, {text:message}, callback)

        setMessage('')
    }

    const handleLogout = ()=> {
        localStorage.removeItem('user')
        localStorage.removeItem('password')

        window.location.reload()
    }
    
    return (
        <div className="d-flex flex-column flex-grow-1 mx-1">
            <Button 
                variant="outline-primary" 
                type="button" 
                className="float-right mb-1 mt-2" 
                size="small" 
                onClick={handleLogout}>
                Logout
            </Button>
            <div className="id-tab mb-0 chat-title-container">
                    <div className="my-2 chat-title">
                        {selectChat.title}
                    </div>      
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <div className="tab-content flex-grow-1 overflow-auto mb-1">
                    <div className="d-flex align-items-end flex-column justify-content-end px-2 py-2">
                        {
                        messages.map((message)=>message.text)
                        }
                    </div>
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            style={{height:'10.5vh',resize:'none'}}
                        />
                    <InputGroup.Append>
                        <Button type="submit"><Icon icon={paperPlane} /></Button>
                    </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>  
        </div>
    )
}

export default MessageArea
