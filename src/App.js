import logo from './logo.svg';
import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Shop from './routes/Shop';
import axios from 'axios';
import { useUser, useDatabase } from 'reactfire';
import { get, child, ref } from 'firebase/database';
import { CartContext } from "./CartContext";

function App() {

  const { userStatus, data:user } = useUser();
  const db = useDatabase();

  const [contextValue, setContext] = useContext(CartContext);

  const getProducts = async() =>{
    let response = await axios.get('https://shoestore-flask.herokuapp.com/api/products');

    let data = await response.data

    console.log(data)
    setShoes(data);
  }

  const [shoes, setShoes] = useState(() => getProducts());

  useEffect(() => {
    console.log(user);
    if(user) {
      let uid = user.uid;
      get(child(ref(db), `cart/${uid}`)).then((snapshot) => {
        if(snapshot.exists()){
          let c = snapshot.val();
          if(c) {
            setContext(c);
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [user])

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" render={()=> <Home title={'Home'} />}/>
        <Route path="/shop" render={()=><Shop title={'Shop'} shoes={shoes}/>}/>
      </Switch>
    </div>
  );
}

export default App;
