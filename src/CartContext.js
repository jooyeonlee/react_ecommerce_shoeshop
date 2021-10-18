import React, { useState } from "react";

const CartContext = React.createContext([[], () => {}]);

let initialState = [];

const CartProvider = props => {
    const [state, setState] = useState(initialState);
    return (
        <CartContext.Provider value={[state, setState]}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }