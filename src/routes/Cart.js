import React, { useContext } from 'react'
import Modal from "react-bootstrap/Modal";
import Image from 'react-bootstrap/Image';
import { CartContext } from '../CartContext'
import './Cart.css';
import { set, ref } from 'firebase/database';
import { useDatabase, useUser } from 'reactfire';


const Cart = (props) => {

    const [contextValue, setContext] = useContext(CartContext);

    const { userStatus, data: user } = useUser();
    const db = useDatabase();

    console.log(contextValue);

    const totalCost = contextValue.reduce((price, curItem) => {
        return price + (curItem.quantity*curItem.price);
    }, 0)

    const increaseOne = (a) => {
        const updatedCart = [...contextValue];
        const updatedItemIndex = updatedCart.findIndex(item => item.id === a.id);

        if (updatedItemIndex < 0) {
            updatedCart.push({...a, quantity: 1})
        } else {
            const updatedItem = {...updatedCart[updatedItemIndex]};
            updatedItem.quantity += 1;
            updatedCart[updatedItemIndex] = updatedItem;
        }

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), updatedCart);
        }

        setContext(updatedCart);
    }

    const decreaseOne = (a) => {
        const updatedCart = [...contextValue];
        const updatedItemIndex = updatedCart.findIndex(item => item.id === a.id);

        const updatedItem = {...updatedCart[updatedItemIndex]};
        if (updatedItem.quantity > 1) {
            updatedItem.quantity -= 1;
            updatedCart[updatedItemIndex] = updatedItem;
        } else if (updatedItem.quantity === 1) {
            updatedCart.splice(updatedItemIndex, 1);
        }

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), updatedCart);
        }

        setContext(updatedCart);
    }

    const deleteOne = (a) => {
        const updatedCart = [...contextValue];
        const updatedItemIndex = updatedCart.findIndex(item => item.id === a.id);

        updatedCart.splice(updatedItemIndex, 1);

        if(user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), updatedCart);
        }

        setContext(updatedCart);
    }

    const clearCart = () => {
        const updatedCart = [];

        if(user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), updatedCart);
        }
        
        setContext(updatedCart);
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-90w" animation="true">
            <Modal.Header closeButton>
                <Modal.Title>Your Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body as="section">
                <table className="table table-image table-responsive">
                    <thread>
                        <tr>
                            <th className="col-sm-9">Product Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Subtotal</th>
                            <th className="col-sm-3 text-center"><button className="btn btn-sm btn-outline-danger" onClick={clearCart}>Clear Cart</button></th>
                        </tr>
                    </thread>
                    <tbody>
                    {contextValue.length <= 0 && <p><br/>No Item in the Cart!</p>}
                    {contextValue.map(a => {
                            return (
                                <tr>
                                    <td>
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <Image src={a.image} fluid rounded/>
                                            </div>
                                            <div className="product-info">
                                                <h4 className="product-title">{a.model}</h4>
                                                <span><em>Size:</em>{a.size}</span>
                                                <span><em>Color:</em>{a.color}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center text-lg text-medium">{a.price}</td>
                                    <td className="text-center">
                                            <div className="input-group mb-0">
                                                <span className="input-group-prepend">
                                                    <button type="button" className="btn btn-outline-secondary btn-number btn-sm" onClick={() => decreaseOne(a)}>-</button>
                                                </span>
                                                <label className="qty" style={{marginLeft: '.5rem', marginRight: '.5rem'}} >{a.quantity}</label>
                                                <span className="input-group-append">
                                                    <button type="button" className="btn btn-outline-secondary btn-number btn-sm" onClick={() => increaseOne(a)}>+</button>
                                                </span>
                                            </div>
                                    </td>
                                    <td className="text-center text-lg text-medium">${(a.price * a.quantity).toFixed(2)}</td>
                                    <td className="text-center"><span className="remove-from-cart" onClick={() => deleteOne(a)}><i class="bi bi-trash"></i></span></td>
                                </tr> 
                            )
                        })}
                    </tbody>
                </table>
                <div className="shopping-cart-footer">
                    <div className="column">
                    <form className="coupon-form" method="post">
                        <input className="form-control form-control-sm" type="text" placeholder="Coupon code" required="" />
                        <button className="btn btn-outline-primary btn-sm" type="submit">Apply Coupon</button>
                    </form>
                    </div>
                    <div className="column text-lg">Subtotal: <span className="text-medium">${totalCost.toFixed(2)}</span></div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="column"><button type="button" className="btn btn-outline-secondary" onClick={props.onHide}><i class="bi bi-arrow-left"></i> Back to Shpping</button></div>
                <div className="column">
                    <button type="button" className="btn btn-primary">Check Out</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;