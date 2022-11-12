import React, { useContext,useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { StateContext } from '../../../Context/StateContext';
import UpdateContact from './UpdateContact';


//////COMPONENTS//////
const Tablediv = styled.div`
    height: 65%;
    width: 100%;
    display: flex;
    flex-direction: column;
    `
const UpdateBTN = styled.button`
    height: 80%;
    width: auto;
    background: ${props => props.primary ? "orange" : "red"};
    border: none;
    border-radius: 5px;
    :hover{
        cursor: pointer;
    }
`
const AddBtn = styled.button`
    height: 50px;
    
    width: fit-content;
    background: skyblue ;
    border:none;
    border-radius: 5px;
    color: white;
    :hover{
        cursor: pointer;
    }
`
//////TABLE//////
const Table = () => {
    const { table } = useContext(StateContext);
    const { contacts, setContact } = table;
    const [update,setUpdate]=useState([{ id: 0, lastName: '', firstName: '',mobile:"", email: "" }]);
    const[accion,setAccion]=useState(false)

    const handleDeleteBtn = (id) => {
        setContact(contacts.filter((item) => item.id !== id));
    }
    const handleUpdateBtn = (id) => {
        const updatediv = document.getElementById('UpdateContact');
        updatediv.style.display = "flex";
        setUpdate(contacts.filter((item)=>item.id === id));
    }
    const handleAddbtn = () => {
        const updatediv = document.getElementById('UpdateContact');
        updatediv.style.display = "flex";
        setAccion(true);
        
    }
    const columns = [
        { field: 'id', headerName: 'No.', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email Address', flex: 1 },
        { field: 'mobile', headerName: 'Mobile #', flex: 0.5 },
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
                return (
                    <UpdateBTN primary onClick={() => handleUpdateBtn(params.row.id)}>Update</UpdateBTN>);
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 90,
            renderCell: (params) => {
                // you will find row info in params
                //returning button Delete with handle function
                return (
                    <UpdateBTN onClick={() => handleDeleteBtn(params.row.id)}> Delete</UpdateBTN>);
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
            <UpdateContact params={update} add={accion}/>
            <AddBtn onClick={()=> handleAddbtn() }>New Contact</AddBtn>
        </Tablediv>
    )
}

export default Table