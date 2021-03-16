import React, {useState} from 'react'
import {Button, Form, InputGroup } from 'react-bootstrap'

function MessageArea() {

    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

    }
    return (
        <div className="d-flex flex-column flex-grow-1 ml-1">
            <Button variant="outline-primary" type="submit" className="float-right mb-1 mt-2" size="small">
                Logout
            </Button>
            <div className="tab-content flex-grow-1 overflow-auto mb-1">
                <div className="d-flex flex-column align-items-end justify-content-end px-1 py-2">
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                            style={{height:'10.5vh',resize:'none'}}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default MessageArea
