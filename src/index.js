import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import ProviderLayer from './ProviderLayer';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGG6s5wBVyObldAMAjpqR4re5KBCiYiPg",
  authDomain: "nike-776d9.firebaseapp.com",
  projectId: "nike-776d9",
  storageBucket: "nike-776d9.appspot.com",
  messagingSenderId: "394796161179",
  appId: "1:394796161179:web:73e94e6f4d87393522ce3e",
  databaseURL: "https://nike-776d9-default-rtdb.firebaseio.com"
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
