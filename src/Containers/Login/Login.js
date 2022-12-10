import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from "../../Context/StateContext";//cambiar el context
import { DivCenter } from './Components/DivCenter';
import { Textbox } from './Components/Textbox';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'

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
        const dbFirebase = getFirestore();
        const dbcollection = collection(dbFirebase, "Usuarios");
        const dbfilter = query(dbcollection, where('Email', '==', email), where('Pass', '==', pass)); //valido el usuario en Firebase
        await getDocs(dbfilter)
            .then(res => {
                setUser(res.docs.map(user => ({ id: user.id, ...user.data() })))
                setIsSignedIn(true)
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
                            onChange={(e) => setEmail(e.target.value)} />
                    </>

                    <>
                        <label>Password</label>
                        <Textbox required
                            type="password"
                            onChange={(e) => setPass(e.target.value)} />
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
                            primary
                        />
                    </>
                </fieldset>
            </form>
        </DivCenter>
    );
}
export default Login;