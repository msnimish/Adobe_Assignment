import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate} from "react-router-dom";


const PrivateRoutes = () => {
    let isAdmin = localStorage.getItem('adobe-isAdmin');
    return (
        isAdmin === true ? <Outlet/> : <Navigate to="/"></Navigate>
    )
}

export default PrivateRoutes