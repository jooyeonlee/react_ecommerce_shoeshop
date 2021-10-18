import React, { useState, useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../CartContext";
import { set, ref } from 'firebase/database';
import { useDatabase, useUser } from 'reactfire';


const Productdetail = (props) => {

    const { userStatus, data: user } = useUser();
    const db = useDatabase();
    const [contextValue, setContext] = useContext(CartContext);

    const addToCart = () => {
        let productId = props.shoe.id;
        let data = props.shoe;

        const updatedCart = [...contextValue];
        const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);
        
        if (updatedItemIndex < 0) {
            updatedCart.push({...data, quantity: quantity.count, size: size.selectedValue});
        } else {
            const updatedItem = {...updatedCart[updatedItemIndex]};
            updatedItem.quantity += quantity.count;
            updatedCart[updatedItemIndex] = updatedItem;
        }

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), updatedCart);
        }

        setContext(updatedCart);
        props.onHide();
    }

    const [quantity, setQuantity] = useState({
        count: 0
    });

    const decrease = (e) => {
        if(quantity.count <= 0){
            return
        }
        setQuantity({count: quantity.count - 1});
    }

    const [size, setSize] = useState({
        selectedValue: null
    })

    const handleDropdownChange = (e) => {
        setSize({selectedValue: e.target.value})
    }

    useEffect(() => {
        quantity.count = 0
    }, [props.onHide]);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-90w" animation="true">
            <Modal.Header closeButton>
                <Modal.Title>Product Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body as="section">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col">
                        <Image src={props.shoe.image} fluid rounded/>
                    </div>
                    <div className="col">
                        <h5>{props.shoe.model}</h5>
                        <p className="mb-2 text-muted text-uppdercase small">{props.shoe.category}</p>
                        <p className="pt-1">{props.shoe.description}</p>
                        <div className="table-responsive">
                            <table className="table table-sm table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <th className="pl-0 w-25" scope="row"><strong>Model</strong></th>
                                        <td>${props.shoe.price}</td>
                                    </tr>
                                    <tr>
                                        <th className="pl-0 w-25" scope="row"><strong>Color</strong></th>
                                        <td>{props.shoe.color}</td>
                                    </tr>
                                    <tr>
                                        <th className="pl-0 w-25" scope="row"><strong>Code</strong></th>
                                        <td>{`${props.shoe.stylecode1}-${props.shoe.stylecode2}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div className="table-responsive mb-2">
                            <table className="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="pl-0 pb-0 w-25">Quantity</td>
                                        <td className="pb-0">Select size</td>
                                    </tr>
                                    <tr>
                                        <td className="pl-0">
                                            <div className="input-group mb-0">
                                                <span className="input-group-prepend">
                                                    <button type="button" className="btn btn-outline-secondary btn-number btn-sm" onClick={decrease}>-</button>
                                                </span>
                                                <label className="qty" style={{marginLeft: '.5rem', marginRight: '.5rem'}} >{quantity.count} </label>
                                                <span className="input-group-append">
                                                    <button type="button" className="btn btn-outline-secondary btn-number btn-sm" onClick={()=>setQuantity({count:quantity.count+1})}>+</button>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mt-1">
                                                <select className="form-select form-select-sm" value={size.selectedValue} onChange={handleDropdownChange}>
                                                    {props.shoe.size.map(item => (
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary" onClick={props.onHide}>Close</button>
                <button type="button" className="btn btn-primary" onClick={addToCart}>Add Cart</button>
            </Modal.Footer>
        </Modal>

    );
}

export default Productdetail;