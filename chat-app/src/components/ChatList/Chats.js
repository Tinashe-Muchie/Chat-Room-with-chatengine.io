import React, {useContext} from 'react'
import {ListGroup} from 'react-bootstrap'
import {Context} from '../Context/Context'

function Chats({chats}) {

    const {selectedChat, setActiveChat} = useContext(Context)

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
                            <div>
                                {chat.title}
                            </div>
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
