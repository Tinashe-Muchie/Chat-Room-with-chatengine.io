import React from 'react'
import {Helmet} from 'react-helmet'
import ChatList from '../ChatList/ChatList'
import MessageArea from '../MessageArea/MessageArea'

function ChatArea() {
    return (
        <div>
            <Helmet>
                <style>{'body {background-color: #0C0032}'}</style>
           </Helmet>
            <div className="d-flex container" style= {{height: '100vh' }}>
                <ChatList />
                <MessageArea />
            </div>
        </div>
    )
}

export default ChatArea
