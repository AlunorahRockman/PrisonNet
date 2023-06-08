import errorIcon from "../../Outils/icon/error.ico";
import React, {useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./validationPage.css"

function ValidationPage() {

  const {id} = useParams();

  const [values, setValues] = useState({
    idUser: id,
    code: 0
  })

  const [valuesUser, setValuesUser] = useState({
    idUser: id
  })

  const [errors, setErrors] = useState([])

  const navigte = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    axios.post('http://localhost:5000/verifierCode', values)
    .then(res => {
      axios.put(`http://localhost:5000/validateUser/${id}`)
      .then(res => {
        axios.post('http://localhost:5000/createOneVisiteur', valuesUser)
        .then(res => {
          console.log(res)
          navigte('/')
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        setErrors(err.response.data);
      }
    })
  }

  return (
    <div className='corpValidation'>
      <div className="coucheValidation">
          <h1>Validation à 5 chiffres</h1>
          <form onSubmit={handleSubmit}>
            <div class="input-group">
              <label for="code">Code :</label>
              <input type="text" onChange={e => setValues({...values, code: Number(e.target.value)})} id="code" name="code" maxlength="5"/>
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
            <button type="submit" class="btnValidation">Verifier</button>
          </form>
      </div>
    </div>
  )
}

export default ValidationPage