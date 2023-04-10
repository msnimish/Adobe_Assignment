import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

export let backend_url;
if(process.env.NODE_ENV !== 'production'){
  // backend_url = "http://localhost:8000/api";
  backend_url = "https://panicky-snaps-crab.cyclic.app/api";
}else{
  backend_url = "/api";
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>,
)
