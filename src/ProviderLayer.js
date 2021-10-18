import React from 'react';
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { useFirebaseApp, AuthProvider, DatabaseProvider } from 'reactfire';
import App from './App';
import { CartProvider } from "./CartContext";

const ProviderLayer = () => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const db = getDatabase(app);
    
    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={db}>
                <CartProvider>
                    <App />
                </CartProvider>
            </DatabaseProvider>
        </AuthProvider>
    )
}

export default ProviderLayer;