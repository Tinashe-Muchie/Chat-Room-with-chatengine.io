import React, {useState} from 'react'
import {Tab, Nav} from 'react-bootstrap'
import Options from './Options'

function Sidebar() {

    const optionsKey = 'options'
    const [key, setKey] = useState(optionsKey)

    return (
        <div className="d-flex flex-column" style={{width: '20vw'}}>
           <Tab.Container activeKey= {key} onSelect= {(k)=>setKey(k)}>
                <Nav justify variant="pills" className="mb-0 mt-2">
                    <Nav.Item>
                        <Nav.Link eventKey={optionsKey}>Options</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="tab-content overflow-auto flex-grow-1 mb-3">
                    <Tab.Pane eventKey={optionsKey}>
                        <Options />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    )
}

export default Sidebar
