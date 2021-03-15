import React from 'react'
import {ChatEngine} from 'react-chat-engine'
import './App.css'
import Login from './components/Login/Login'

function App() {
  return (
    <div>
    <Login />
    {/*<ChatEngine 
      publicKey={'db666265-557a-44c8-92a1-f9261e58cc4e'}
      userName={'Tinashe'}
      userSecret={'Takudzwa@16'}
      height='100vh'
     // hideUI={true}
    />*/} 
    </div>
      
  );
}

export default App;
