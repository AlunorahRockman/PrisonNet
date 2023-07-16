import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

import "./addAdmin.css"

function AddAdmin() {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const [showPassword, setShowPassword] = useState(false);

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
        typeCompte: "Admin",
        estValide: "true",
        estBloque: "true"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createOneUser', values)
        .then(res => {
            console.log(res.data);
            navigate('/adminPage');
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        });
    };

    return (
<div className="containerAddPers">
            <h1>Administrateur</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="nom">Nom:</label>
                    <input
                    type="text"
                    id="nom"
                    name="nom"
                    onChange={e => setValues({ ...values, nom: e.target.value })}
                    placeholder='...'
                    />
                <label htmlFor="prenom">Prénom:</label>
                    <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    onChange={e => setValues({...values, prenom: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="email">Email:</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={e => setValues({...values, email: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="motDePasse">Mot de passe:</label>
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

                <label htmlFor="adresse">Adresse:</label>
                    <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    onChange={e => setValues({...values, adresse: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="dateNaissance">Date de naissance:</label>
                    <input
                    type="date"
                    id="dateNaissance"
                    name="dateNaissance"
                    onChange={e => setValues({...values, dateNaissance: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="phone">Téléphone:</label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={e => setValues({...values, phone: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="sexe">Sexe:</label>
                    <input
                    type="text"
                    id="sexe"
                    name="sexe"
                    onChange={e => setValues({...values, sexe: e.target.value})}
                    placeholder="M/F"
                    /> 
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
                <hr className='hr' />
                <button type="submit" className="submit-button">Enregistrer</button>
                <hr className='hr' />
                <p className='p'>Retour à la <Link to={'/adminPage'}>liste des administrateurs</Link></p>
                <br />
        </form>
        </div>
    )
}

export default AddAdmin