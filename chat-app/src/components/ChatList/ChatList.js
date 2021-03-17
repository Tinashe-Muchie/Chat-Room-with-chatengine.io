import React, {useState, useEffect} from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import ChatsModal from '../Modals/ChatsModal'
import ContactsModal from '../Modals/ContactsModal'
import axios from 'axios'
import Chats from './Chats'
import Contacts from  './Contacts'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'
const projectKey = '6346e83a-eb04-49bf-899b-b0850ef36b5a'

function ChatList() {

    const chatsKey = 'chats'
    const contactsKey = 'contacts'

    const [key, setKey] = useState(chatsKey)
    const [show, setShow] =useState(false)
    const [chats, setChats] = useState([])
    const [contacts, setContacts] = useState([])

    const chatsOpen = key === chatsKey
    const handleOpen = ()=> setShow(true)
    const handleClose = ()=> setShow(false)

    useEffect(()=>{
        const authObject = {
            'Project-ID': projectID,
            'User-Name': localStorage.getItem('user'),
            'User-Secret': localStorage.getItem('password')
        }
        axios.get(
            'https://api.chatengine.io/chats', 
            {headers:authObject}
        )
        .then((response)=>setChats(response.data))
    }, [chats])

    useEffect(()=>{
        const getContacts = async ()=>{
            try {
                axios.get(
                    'https://api.chatengine.io/projects/people/',
                    { headers: { "Private-Key": projectKey } }
                )
                .then((response)=>setContacts(response.data))
            }catch(error){
                console.log(error)
            }
        }
        getContacts()
    }, [contacts])
    
    return (
        <div className="d-flex flex-column" style={{width: '20vw'}}>
            <Tab.Container activeKey= {key} onSelect= {(k)=>setKey(k)}>
                <Nav justify variant="pills" className="mb-1 mt-2">
                    <Nav.Item>
                        <Nav.Link eventKey={chatsKey}>Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contactsKey}>People</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="tab-content overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={chatsKey}>
                        <Chats chats={chats} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={contactsKey}>
                        <Contacts contacts={contacts} />
                    </Tab.Pane>
                </Tab.Content>
                <Button className="mt-1 mb-3" onClick={handleOpen} variant="outline-primary">
                    {
                        (chatsOpen) 
                        ?  'New Chat'
                        :  'Add Person to Chat'
                    }
                </Button>
            </Tab.Container>
            <Modal show={show} onHide={handleClose}>
                    {
                        (chatsOpen) 
                        ? <ChatsModal handleClose={handleClose} />
                        : <ContactsModal handleClose={handleClose} contacts={contacts} />
                    }
            </Modal>
        </div>
    )
}

export default ChatList







//

/*return (
    <div style={{width:'20vw'}} className="d-flex flex-column">
        
           
        )*/