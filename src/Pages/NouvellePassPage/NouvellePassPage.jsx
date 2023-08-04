import axios from 'axios';
import React, {useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import errorIcon from "../../Outils/icon/error.ico";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./nouvellePassPage.css"

function NouvellePassPage() {

  const {id} = useParams()

  const [values, setValues] = useState({
      userId: id,
      nouveauPass: "",
      confirmPass: ""
  })

  const [errors, setErrors] = useState('')
  
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
  };

  const [showPassword1, setShowPassword1] = useState(false);

  const handlePasswordToggle1 = () => {
      setShowPassword1(!showPassword1);
  };

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/modifierMotdepasse', values)
    .then(res => {
      console.log(res)
      navigate('/login')
    })
    .catch(err => {
      if (err.response.status === 401) {
          setErrors(err.response.data.message);
      }
    })

  }

  return (
    <div className='corpValidation'>
        <div className="coucheValidationNouvelle">
            <h1>Nouveau mot de passe</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div class="input-groupOublie">
                  <label for="nouveau">Entrer le nouveau mot de passe</label>
                  <div className="divInput">
                    <input type={showPassword ? 'text' : 'password'} id="nouveau" onChange={e => setValues({...values, nouveauPass: e.target.value})} name="nouveau"/>
                    <div className="password-toggle" onClick={handlePasswordToggle}>
                      {showPassword ? <FaEye/> : <FaEyeSlash/>}
                    </div>
                  </div>
                  <label className='labelNouvelle' for="confirm">Veuillez le confirmer</label>
                  <div className="divInput">
                    <input type={showPassword1 ? 'text' : 'password'} onChange={e => setValues({...values, confirmPass: e.target.value})} id="confirm" name="confirm"/>
                    <div className="password-toggle" onClick={handlePasswordToggle1}>
                      {showPassword1 ? <FaEye/> : <FaEyeSlash/>}
                    </div>
                  </div>
                </div>
                <hr className='hr'/>
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
                <button type="submit" class="btnValidation">Enregistrer</button>
            </form>
        </div>
    </div>
  )
}

export default NouvellePassPage