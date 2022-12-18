import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';


export default function CreateMail() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [sender, setSender] = useState('');

    let navigate = useNavigate();
    const postData = () => {
        axios.post(`http://` + process.env.REACT_APP_BACKENDHOST + `/mail`, {
            name,
            image,
            content,
            date,
            sender
        }).then(() => {
            navigate('/mails/')
        })
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
    };
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>PDF</label>
                    <input
                        class="form-control form-control-lg"
                        id="selectAvatar"
                        type="file"
                        onChange={(e) => uploadImage(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <input placeholder="content" type="blob" onChange={(e) => setContent(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Date</label>
                    <input type="date" onChange={(e) => setDate(e.target.valueAsDate)} />
                </Form.Field>
                <Form.Field>
                    <label>Sender</label>
                    <input placeholder='Sender' onChange={(e) => setSender(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} type='Create'>Submit</Button>
            </Form>
        </div>
    )
}