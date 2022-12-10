import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { StateContext } from '../../../Context/StateContext'
import { getFirestore, getDocs, doc, collection, addDoc, updateDoc } from 'firebase/firestore'

const Container = styled.div`
    display: none;
    left: 0;
    flex-direction: column;
    position: absolute;
    height: auto;
    width: 300px;
    border: 1px solid blue;
    background-color: white;
    border-radius: 5px;
`
const Label = styled.label`
    height: 50px;
    width: 100%;
    text-align: left;
    top: 0;
    background-color: aqua;
    font-weight: bold;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: calc(100%-51px);
    margin: 20px;
    align-items: flex-start;
    gap: 10px;

`
const TextBox = styled.input`
    width: -webkit-fill-available;
    height: 20px;
    border-radius: 5px;
    border: 1px solid gray;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    label{
        font-weight: bold;
    }
`
const BtnInput = styled.button`
    height: 30px;
    width: 60px;
    color: white;
    text-align: center;
    background: ${props => props.update ? "orange" : "red"};
    border: none;
    border-radius: 5px;
    :hover{
        cursor: pointer;
    }
`
const BtnContainer = styled.div`
display: flex;
flex-direction: row;
gap: 5px;
`
const handleCancelbtn = () => {
    const UpdateContact = document.getElementById("UpdateContact");
    UpdateContact.style.display = "none"
}

const UpdateContact = (user, add) => {
    const { params } = user
    const [Fname, setFname] = useState(params[0].firstName);
    const [Lname, setLname] = useState(params[0].lastName);
    const [Email, setEmail] = useState(params[0].email);
    const [Mobile, setMobile] = useState(params[0].mobile);
    const { table } = useContext(StateContext);
    const { contacts, setContact } = table;
    const dbcollection = collection(getFirestore(), "Contactos");
    //actualizar la tabla//
    const ContactUpdate = () => {
        getDocs(dbcollection)
            .then(res => {
                setContact(res.docs.map(user => ({ id: user.id, ...user.data() })))
            })
    }
    useEffect(() => {
        setFname(params[0].firstName)
        setLname(params[0].lastName)
        setEmail(params[0].email)
        setMobile(params[0].mobile)
        document.getElementById("FName").value = ""
        document.getElementById("LName").value = ""
        document.getElementById("Email").value = ""
        document.getElementById("Mobile").value = ""
        //eslint-disable-next-line
    }, [user]
    )
    const handleUpdatebtn = async (id) => {
        
        console.log(id)
        await updateDoc(doc(dbcollection, id), {
            Apellidos: Lname,
            Nombre: Fname,
            Mobile: Mobile,
            Email: Email
        });
        ContactUpdate();
        handleCancelbtn();
    }
    const handleAddbtn = async (id) => {
        await addDoc(
            dbcollection,
            {
                Apellidos: Lname,
                Nombre: Fname,
                Mobile: Mobile,
                Email: Email
            }
        ).then(id => console.log);
        ContactUpdate();
        handleCancelbtn();
    }

    return (
        <Container id='UpdateContact'>
            <Label>Contact Form</Label>
            <Form>
                <InputContainer>
                    <label>First Name</label>
                    <TextBox type="text" placeholder={Fname} id='FName' onChange={(e) => setFname(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <label>Last Name</label>
                    <TextBox type="text" placeholder={Lname} id='LName' onChange={(e) => setLname(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <label>Email</label>
                    <TextBox type="text" placeholder={Email} id='Email' onChange={(e) => setEmail(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <label>Mobile #</label>
                    <TextBox type="text" placeholder={Mobile} id='Mobile' onChange={(e) => setMobile(e.target.value)} />
                </InputContainer>
            </Form>
            <BtnContainer>
                <BtnInput onClick={() => handleCancelbtn()}>Cancel</BtnInput>
                <BtnInput type="submit" onClick={() => add ? handleAddbtn(params[0].id) : handleUpdatebtn(params[0].id)} update>Save</BtnInput>
            </BtnContainer>
        </Container>
    )
}

export default UpdateContact