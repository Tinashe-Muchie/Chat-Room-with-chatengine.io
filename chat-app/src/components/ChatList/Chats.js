import React from 'react'
import {ListGroup} from 'react-bootstrap'

function Chats({chats}) {
    return (
        <div>
            <ListGroup variant="flush">
                {chats && chats.map((chat, index)=>(
                    <ListGroup.Item 
                        key={index} 
                        action
                        active
                        className="text-left"
                    >
                        {chat.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Chats
