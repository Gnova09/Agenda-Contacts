import React,{useContext} from 'react'
import styled from 'styled-components'
import {StateContext} from '../../../Context/StateContext';

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    top: 0;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;
    background: #fff2ff;
    background: rgb(0,207,251);
`
const Ul =styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 10px;
    margin-right: 10px;
    li:hover{
        cursor: pointer;
    }
`
const Label=styled.label`
    font-weight: bold;
    margin-left: 10PX;
`
const Logout =styled.li`
font-weight: bold;
`
const Navbar = () => {
    const { route, usuario, login } = useContext(StateContext);
    const {user} = usuario;
    const {setRoute}=route;
    const{setUser}=usuario;
    const {setIsSignedIn}=login;
    const handleSingOut=() =>{ 
        setUser({})
        setIsSignedIn(false);
        setRoute("signin")
    }

    return (
        <Nav>
            <Label>Agenda Contactos</Label>
            <Ul>
                <li>{user.name.toUpperCase()}</li>
                <Logout onClick={()=>handleSingOut()}>Log out</Logout>
            </Ul>
        </Nav>
    )
}

export default Navbar;