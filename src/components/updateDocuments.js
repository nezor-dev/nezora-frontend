import React, { useState, useEffect } from 'react';
import { Button, Form, StepContent } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateBookmark() {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [sender, setSender] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('name'));
        setImage(localStorage.getItem('image'));
        setContent(localStorage.getItem('content'));
        setDate(localStorage.getItem('date'))
        setSender(localStorage.getItem('sender'))
    }, []);
    let navigate = useNavigate();
    const updateAPIData = () => {
        axios.put(`http://` + process.env.REACT_APP_BACKENDHOST + `/documents/${id}`, {
            name,
            image,
            content,
            data,
            sender,
        }).then(() => {
            navigate('/documents/')
        })
    }
    const openPDF = (data) => {
        let pdfWindow = window.open("")
        pdfWindow.document.write("<object title=''  width='100%' height='100%' data='" + encodeURI(data) + "'></object>")
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
            <Form className="update-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>PDF</label>
                    <input
                        class="form-control form-control-lg"
                        id="selectPDFfile"
                        type="file"
                        onChange={(e) => uploadImage(e)}
                    />
                    <Button onClick={() => openPDF(image)}>View</Button>
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <input placeholder="content" value={content} type="blob" onChange={(e) => setContent(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.valueAsDate)} />
                </Form.Field>
                <Form.Field>
                    <label>Sender</label>
                    <input placeholder='Sender' value={sender} onChange={(e) => setSender(e.target.value)} />
                </Form.Field>
                <Button onClick={updateAPIData} type='Create'>Submit</Button>
            </Form>
        </div>
    )
}