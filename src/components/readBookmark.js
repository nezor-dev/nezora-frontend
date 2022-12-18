import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function ReadBookmark() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://` + process.env.REACT_APP_BACKENDHOST+`/bookmarks`)
            .then((response) => {
                setAPIData(response.data.data);
            })
    }, [])
    const setData = (data) => {
        let { ID, name, url } = data;
        localStorage.setItem('ID', ID);
        localStorage.setItem('name', name);
        localStorage.setItem('url', url);
    }
    const onDelete = (id) => {
        axios.delete(`http://` + process.env.REACT_APP_BACKENDHOST+`/bookmark`,{data:{ID: id}})
            .then(() => {
                getData();
            })
    }
    const getData = () => {
        axios.get(`http://` + process.env.REACT_APP_BACKENDHOST+`/bookmarks`)
            .then((getData) => {
                setAPIData(getData.data.data);
            })
    }
    return (
        <div>
            <h3>Bookmarks</h3>
            <Link to='/bookmark/create'><Button>Create</Button></Link>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Url</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.ID}>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.url}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/bookmark/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
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