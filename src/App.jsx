import React from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import ValidationPage from './Pages/ValidationPage/ValidationPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/registerPage' element={<RegisterPage/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path='/validationPage/:id' element={<ValidationPage/>}/>
          {/* <Route path='/edit/:id' element={<Update/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
