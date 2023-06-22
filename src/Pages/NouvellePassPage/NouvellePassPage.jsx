import axios from 'axios';
import React, {useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import errorIcon from "../../Outils/icon/error.ico";
import "./nouvellePassPage.css"

function NouvellePassPage() {

  const {id} = useParams();

  const [values, setValues] = useState({
      userId: id,
      nouveauPass: "",
      confirmPass: ""
  })

  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/modifierMotdepasse', values)
    .then(res => {
      console.log(res)
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
      console.log(err)
      if (err.response.status === 401) {
          setErrors(err.response.data);
      }
    })

  }

  return (
    <div className='corpValidation'>
        <div className="coucheValidationNouvelle">
            <h1>Nouveau mot de passe</h1>
            <form onSubmit={handleSubmit}>
                <div class="input-groupOublie">
                    <label for="nouveau">Entrer le nouveau mot de passe</label>
                    <input type="password" id="nouveau" onChange={e => setValues({...values, nouveauPass: e.target.value})} name="nouveau"/>
                    <label className='labelNouvelle' for="confirm">Veuillez le confirmer</label>
                    <input type="password" onChange={e => setValues({...values, confirmPass: e.target.value})} id="confirm" name="confirm"/>
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