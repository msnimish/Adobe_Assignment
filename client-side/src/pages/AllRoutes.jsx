import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import MyPosts from './MyPosts'
import Profile from './Profile'
import Analytics from './Analytics'
import PostsList from '../components/PostsList'
import UserList from '../components/UserList'
import PrivateRoutes from './PrivateRoutes'

const AllRoutes = () => {
  return (
    <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path="analytics/users" element={<UserList/>}>
            </Route>
            <Route path="analytics/posts" element={<PostsList/>}>
            </Route>
        </Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="myPosts" element={<MyPosts/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="/" element={<Login/>}></Route>
    </Routes>
  )
}

export default AllRoutes