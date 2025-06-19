import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from "firebase/app";
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; 


const firebaseConfig = {
  apiKey: "AIzaSyA5mhSG1zS2bRIZ1x6m4LCII8gVbdl2Xt8",
  authDomain: "ecommerce-react-eeaed.firebaseapp.com",
  projectId: "ecommerce-react-eeaed",
  storageBucket: "ecommerce-react-eeaed.firebasestorage.app",
  messagingSenderId: "701108290502",
  appId: "1:701108290502:web:bf90d99e38da84fd2468c7"
};

initializeApp (firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
