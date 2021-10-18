import React, { useState, useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import './Navbar.css'
import Cart from '../routes/Cart'
import { CartContext } from "../CartContext";
import { useDatabase, useAuth, useUser, useSigninCheck } from "reactfire";
import { ref, set, get, child } from 'firebase/database';

const Navbar = () => {
    const auth = useAuth();
    const db = useDatabase();
    
    const { userStatus, data:user } = useUser();
    const { signInStatus, data:signInCheckResult } = useSigninCheck();

    const [modalShow, setModalShow] = useState(false);

    const [cartItems, setCartItems] = useContext(CartContext);

    const totalCount = cartItems.reduce((count, curItem) => {
        return count + curItem.quantity;
    }, 0)

    const checkdatabase = async() => {
        let result = await signin();

        let uid = result.user.uid;
        get(child(ref(db), `carts/${uid}`)).then((snapshot) => {
            if(snapshot.exists()){
                let c = snapshot.val();
                if(c) { setCartItems(c); }
            } else {
                set(ref(db, `carts/${uid}`), cartItems);
                console.log('set');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let x = await signInWithPopup(auth, provider);
        return x;
    }

    const signout = async () => {
        await signOut(auth).then(() => console.log('signed out user'));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand text-light" to='/'>
                    <img className="img-fluid logo" src="https://miro.medium.com/max/700/0*Y5h3pR1GAGTSk3yG.jpg" alt="" />
                </Link>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item custom-nav-margin">
                        <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                    </li>
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to='/shop'>Product</Link>
                    </li>
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to='/' tabindex="-1" aria-disabled="true">About us</Link>
                    </li>
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to='/' tabindex="-1" aria-disabled="true">Contact us</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    {
                        signInStatus === 'loading'?
                            <li className="nav-item text-nowrap">
                                <span className="nav-link auth">Fetching user information...</span>
                            </li>
                        :
                        user? 
                            <li className="nav-item text-nowrap">
                                <span className="nav-link auth" onClick={signout}>Sign-Out</span>
                            </li>
                        :
                            <li className="nav-item text-nowrap">
                                <Link className="nav-link auth" to='/' onClick={checkdatabase}>Sign-in</Link>
                            </li>
                    }
                    <li className="nav-item text-nowrap">
                        <span className="nav-link" onClick={()=>setModalShow(true)}>
                            <i className="bi bi-bag"></i>
                            {totalCount > 0 && <span className="cart_count">({totalCount})</span>}
                        </span>
                        <Cart show={modalShow} onHide={()=>setModalShow(false)}/>
                    </li>
                </ul>
            </div>
        </nav> 
    )
}

export default Navbar;