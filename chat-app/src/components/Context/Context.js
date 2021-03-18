import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'

export const Context = createContext()
const projectID = 'db666265-557a-44c8-92a1-f9261e58cc4e'
const projectKey = '6346e83a-eb04-49bf-899b-b0850ef36b5a'

function GlobalContext({children}) {
    
    const [chats, setChats] = useState([])
    const [contacts, setContacts] = useState([])
    const [activeChat, setActiveChat] = useState(null)

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
      }, [chats]);

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

      const value = {
          chats,
          contacts, 
          selectedChat,
          setActiveChat,
          selectChat,
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