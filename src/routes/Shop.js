import React from 'react';
import './Shop.css';
import Product from '../components/Product'

const Shop = (props) => {
    return (
        <div className="container mb-5">
            {console.log(props.shoes)}
            {console.log(props.cart)}
            <h3 className="custom-section-title color-1">Shoes and Sneakers</h3>
            <br />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {
                !props.shoes
                ?
                <h1>Loading product data...</h1>
                :
                Object.values(props.shoes).map((shoe) => {
                    return <Product shoe={shoe} key={shoe.id}/>
                })
            }
            </div>
        </div>
    )
}

export default Shop;