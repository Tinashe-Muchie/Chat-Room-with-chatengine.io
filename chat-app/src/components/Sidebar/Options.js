import React, {useContext, useState} from 'react'
import {Button, InputGroup, FormControl, ListGroup} from 'react-bootstrap'
import {Context} from '../Context/Context'
import axios from 'axios'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'

function Options() {

    const {selectChat, members, setChats, chats, setMembers} = useContext(Context)
    const [username, setUsername] = useState('')
    const [user, setUser] = useState('')

    const authObject = {
        "Project-ID": projectID,
        "User-Name": localStorage.getItem("user"),
        "User-Secret": localStorage.getItem("password"),
    };

    const handleDeleteChat = () => {
        if(window.confirm('Are you sure you want to delete this chat')) {
        axios.delete(
            `https://api.chatengine.io/chats/${selectChat.id}/`,
            {headers: authObject}
        )
        .then((response)=>setChats(chats.filter(c=> c.id !==response.data.id)))
        .catch(error=> console.log(error))
        }
    }

    const handleRemoveMember = () => {
        if(window.confirm('Are you sure you want to remove this chat member')) {
        axios.put(
            `https://api.chatengine.io/chats/${selectChat.id}/people/`,
            { 'username': username },
            { headers: authObject },
        )
        .then(response => setMembers(members.filter(m => m.person.username !== response.data.person.username)))
        .catch(error => console.log(error))
        setUsername('')
        }
    }

    const handleLeaveChat = () => {
        if(window.confirm('Are you sure you want to leave this chat')) {
            axios.put(
                `https://api.chatengine.io/chats/${selectChat.id}/people/`,
                { 'username': user },
                { headers: authObject },
            )
            .then(response => setMembers(members.filter(m => m.person.username !== response.data.person.username)))
            .catch(error => console.log(error))
            setUser('') 
        }
    }
    
    if(selectChat) {
    return (
        <div className="d-flex flex-column">
            {   (selectChat.admin.username === localStorage.getItem('user'))
                ?       <> 
                      <div className="mx-1 mt-2 members-wrapper">
                        <span className="chat-members">Chat Members</span>
                        <ListGroup variant="flush">
                        {
                            members.length > 0 &&
                            members.map((member, index)=>(
                            <ListGroup.Item 
                                key={index} 
                                action
                                className="text-left"
                            >
                                {   (member.person.is_online) 
                                    ?   <div className="led-green mb-3">
                                            <span className="member-status">{member.person.username}</span>
                                        </div>
                                    :   <div className="led-red-on mb-3">
                                            <span className="member-status">{member.person.username}</span>
                                        </div>
                                }
                                
                            </ListGroup.Item>
                        ))
                        }
                        </ListGroup>
                    </div>  
                        <div className="d-flex flex-column mt-2 mx-1 remove-chat-member-wrapper">
                        <InputGroup>
                            <FormControl 
                                placeholder="Member Name"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                className="mx-3 mt-2"
                            />    
                        </InputGroup>
                        <Button
                            type="button"
                            onClick={handleRemoveMember}
                            className="my-2 mx-3"
                        >Remove Member</Button>
                        </div> 
                        <div className="d-flex flex-column mt-2 mx-1 remove-chat-member-wrapper">
                            <InputGroup>
                                <FormControl 
                                    placeholder="Username"
                                    value={user}
                                    onChange={(e)=>setUser(e.target.value)}
                                    className="mx-3 mt-2"
                                />    
                            </InputGroup>
                            <Button
                                type="button"
                                onClick={handleLeaveChat}
                                className="my-2 mx-3"
                            >Leave Chat</Button>
                            </div>
                            <Button
                                type="button"
                                onClick={handleDeleteChat}
                                className="mt-3 mx-1"
                            >Delete Chat</Button>
                    </>
                :   <div>
                        <div className="mx-1 mt-2 members-wrapper">
                            <span className="chat-members">Chat Members</span>
                            <ListGroup variant="flush">
                            {
                                members.length > 0 &&
                                members.map((member, index)=>(
                                <ListGroup.Item 
                                    key={index} 
                                    action
                                    className="text-left"
                                >
                                    {   (member.person.is_online) 
                                        ?   <div className="led-green mb-3">
                                                <span className="member-status">{member.person.username}</span>
                                            </div>
                                        :   <div className="led-red-on mb-3">
                                                <span className="member-status">{member.person.username}</span>
                                            </div>
                                    }
                                </ListGroup.Item>
                                ))
                            }
                            </ListGroup>
                        </div>
                        <div className="d-flex flex-column mt-2 mx-1 remove-chat-member-wrapper">
                            <InputGroup>
                                <FormControl 
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    className="mx-3 mt-2"
                                />    
                            </InputGroup>
                            <Button
                                type="button"
                                onClick={handleRemoveMember}
                                className="my-2 mx-3"
                            >Leave Chat</Button>
                            </div>
                    </div>       
            }
               
        </div>
    )} else {
        return(
            <div>
            </div>
    )}
}

export default Options
