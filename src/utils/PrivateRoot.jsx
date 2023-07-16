import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AddAdmin from '../Pages/AddAdmin/AddAdmin'
import AddCellule from '../Pages/AddCellule/AddCellule'
import AddDetenus from '../Pages/AddDetenus/AddDetenus'
import AddPersonnel from '../Pages/AddPersonnel/AddPersonnel'
import DemandeCongePers from '../Pages/DemandeCongePersonnel/DemandeCongePers'
import HomePage from '../Pages/HomePage/HomePage'
import ModifierConge from '../Pages/ModifieConge/ModifierConge'
import ModifierIncident from '../Pages/ModifierIncident/ModifierIncident'
import ModifierVisite from '../Pages/ModifierVisite/ModifierVisite'
import UseAdminPage from '../Pages/UseAdminPage/UseAdminPage'
import UseAfficherPersonnels from '../Pages/UseAfficherPersonnels/UseAfficherPersonnels'
import UseCellulesAdmin from '../Pages/UseCellulesAdmin/UseCellulesAdmin'
import UseCompte from '../Pages/UseCompte/UseCompte'
import UseCongeAdmin from '../Pages/UseCongeAdmin/UseCongeAdmin'
import UseDetailsDetenus from '../Pages/UseDetailsDetenus/UseDetailsDetenus'
import UserDetenusVisiteur from '../Pages/UseDetenusVisiteur/UserDetenusVisiteur'
import UseIncidentPage from '../Pages/UseIncidentPage/UseIncidentPage'
import UseListeDetenus from '../Pages/UseListeDetenus/UseListeDetenus'
import UseListeIncidentPersonnel from '../Pages/UseListeIncidentPersonnel/UseListeIncidentPersonnel'
import UseListeIncidentVisiteurs from '../Pages/UseListeIncidentVisiteurs/UseListeIncidentVisiteurs'
import UseMessagePage from '../Pages/UseMessagePage/UseMessagePage'
import UseMonDetenusVisiteus from '../Pages/UseMonDetenusVisiteurs/UseMonDetenusVisiteus'
import UsePersonnelAdmin from '../Pages/UsePersonnelAdmin/UsePersonnelAdmin'
import UsePrisonnierPage from '../Pages/UsePrisonnierAdmin/UsePrisonnierPage'
import UseVisiteAdmin from '../Pages/UseVisiteAdmin/UseVisiteAdmin'
import UseVisiteursAdmin from '../Pages/UseVisiteursAdmin/UseVisiteursAdmin'

function PrivateRoot() {

    const {user}=useAuth()

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
            <Route path='/comptePage' element={<UseCompte/>}/>
            <Route path='/adminPage' element={<UseAdminPage/>}/>
            <Route path='/messagePage' element={<UseMessagePage/>}/>
            <Route path='/addPers' element={<AddPersonnel/>}/>
            <Route path='/addDetenus' element={<AddDetenus/>}/>
            <Route path='/addCellule' element={<AddCellule/>}/>
            <Route path='/demandeConge' element={<DemandeCongePers/>}/>
            <Route path='/listeDetenus' element={<UseListeDetenus/>}/>
            <Route path='/listeIncidents' element={<UseListeIncidentPersonnel/>}/>
            <Route path='/listeIncidentsVisiteurs' element={<UseListeIncidentVisiteurs/>}/>
            <Route path='/mesDetenus' element={<UseMonDetenusVisiteus/>}/>
            <Route path='/addAdmin' element={<AddAdmin/>}/>
            <Route path='/tousLesDetenus' element={<UserDetenusVisiteur/>}/>
            <Route path='/modifyIncident/:idUser' element={<ModifierIncident/>}/>
            <Route path='/modifyConge/:idUser' element={<ModifierConge/>}/>
            <Route path='/modifyVisite/:idUser' element={<ModifierVisite/>}/>
            <Route path='/afficherPersonnels/:idUser' element={<UseAfficherPersonnels/>}/>
            <Route path='/detailsDetenus/:id' element={<UseDetailsDetenus/>}/>
        </Routes>
    ):<Navigate to={"/login"}/>
}

export default PrivateRoot