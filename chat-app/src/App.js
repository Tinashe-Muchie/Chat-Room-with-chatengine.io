import React from 'react'
import {ChatEngine} from 'react-chat-engine'
import './App.css'
import Login from './components/Login/Login'
import ChatArea from './components/ChatArea/ChatArea'
import GlobalContext from './components/Context/Context'

function App() {

  return (
    <div>
      <GlobalContext>
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
      </GlobalContext>
    </div>    
  );
}

export default App;
