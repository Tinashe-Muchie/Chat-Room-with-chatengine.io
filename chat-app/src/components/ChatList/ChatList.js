import React, {useState, useContext} from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import ChatsModal from '../Modals/ChatsModal'
import ContactsModal from '../Modals/ContactsModal'
import Chats from './Chats'
import Contacts from  './Contacts'
import {Context} from '../Context/Context'

function ChatList() {

    const chatsKey = 'chats'
    const contactsKey = 'contacts'
    const {chats, contacts} = useContext(Context)

    const [key, setKey] = useState(chatsKey)
    const [show, setShow] =useState(false)

    const chatsOpen = key === chatsKey
    const handleOpen = ()=> setShow(true)
    const handleClose = ()=> setShow(false)
    
    return (
        <div className="d-flex flex-column" style={{width: '20vw'}}>
            <Tab.Container activeKey= {key} onSelect= {(k)=>setKey(k)}>
                <Nav justify variant="pills" className="mb-0 mt-2">
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
                        : <ContactsModal handleClose={handleClose} />
                    }
            </Modal>
        </div>
    )
}

export default ChatList
