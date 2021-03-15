import React, {useState} from 'react'
import axios from 'axios'

const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'
const projectKey = '6346e83a-eb04-49bf-899b-b0850ef36b5a'


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    

    const handleSubmit= async (e)=>{
        e.preventDefault()

        const authObj = {
            'Project-ID': projectID,
            'User-ID': username,
            'User-Password': password,
        }
        
        try {
            await axios.get('https://apichatengine.io/chats', {headers:authObj})

            localStorage.setItem('user',JSON.stringify(username))
            localStorage.setItem('password',JSON.stringify(password))

            setError('')
        } catch (error) {
            setError('Oops, wrong credentials')
        }
    }

    const Signup = ()=>{

        axios.post(
            'https://api.chatengine.io/projects/people/',
            { 'username': username, 'secret': password, 'first_name': '', 'last_name': '' },
	        { headers: { "Private-Key": projectKey } }
        )
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error))

        setUsername('')
        setPassword('')
    }
    

    return (
        <div>
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
                    <button type="submit" className="btn btn-outline-primary mx-2">Login</button>
                    <button type="button" className="btn btn-primary" onClick={Signup}>Signup</button>
                </div>   
                </form>
            </div>
            <div>{error}</div>  
        </div>
    )
}

export default Login