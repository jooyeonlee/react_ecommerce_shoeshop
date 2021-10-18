import React, { useState } from 'react'
import './Product.css'
import Productdetail from './Productdetail'

const Product = (props) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="col">
            <div className="card h-100 p-3 custom-card">
                <div class="custom-card-img-bg">
                    <img src={props.shoe.image} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title custom-card-title color-1">{props.shoe.model}</h5>
                    <p className="card-text">{props.shoe.category}</p>
                </div>
                <div className="card-footer d-flex justify-content-between bg-white border-0">
                    <h2 class="price">${props.shoe.price}</h2>
                    <button class="btn btn-primary custom-btn" onClick={()=>setModalShow(true)}>
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                    <Productdetail show={modalShow} onHide={()=>setModalShow(false)} shoe={props.shoe}/>
                </div>
            </div>
        </div>
    )
}

export default Product;