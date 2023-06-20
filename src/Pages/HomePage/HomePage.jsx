import React from 'react'
import CellulesPage from '../CellulesPage/CellulesPage'
import CongeAdminPage from '../CongeAdminPage/CongeAdminPage'
import CorpHome from '../CorpHome/CorpHome'
import NavBar from '../NavBar/NavBar'
import PersonnelsAdminPage from '../PersonnelsAdminPage/PersonnelsAdminPage'
import PrisonniersPage from '../PrisonniersPage/PrisonniersPage'

function HomePage() {
  return (
    <div>
      <NavBar/>
      <CellulesPage/>
      {/* <PrisonniersPage/> */}
      {/* <CongeAdminPage/> */}
      {/* <PersonnelsAdminPage/> */}
      {/* <CorpHome/> */}
    </div>
  )
}

export default HomePage