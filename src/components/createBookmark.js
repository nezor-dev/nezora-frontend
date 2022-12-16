import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateBookmark() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    let navigate = useNavigate();
    const postData = () => {
        axios.post(`http://` + process.env.REACT_APP_BACKENDHOST+`/bookmarks`, {
            name,
            url
        }).then(() => {
            navigate('/bookmark/')
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Url</label>
                    <input placeholder='https://youtube.com' onChange={(e) => setUrl(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} type='Create'>Submit</Button>
            </Form>
        </div>
    )
}