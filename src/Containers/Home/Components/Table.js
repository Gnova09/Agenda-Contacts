import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';


//////COMPONENTS//////
const Tablediv = styled.div`
    height: 60%;
    width: 100%;
    `
const UpdateBTN = styled.button`
    height: 80%;
    width: auto;
    background: orange;
    border: none;
    border-radius: 5px;
    :hover{
        cursor: pointer;
    }
`
const DeleteBTN = styled.button`
    height: 80%;
    width: auto;
    background: red;
    border: none;
    border-radius: 5px;
    :hover{
        cursor: pointer;
    }
    `
//////TABLE//////
const Table = () => {
    const [contacts, setContact] = useState([
        { id: 1, lastName: 'Snow', firstName: 'Jon', email: "bueno@gmail.com" },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: "pepe@gmail.com" },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: "juan@gmail.com" },
        { id: 4, lastName: 'Stark', firstName: 'Arya', email: "carol@gmail.com" },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: "miguel@gmail.com" },
        { id: 6, lastName: 'Melisandre', firstName: "ROCKTAS", email: "georges@hotmail.com" },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: "nova@yahoo.com" },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', email: "buo@gmail.com" },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: "nicolee@hotmail.com" }
    ]);
    const handleDeleteBtn = (id) => {
        setContact(contacts.filter((item)=> item.id !== id));
        console.log(contacts)
    }
    const columns = [
        { field: 'id', headerName: 'No.', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        {field: 'email', headerName: 'Email Address', flex: 1},
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: "update",
            headerName: "Update",
            width: 90,
            renderCell: (params) => {
                // you will find row info in params
                //returning button Update with handle function
                return(
                <UpdateBTN onClick={() => alert("clicked")}>Update</UpdateBTN>);    
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 90,
            renderCell: (params) => {
                // you will find row info in params
                //returning button Delete with handle function
                return(
                <DeleteBTN onClick={() => handleDeleteBtn(params.row.id)}>Delete</DeleteBTN>);    
            }
        }
    ];
    return (
        <Tablediv>
            <DataGrid
                rows={contacts}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </Tablediv>
    )
}

export default Table