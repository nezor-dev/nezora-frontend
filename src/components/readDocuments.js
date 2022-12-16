import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function ReadDocuments() {
    const [APIData, setAPIData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://` + process.env.REACT_APP_BACKENDHOST+`/documents`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    const setData = (data) => {
        let { ID, image, content, date, sender } = data;
        localStorage.setItem('ID', ID);
        localStorage.setItem('image', image);
        localStorage.setItem('content', content);
        localStorage.setItem('date', date);
        localStorage.setItem('sender', sender);
    }

    const openPDF = (data) => {
        let pdfWindow = window.open("")
        pdfWindow.document.write("<object title='"+ data.name +"'  width='100%' height='100%' data='" + encodeURI(data.image) + "'></object>")
    }

    const onDelete = (id) => {
        axios.delete(`http://` + process.env.REACT_APP_BACKENDHOST+`/documents/${id}`)
            .then(() => {
                getData();
            })
    }
    const getData = () => {
        axios.get(`http://` + process.env.REACT_APP_BACKENDHOST+`/documents`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }
    return (
        <div>
            <h3>Documents</h3>
            <Link to='/documents/create'><Button>Create</Button></Link>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Sender</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>View</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.ID}>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.date}</Table.Cell>
                                <Table.Cell>{data.sender}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/documents/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell><Button onClick={() => openPDF(data)}>View</Button></Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.ID)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}