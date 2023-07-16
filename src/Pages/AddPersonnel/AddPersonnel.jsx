import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./addPersonnel.css";

const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
    month = `0${month}`;
    }
        let day = date.getDate();
        if (day < 10) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
};

function AddPersonnel() {
    const navigate = useNavigate();

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
        typeCompte: "Personnel",
        estValide: "true",
        estBloque: "true"
    });

    const [valuesPersonnels, setValuesPersonnels] = useState({
        idUser: "",
        departement: "",
        poste: "",
        salaire: "",
        dateEmbauche: "",
        statut: 0
    });

    const [errors, setErrors] = useState([]);
    const [errors1, setErrors1] = useState([]);
    const [showPassword, setShowPassword] = useState(false);


    const [currentStep, setCurrentStep] = useState(1);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmitStep1 = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post('http://localhost:5000/createOneUser', values)
        .then(res => {
            let id = res.data.id;
            setValuesPersonnels(prevState => ({
                ...prevState,
                idUser: id
                }));
            
                const today = new Date();
                const formattedDate = formatDate(today);
                setValuesPersonnels(prevState => ({
                ...prevState,
                dateEmbauche: formattedDate
                }));
            
                setValuesPersonnels(prevState => {
                    console.log(prevState);
                    return prevState;
                });

                setCurrentStep(2);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors1(err.response.data);
            }
        });
    };

    const handleSubmitStep2 = (e) => {
        e.preventDefault();
        console.log(valuesPersonnels);
        axios.post('http://localhost:5000/createOnePersonnel', valuesPersonnels)
        .then(res => {
            console.log(res.data);
            navigate('/personnelPage');
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        });
    };


    const renderStep1Form = () => {
        return (
        <form onSubmit={handleSubmitStep1}>
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
                    errors1 && errors1.length > 0 && (
                        <div className="errors">
                            <div className="errorIcon">
                                <img src={errorIcon} alt="erreur" />
                            </div>
                            <div className="errorText">
                                <p>{errors1}</p>
                            </div>
                        </div>
                    )
                }
                <hr className='hr' />
                <button type="submit" className="submit-button">Valider</button>
                <hr className='hr' />
                <p className='p'>Retour à la <Link to={'/personnelPage'}>liste des personnels</Link></p>
                <br />
        </form>
        );
    };


    const renderStep2Form = () => {
        return (
            <form onSubmit={handleSubmitStep2}>
                <label htmlFor="departement">Département:</label>
                    <input
                    type="text"
                    id="departement"
                    name="departement"
                    onChange={e => setValuesPersonnels({ ...valuesPersonnels, departement: e.target.value })}
                    placeholder='...'
                    />

                <label htmlFor="poste">Poste:</label>
                    <input
                    type="text"
                    id="poste"
                    name="poste"
                    onChange={e => setValuesPersonnels({...valuesPersonnels, poste: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="salaire">Salaire:</label>
                    <input
                    type="number"
                    id="salaire"
                    name="salaire"
                    onChange={e => setValuesPersonnels({...valuesPersonnels, salaire: e.target.value})}
                    placeholder='...'
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
            </form>
        );
    };

    return (
        <div className="containerAddPers">
        <h1>Formulaire professionnel</h1>
            {currentStep === 1 && renderStep1Form()}
            {currentStep === 2 && renderStep2Form()}
        </div>
    );
}

export default AddPersonnel;
