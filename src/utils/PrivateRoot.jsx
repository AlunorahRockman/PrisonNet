import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import CellulesPage from '../Pages/CellulesPage/CellulesPage'
import HomePage from '../Pages/HomePage/HomePage'
import UseCellulesAdmin from '../Pages/UseCellulesAdmin/UseCellulesAdmin'
import UseCongeAdmin from '../Pages/UseCongeAdmin/UseCongeAdmin'
import UseIncidentPage from '../Pages/UseIncidentPage/UseIncidentPage'
import UsePersonnelAdmin from '../Pages/UsePersonnelAdmin/UsePersonnelAdmin'
import UsePrisonnierPage from '../Pages/UsePrisonnierAdmin/UsePrisonnierPage'
import UseVisiteAdmin from '../Pages/UseVisiteAdmin/UseVisiteAdmin'
import UseVisiteursAdmin from '../Pages/UseVisiteursAdmin/UseVisiteursAdmin'

function PrivateRoot() {

    const {user}=useAuth()

    console.log(user)
    return user? (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/personnelPage' element={<UsePersonnelAdmin/>}/>
            <Route path='/congePage' element={<UseCongeAdmin/>}/>
            <Route path='/prisonniersPage' element={<UsePrisonnierPage/>}/>
            <Route path='/cellulesPage' element={<UseCellulesAdmin/>}/>
            <Route path='/visitePage' element={<UseVisiteAdmin/>}/>
            <Route path='/visiteursPage' element={<UseVisiteursAdmin/>}/>
            <Route path='/incidentPage' element={<UseIncidentPage/>}/>
        </Routes>
    ):<Navigate to={"/login"}/>
}

export default PrivateRoot