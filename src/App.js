import React,{useState} from 'react'
import './App.css';
import Login from './Containers/Login/Login';
import {StateContext} from './Context/StateContext';

function App() {
  const [route, setRoute] = useState("signin"); //creamos el estado de route
  const [isSignedIn, setIsSignedIn]=useState(false);
  const [user, setUser]=useState({});

  //SETTING THE STATE BOX//////////
  const [box, setBox] = useState({});
 
  ////////////////INPUT ////////////  
  const [input, setInput] = useState("");

  /////////Setting Image///////////////////
  const [imageUrl, setImageUrl] = useState("");
 
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
    
    img:{
      input,
      setInput,
      box,
      setBox,
      setImageUrl, 
      imageUrl
    }
  }
  ////////////////RENDER PRINCIPAL PAGE///////////////////

  return (
    <div className="App">
     
      <StateContext.Provider value={Context_value}>
       

        {route === "signin"
          ? <Login />
          : (route === "home"
            ? <div>
              Home
            </div>
            : <h1>Registrar</h1>
          )
        }
      </StateContext.Provider>
    </div>
  );
}

export default App;
