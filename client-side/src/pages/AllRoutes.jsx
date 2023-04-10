import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import MyPosts from './MyPosts'
import Profile from './Profile'
import Analytics from './Analytics'
import PostsList from '../components/PostsList'
import UserList from '../components/UserList'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="myPosts" element={<MyPosts/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="analytics" element={<Analytics/>}>
            <Route index element={<UserList/>}></Route>
            <Route path="posts" element={<PostsList/>}></Route>
        </Route>
    </Routes>
  )
}

export default AllRoutes