import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import theme from "./theme";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ColorModeScript} from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
       <ColorModeScript initialColorMode={'dark'} />

     <BrowserRouter>
     <App />
     </BrowserRouter>
   </React.StrictMode>
 );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
