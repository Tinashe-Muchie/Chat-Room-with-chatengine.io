import React from 'react'
import {ChatEngine} from 'react-chat-engine'
import './App.css'
import Login from './components/Login/Login'
import ChatArea from './components/ChatArea/ChatArea'

function App() {

  return (
    <div>
    {
      (!localStorage.getItem('user'))
      ? <Login />
      : <>
          <ChatEngine 
            publicKey={'db666265-557a-44c8-92a1-f9261e58cc4e'}
            userName={localStorage.getItem('user')}
            userSecret={localStorage.getItem('password')}
            height='100vh'
            hideUI={true}
          />
          <ChatArea />
        </>  
    } 
    </div>    
  );
}

export default App;
