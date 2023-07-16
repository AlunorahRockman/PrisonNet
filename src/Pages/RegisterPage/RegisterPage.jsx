import React, { useState } from 'react'
import "./registerPage.css"
import errorIcon from "../../Outils/icon/error.ico"
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'

function RegisterPage() {

    const [values, setValues] = useState({
        nom: "",
        prenom: "",
        email: "",
        motdepasse: "",
        adresse: "",
        dateNaissance: "",
        phone: "",
        sexe: "",
        image: "user.jpg",
        typeCompte: "Visiteur",
        estValide: "false",
        estBloque: "false"
    })

    const [errors, setErrors] = useState([])

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/createOneUser', values)
        .then(res => {
            console.log(res.data.id)
            let id = res.data.id
            axios.get(`http://localhost:5000/createCode/${res.data.id}`)
            .then(res => {
                console.log(res.data.code)
                navigate(`/validationPage/${id}`)
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
        <div className='corpRegister'>
            <div className="coucheRegister">
                <div className="gaucheRegister">
                    <div className="coucheGauche">
                        <div className="titreRegister">
                            <p>Créer un compte</p>
                        </div>
                        <hr className='hr' />
                        <Link to={'/login'}>
                            <div className="verConnexion">
                                <p>Se connecter</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="droitRegister">
                    <div className="coucheDroit">
                        <form onSubmit={handleSubmit}>
                            <div className="inputRegister">
                                <label htmlFor="nom">Nom</label>
                                <input className='inputInterne' type="text" onChange={e => setValues({...values, nom: e.target.value})} id='nom' placeholder='...' />
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="prenom">Prénom</label>
                                <input className='inputInterne' type="text" onChange={e => setValues({...values, prenom: e.target.value})} id='prenom' placeholder='...' />
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="email">Email</label>
                                <input className='inputInterne' id='email' onChange={e => setValues({...values, email: e.target.value})} placeholder='example@gmail.com'/>
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="motdepasse">Mot de passe</label>
                                <div className="password-input">
                                    <div className="password-toggle" onClick={handlePasswordToggle}>
                                        {showPassword ? <FaEye/> : <FaEyeSlash/>}
                                    </div>
                                    <input
                                        className='inputInterneMotdepasse'
                                        type={showPassword ? 'text' : 'password'}
                                        id='motdepasse'
                                        value={values.motdepasse}
                                        onChange={e => setValues({ ...values, motdepasse: e.target.value })}
                                        placeholder='...'
                                    />
                                </div>
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="phone">Numéro de téléphone</label>
                                <input className='inputInterne' type="text" id='phone' onChange={e => setValues({...values, phone: e.target.value})} placeholder='...' />
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="date">Date de naissance</label>
                                <input className='inputInterne' type="date" id='date' onChange={e => setValues({...values, dateNaissance: e.target.value})} placeholder='...' />
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="sexe">Sexe</label>
                                <input className='inputInterne' type="text" onChange={e => setValues({...values, sexe: e.target.value})} id='sexe' placeholder='M / F' />
                            </div>
                            <hr className='hr' />
                            <div className="inputRegister">
                                <label htmlFor="adresse">Adresse</label>
                                <input className='inputInterne' type="text" onChange={e => setValues({...values, adresse: e.target.value})} id='adresse' placeholder='...' />
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
                            <div className="boutonRegister">
                                <button className='buttonReg'>S'inscrir en tant que visiteur</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage