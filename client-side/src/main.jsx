import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

export let backend_url;
if(process.env.NODE_ENV !== 'production'){
  backend_url = "http://localhost:8000";
}else{
  backend_url = "";
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
