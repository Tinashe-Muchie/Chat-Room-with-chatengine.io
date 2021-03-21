import React, {useState, useContext, useCallback} from 'react'
import {Form, Button, InputGroup, Badge} from 'react-bootstrap'
import {sendMessage, isTyping} from 'react-chat-engine'
import {Icon} from '@iconify/react'
import {PictureOutlined} from '@ant-design/icons'
import paperPlane from '@iconify-icons/fa-regular/paper-plane'
import {Context} from '../Context/Context'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'

function MessageArea() {

    const [message, setMessage] = useState('')
    const {selectChat, messages, setMessages} = useContext(Context)
    const setRef = useCallback((node)=>{
        (node) && node.scrollIntoView({smooth:true})
    }, []) 

    const authObject = {
        publicKey: projectID,
        userName: localStorage.getItem('user'),
        userSecret: localStorage.getItem('password'),
    };
    const callback = (data)=> setMessages([...messages, data])
    const username = localStorage.getItem('user')
    const chatID = selectChat && selectChat.id
      
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

    const handleText = (e)=> {
        setMessage(e.target.value)
        isTyping(authObject, chatID, username)
    }

    const handleChange = (e)=> {
        sendMessage(authObject, selectChat.id, {files:e.target.files, text:''},callback)
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
            <div className="d-flex flex-column flex-grow-1 overflow-auto mb-1">
                <div className="tab-content flex-grow-1 ">
                    <div className="d-flex flex-column justify-content-end px-2 py-2">
                        {
                        messages.map((message, index)=>{
                            const lastMessage = (messages.length-1) === index
                            return (
                                <div 
                                    key={index} 
                                    className="my-1 d-flex flex-column"
                                    ref = {(lastMessage) ? setRef : null}
                                >
                                    <div>
                                        {
                                            (message.sender.username === localStorage.getItem('user'))
                                            ?   <>
                                                    {   (message.attachments && message.attachments.length > 0) 
                                                        ?  
                                                            <img
                                                                src={message.attachments[0].file}
                                                                alt="message-attachment"
                                                                className="message-image"
                                                                style={{ float: 'right' }}
                                                            />
                                                        :   <span className="float-right own-message-bubble">
                                                                {message.text} 
                                                            </span>
                                                    }   
                                                </> 
                                            :   <>
                                                    {   (message.attachments && message.attachments.length > 0) 
                                                        ?  
                                                            <img
                                                                src={message.attachments[0].file}
                                                                alt="message-attachment"
                                                                className="message-image"
                                                                style={{ float: 'left' }}
                                                            />
                                                        :   <span className="float-left their-message-bubble">
                                                                {message.text} 
                                                            </span>
                                                    }
                                                </>
                                        } 
                                    </div>
                                    <div>
                                        {
                                            (message.sender.username === localStorage.getItem('user'))
                                            ?   <span className="text-muted float-right message-sender">
                                                    You
                                                </span>
                                            :   <span className="text-muted float-left message-sender">
                                                    {message.sender.username}
                                                </span>
                                        
                                        }
                                    </div>
                                </div>
                            )
                        })
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
                            onChange={handleText}
                            style={{height:'10.5vh',resize:'none'}}
                        />
                        
                    <InputGroup.Append>
                        <Button>
                            <Form.Label htmlFor="upload-button">
                                <Badge className="image-button">
                                    <PictureOutlined className="picture-icon" />
                                </Badge>
                            </Form.Label>
                            <Form.Control
                                type="file"
                                multiple={false}
                                id="upload-button"
                                style={{ display: 'none' }}
                                onChange={handleChange.bind(this)}
                            />
                        </Button>
                        <Button type="submit"><Icon icon={paperPlane} /></Button>
                    </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>  
        </div>
    )
}

export default MessageArea
