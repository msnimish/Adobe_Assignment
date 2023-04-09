import { useState } from 'react'
import axios from 'axios';
import { backend_url } from './main.jsx';
// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const [text, setText] = useState("No Message");

  const fetchData = async() =>{ 
    let res = await axios.get(`${backend_url}/api`);
    console.log(res.url);
    setText(res.data);
  }

  let getData = async()=>{
    await fetchData();
  }

  return (
    <div>
      <button onClick={getData}>Get Message</button>
      <p>Message: {text}</p>
    </div>
  )
}

export default App
