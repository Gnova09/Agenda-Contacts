import React,{useEffect, useState} from 'react'
import './App.css';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import {StateContext} from './Context/StateContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore'


function App() {
  const [route, setRoute] = useState("signin"); //creamos el estado de route
  const [isSignedIn, setIsSignedIn]=useState(false);
  const [user, setUser]=useState({});
  /////CONTACT FOR TABLE/////
  const [contacts, setContact] = useState([]);
  const dbFirebase = getFirestore();
  const dbcollection = collection(dbFirebase, "Contactos");
  useEffect(()=>{
    getDocs(dbcollection)
              .then( res => {
                 setContact(res.docs.map(user => ({ id: user.id, ...user.data() })))
              })
  },[])
  ////////Context APP//////////
  let Context_value={
    route:{
      route,
      setRoute
    },
    login:{
      isSignedIn,
      setIsSignedIn
    },
    usuario:{
     user,
     setUser
    },
    table:{
      contacts,
      setContact
    }
  }
  ////////////////RENDER PRINCIPAL PAGE///////////////////

  return (
    <div className="App">
     
      <StateContext.Provider value={Context_value}>
       

        {route === "signin"
          ? <Login />
          : (route === "home"
            ? <Home />
            : <h1>Registrar</h1>
          )
        }
      </StateContext.Provider>
    </div>
  );
}

export default App;
