import React, {useState} from 'react'
import "./passOubliePage.css"
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import errorIcon from "../../Outils/icon/error.ico";

function PassOubliePage() {
    const [values, setValues] = useState({
        email: ""
    })

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/verifierEmail', values)
        .then(res => {
            console.log(res)
            let id = res.data.id
            axios.get(`http://localhost:5000/createCodeOublie/${res.data.id}`)
            .then(res => {
                console.log(res.data.code)
                navigate(`/verifierCode/${id}`)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                setErrors(err.response.data)
            }
        })

    }

    return (
        <div className='corpValidation'>
            <div className="coucheValidation">
                <h1>Mot de passe oublié !</h1>
                <form onSubmit={handleSubmit}>
                    <div class="input-groupOublie">
                        <label for="code">Entrer votre andresse email</label>
                        <input onChange={e => setValues({...values, email: e.target.value})} id='email' placeholder='example@gmail.com'/>
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
                    <p className='p'>Vous souvenez-vous de votre mot de passe ? <Link className='a' to={'/'}>Se connecter</Link></p>
                </form>
            </div>
        </div>
    )
}

export default PassOubliePage