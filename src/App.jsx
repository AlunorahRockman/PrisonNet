import React from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import ValidationPage from './Pages/ValidationPage/ValidationPage';
import PassOubliePage from './Pages/PassOubliePage/PassOubliePage';
import VerifierCodePage from './Pages/VerifierCodePage/VerifierCodePage';
import NouvellePassPage from './Pages/NouvellePassPage/NouvellePassPage';
import AuthProvider from './hooks/useAuth';
import PrivateRoot from './utils/PrivateRoot';

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/registerPage' element={<RegisterPage/>}/>
              <Route path='/verifierCode/:id' element={<VerifierCodePage/>}/>
              <Route path='/passOubliePage' element={<PassOubliePage/>}/>
              <Route path='/nouvellePass/:id' element={<NouvellePassPage/>}/>
              <Route path={"/homePage"} element={<PrivateRoot/>}/>
              <Route path='/validationPage/:id' element={<ValidationPage/>}/>
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    </div>

  );
}

export default App;
