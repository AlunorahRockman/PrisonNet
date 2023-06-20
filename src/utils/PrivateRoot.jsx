import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HomePage from '../Pages/HomePage/HomePage'

function PrivateRoot() {

    const {user}=useAuth()

    console.log(user)
  return user? (
    <Routes>
        <Route path="/">
            <Route path={""} element={<HomePage/>}/>
        </Route>
    </Routes>
  ):<Navigate to={"/"}/>
}

export default PrivateRoot