import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateBookmark() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [id, setID] = useState(null);

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('name'));
        setUrl(localStorage.getItem('url'));
    }, []);
    let navigate = useNavigate();
    const updateAPIData = () => {
        axios.put(`http://` + process.env.REACT_APP_BACKENDHOST + `/bookmarks/${id}`, {
            name,
            url,
        }).then(() => {
            navigate('/bookmark/')
        })
    }
    return (
        <div>
            <Form className="update-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Url</label>
                    <input placeholder='https://youtube.com' value={url} onChange={(e) => setUrl(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}