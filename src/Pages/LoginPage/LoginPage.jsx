import React, { useState } from 'react';
import "./loginPage.css";
import emailIcon from "../../Outils/icon/email.ico";
import passwdIcon from "../../Outils/icon/passwd.ico";
import errorIcon from "../../Outils/icon/error.ico";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage() {

const [values, setValues] = useState({
    email: "",
    motdepasse: ""
})

const [errors, setErrors] = useState([])

const navigte = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://localhost:5000/loginUser', values)
  .then(res => {
      console.log(res.data)
      navigte('/homePage')
  })
  .catch(err => {
      console.log(err)
      if (err.response.status === 401) {
          setErrors(err.response.data);
      }
  })
}

  return (
    <div className='corp'>
      <div className="couche">
        <div className="presentation">
          <h1>PrisonNet</h1>
          <p>Avec PrisonNet, vous pouvez rester en contact avec votre prisonnier.</p>
        </div>
        <div className="form">
          <div className="cover">
            <div className="bienvenue">
              <p>Bienvenue</p>
            </div>
            <hr className='hr' />
            <form onSubmit={handleSubmit}>
              <div className="input">
                <div className="email">
                  <div className="icon">
                    <img src={emailIcon} alt="email" />
                  </div>
                  <div className="text">
                    <input className='inpute' type="email" onChange={e => setValues({...values, email: e.target.value})} placeholder='example@gmail.com' />
                  </div>
                </div>
                <div className="email">
                  <div className="icon">
                    <img src={passwdIcon} alt="password" />
                  </div>
                  <div className="text">
                    <input className='inpute' type="password" onChange={e => setValues({...values, motdepasse: e.target.value})} placeholder='mot de passe...' />
                  </div>
                </div>
              </div>
              <hr className='hr' />
              {
                errors && errors.length > 0 && (
                  <div className="errors">
                    <div className="errorIcon">
                      <img src={errorIcon} alt="erreur" />
                    </div>
                    <div className="errorText">
                      <p>{errors}</p>
                    </div>
                  </div>
                )
              }

              <div className="bouton">
                <button className='button'>Se connecter</button>
              </div>
            </form>
            <div className="oublie">
              <p>Mot de passe oublié !</p>
            </div>
            <hr className='hr' />
            <div className="bouton1">
              <Link to={'/registerPage'}>
                <button className='button1'>Créer un compte</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
