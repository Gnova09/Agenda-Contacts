import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';

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
const FormEmail = styled.form`
display: flex;
flex-direction: column;
gap: 5px;
margin: 10px;
`
const SendEmail = ({params}) => {
    const form = useRef();
    const handleCancelbtn = (e) => {
        const UpdateContact = document.getElementById("SendEmailDiv");
        UpdateContact.style.display = "none"
    }
    const handleSubmitEmail = (e) => {
      //  e.preventDefault();

        emailjs.sendForm('service_jnxlxfi', 'template_zed7zpm', form.current, 'gB6uaI2Iy3WdaHeFv')
            .then((result) => {
                result.status=== 200 ? alert("Correo Enviado" ): console.log(result);
            }, (error) => {
                console.log(error.text);
            });
        //e.target.reset();
        handleCancelbtn();
    };

    return (
        <Container id= "SendEmailDiv">
            <FormEmail ref={form} onSubmit={handleSubmitEmail}>
                <label>Name</label>
                <input type="text" name="user_name" value={`${params.Nombre} ${params.Apellidos}`} />
                <label>Email</label>
                <input type="email" name="user_email" value={params.Email} />
                <label>Message</label>
                <textarea name="message" />
            </FormEmail>
            <BtnContainer>
                <BtnInput  onClick={() => handleCancelbtn()}>Cancel</BtnInput>
                <BtnInput update type='submit'  onClick={() => handleSubmitEmail()}>Send</BtnInput>
            </BtnContainer>
        </Container>
    );
};
export default SendEmail;