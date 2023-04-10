import { useState } from 'react'
import axios from 'axios';
import { backend_url } from './main.jsx';
import Navbar from './components/Navbar.jsx';
import AllRoutes from './pages/AllRoutes.jsx';
// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const [text, setText] = useState("No Message");

  const fetchData = async() =>{ 
    let res = await axios.get(`${backend_url}`);
    console.log(res.url);
    setText(res.data);
  }

  let getData = async()=>{
    await fetchData();
  }

  return (
    <>
      {/* <Navbar/> */}
      <AllRoutes/>
    </>
  )
}

export default App
