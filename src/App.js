import React,{useState} from 'react'
import './App.css';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import {StateContext} from './Context/StateContext';

function App() {
  const [route, setRoute] = useState("signin"); //creamos el estado de route
  const [isSignedIn, setIsSignedIn]=useState(false);
  const [user, setUser]=useState({});
  /////CONTACT FOR TABLE/////
  const [contacts, setContact] = useState([
    { id: 1, lastName: 'Snow', firstName: 'Jon',mobile:"8094562145", email: "bueno@gmail.com" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei',mobile:"8094562145", email: "pepe@gmail.com" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime',mobile:"8094562145", email: "juan@gmail.com" },
    { id: 4, lastName: 'Stark', firstName: 'Arya',mobile:"8094562145", email: "carol@gmail.com" },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',mobile:"8094562145", email: "miguel@gmail.com" },
    { id: 6, lastName: 'Melisandre', firstName: "ROCKTAS",mobile:"8094562145", email: "georges@hotmail.com" },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara',mobile:"8094562145", email: "nova@yahoo.com" },
    { id: 8, lastName: 'Frances', firstName: 'Rossini',mobile:"8094562145", email: "buo@gmail.com" },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey',mobile:"8094562145", email: "nicolee@hotmail.com" }
]);

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
