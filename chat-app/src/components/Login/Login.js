import React, {useState} from 'react'
import axios from 'axios'
import {Helmet} from 'react-helmet'
import {Alert} from 'react-bootstrap'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'
const projectKey = '6346e83a-eb04-49bf-899b-b0850ef36b5a'


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [chats, setChats] = useState('')
    const [error, setError] = useState('')
    

    const handleSubmit= async (e)=>{
        e.preventDefault()

        const authObj = {
            'Project-ID': projectID,
            'User-Name': username,
            'User-Secret': password,
        }
        
        try {
            await axios.get(
                'https://api.chatengine.io/chats', 
                {headers:authObj}
            )
            .then((response)=>setChats(response.data))

            localStorage.setItem('user', username)
            localStorage.setItem('password', password)

            window.location.reload()
            setError('')

        } catch (error) {
            setError('Oops, wrong credentials!')
        }

        setUsername('')
        setPassword('')
    }

    const Signup = async ()=>{

        try {
            await axios.post(
                'https://api.chatengine.io/projects/people/',
                { 'username': username, 'secret': password, 'first_name': '', 'last_name': '' },
                { headers: { "Private-Key": projectKey } }
            )

            setError('')
        } catch (error) {
            setError('Something went wrong, restart the signup process!')
        }        

        setUsername('')
        setPassword('')
    }
    
    const err = error ? true : false
    console.log(chats)

    return (
        <div>
            <Helmet>
                <style>{`body {background-color: #0C0032}`}</style>
            </Helmet>
            <div className="container" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={handleSubmit} className="form-wrapper">
                    <div className="form-group mb-3">
                        <input 
                            type="text" 
                            id="username"
                            placeholder="&#xf007; Username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            className="form-control-lg mb-3"
                        /><br/>
                        <input 
                            type="password"
                            id="password"
                            placeholder="&#xf084; Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="form-control-lg mb-3"
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-primary mx-1">Login</button>
                        <button type="button" className="btn btn-primary" onClick={Signup}>Create New User</button>
                    </div>   
                </form>
            </div> 
            <div className="mt-3" style={{display:'flex', justifyContent:'center'}}>
                {(err) && <Alert variant='dark' style={{color: '#C5C6C7', backgroundColor: '#3500D3'}}>
                    {error}
                </Alert>}
                
            </div>
        </div>
    )
}

export default Login