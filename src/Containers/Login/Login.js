import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from "../../Context/StateContext";//cambiar el context
import { DivCenter } from './Components/DivCenter';
import { Textbox } from './Components/Textbox';


const Login = () => {

    const { route, login, usuario } = useContext(StateContext);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const { setRoute } = route;
    const { isSignedIn, setIsSignedIn } = login;
    const { setUser } = usuario;

    useEffect(() => {

        if (isSignedIn) {

            setRoute("home")
        }
        // eslint-disable-next-line
    }, [isSignedIn])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": pass
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://polar-anchorage-52776.herokuapp.com/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                // eslint-disable-next-line 
                const res = result === "Not enable to login" ? alert("Credenciales incorrectas") :
                    (
                        setUser(result),
                        setIsSignedIn(true)
                    );
            })
    }

    return (
        <DivCenter >

            <form className='LoginContainer' onSubmit={handleSubmit} >
                <fieldset >
                    <legend>Signin</legend>
                    <>
                        <label>User</label>
                        <Textbox required 
                        type="text" 
                        onChange={(e)=>setEmail(e.target.value) } />
                    </>

                    <>
                        <label>Password</label>
                        <Textbox required 
                        type="password" 
                        onChange={(e)=> setPass(e.target.value)} />
                    </>
                    < >
                        <span>
                        <Textbox type="checkbox" /> Remenber me
                        </span>
                    </>
                    < >
                        <Textbox 
                        classname="Submitbutton" 
                        type="submit" 
                        value="Signin"  
                        onSubmit=""
                        />
                    </>
                </fieldset>
            </form>
        </DivCenter>
    );
}
export default Login;