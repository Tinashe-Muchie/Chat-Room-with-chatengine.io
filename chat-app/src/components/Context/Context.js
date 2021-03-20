import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'

export const Context = createContext()
const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'
const projectKey = '6346e83a-eb04-49bf-899b-b0850ef36b5a'

function GlobalContext({children}) {
    
    const [chats, setChats] = useState([])
    const [contacts, setContacts] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])

    let selectedChat = chats.map((chat)=>{
        return (chat.id === activeChat)
    })
    let selectChat = chats.find((chat, index)=>{
        return selectedChat[index] === true 
    })
    
    useEffect(() => {
        const authObject = {
          "Project-ID": projectID,
          "User-Name": localStorage.getItem("user"),
          "User-Secret": localStorage.getItem("password"),
        };
        axios
          .get("https://api.chatengine.io/chats", { headers: authObject })
          .then((response) => setChats(response.data));
      }, []);

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
    }, [])

    useEffect(()=>{
        const authObject = {
            "Project-ID": projectID,
            "User-Name": localStorage.getItem("user"),
            "User-Secret": localStorage.getItem("password"),
          };
          (selectChat) &&
          axios
            .get(`https://api.chatengine.io/chats/${selectChat.id}/people/`, { headers: authObject })
            .then((response) => setMembers(response.data))
    }, [selectChat])

    useEffect(()=>{
        const authObject = {
            "Project-ID": projectID,
            "User-Name": localStorage.getItem("user"),
            "User-Secret": localStorage.getItem("password"),
          };
        (selectChat) &&
        axios
            .get(`https://api.chatengine.io/chats/${selectChat.id}/messages/`, { headers: authObject })
            .then((response) => setMessages(response.data))
    }, [selectChat])

      const value = {
          chats,
          contacts, 
          selectedChat,
          setActiveChat,
          selectChat,
          members,
          messages,
      }

    return (
        <div>
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default GlobalContext
