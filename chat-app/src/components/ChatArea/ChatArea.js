import React, {useContext} from 'react'
import {Helmet} from 'react-helmet'
import {Image} from 'react-bootstrap'
import ChatList from '../ChatList/ChatList'
import MessageArea from '../MessageArea/MessageArea'
import Sidebar from '../Sidebar/Sidebar'
import {Context} from '../Context/Context'

function ChatArea() {

    const {selectChat} = useContext(Context)

    return (
        <div>
            <Helmet>
                <style>{'body {background-color: #0C0032}'}</style>
           </Helmet>
            <div className="d-flex container" style= {{height: '100vh' }}>
                <ChatList />
                { 
                    (selectChat) 
                    ?   <MessageArea />
                    :   <div className="no-chat-selected mx-3" style={{width: '42vw'}}>
                            <Image 
                                src= '/img/pointLeft.png'
                                className="point-Left mr-2"
                            /> 
                            Select a Chat
                        </div>
                }
                <Sidebar />
            </div>
        </div>
    )
}

export default ChatArea
