import React, {useState} from 'react'
import "./verifierCodePage.css"
import { useParams, Link, useNavigate } from 'react-router-dom'
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';

function VerifierCodePage() {

    const {id} = useParams();

    const [values, setValues] = useState({
        idUser: id,
        code: 0
    })

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/verifierCodeOublie', values)
        .then(res => {
            console.log(res)
            navigate(`/nouvellePass/${id}`)
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
                <h1>Verifier le 5 chiffres</h1>
                <form onSubmit={handleSubmit}>
                    <div class="input-group">
                        <label for="code">Code :</label>
                        <input type="text" id="code" name="code" onChange={e => setValues({...values, code: Number(e.target.value)})} maxlength="5" placeholder='...'/>
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
                    <button type="submit" class="btnValidation">Anvoyer</button>
                </form>
            </div>
        </div>
    )
}

export default VerifierCodePage