import React, {useState} from 'react'
import {ListGroup} from 'react-bootstrap'

function Chats({chats}) {

    const [activeChat, setActiveChat] = useState(0)
    let selectedChat = chats.map((chat)=>{
            return (chat.id === activeChat)
        })

    if(chats)
    return (
        <div>
            <ListGroup variant="flush">
                {
                    chats.length > 0
                    ?   chats.map((chat, index)=>(
                        <ListGroup.Item 
                            key={chat.id} 
                            action
                            active={selectedChat[index]}
                            onClick={()=>setActiveChat(chat.id)}
                            className="text-left"
                        >
                            {chat.title}
                        </ListGroup.Item>
                    ))
                    :   <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '25vh',
                            fontWeight: 'bolder'
                        }}>
                            Create New Chats!
                        </div>
            }
            </ListGroup>
        </div>
    )
}

export default Chats
