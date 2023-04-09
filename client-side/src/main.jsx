import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


export let backend_url = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
