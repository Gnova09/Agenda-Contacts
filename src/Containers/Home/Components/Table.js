import React, { useContext, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { StateContext } from '../../../Context/StateContext';
import UpdateContact from './UpdateContact';
import { deleteDoc, doc,getDocs,collection, getFirestore } from 'firebase/firestore';


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
    const [update, setUpdate] = useState([{ id: 0, lastName: '', firstName: '', mobile: "", email: "" }]);
    const [accion, setAccion] = useState(false)

    const handleDeleteBtn = async (id) => {
        console.log(id)
        await deleteDoc(doc(getFirestore(), 'Contactos', id))
        //actualizar la tabla//
        getDocs(collection(getFirestore(),"Contactos"))
            .then(res => {
                setContact(res.docs.map(user => ({ id: user.id, ...user.data() })))
            })
    }
    const handleUpdateBtn = (id) => {
        const updatediv = document.getElementById('UpdateContact');
        updatediv.style.display = "flex";
        setUpdate(contacts.filter((item) => item.id === id));
    }
    const handleAddbtn = () => {
        const updatediv = document.getElementById('UpdateContact');
        updatediv.style.display = "flex";
        setAccion(true);
    }
    const columns = [
        { field: 'id', headerName: 'No.', width: 70 },
        { field: 'Nombre', headerName: 'First Name', width: 130 },
        { field: 'Apellidos', headerName: 'Last Name', width: 130 },
        { field: 'Email', headerName: 'Email Address', flex: 1 },
        { field: 'Mobile', headerName: 'Mobile #', flex: 0.5 },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'Nombre completo',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.Nombre || ''} ${params.row.Apellidos || ''}`,
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
            />
            <UpdateContact params={update} add={accion} />
            <AddBtn onClick={() => handleAddbtn()}>New Contact</AddBtn>
        </Tablediv>
    )
}

export default Table