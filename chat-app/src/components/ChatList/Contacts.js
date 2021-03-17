import React from 'react'
import {ListGroup} from 'react-bootstrap'

function Contacts({contacts}) {

    if(contacts)
    return (
        <div>
            <ListGroup variant="flush">
                {
                    contacts.length > 0
                    ?   contacts.map((contact, index)=>(
                            (contact.username === localStorage.getItem('user')) 
                            ? null
                            : <ListGroup.Item 
                                key={index} 
                                action
                                className="text-left"
                                >
                                    { contact.username}
                                </ListGroup.Item>
                    ))
                    :   <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '25vh',
                            fontWeight: 'bolder'
                        }}>
                            No Contacts to display!
                        </div>
            }
            </ListGroup>
        </div>
    )
}

export default Contacts