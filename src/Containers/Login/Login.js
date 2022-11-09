import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from "../../Context/StateContext";//cambiar el context
import { DivCenter } from './Components/DivCenter';


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
            <div>

                <form>
                    <>
                        <label>User</label>
                        <input required type="text" placeholder="User" />
                    </>

                    <>
                        <label>Password</label>
                        <input required type="password" placeholder="Password" />
                    </>

                    <div>
                        <input type="submit" value="Signin" />
                    </div>
                </form>
            </div>
        </DivCenter>
    );
}
export default Login;