import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import "./addDetenus.css"

function AddDetenus() {

    const {user} = useAuth()
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nom: "",
        prenom: "",
        adresse: "",
        dateNaissance: "",
        sexe: "",
        nationnalite: "",
        dureePeine: "",
        dateVenue: "",
        raison: "",
        image: "detenus.jpg",
        statut: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createOneDetenus', values)
        .then(res => {
            console.log(res.data);
            navigate('/prisonniersPage');
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        });
    }

    return (
        <div className="containerAddPers">
            {/* <div className="divImageAdd">
                <img src={`http://localhost:5000/images/detenus.jpg`}/>
            </div>
            <div className="inputImageAdd">
                <input id='image' type="file" />
                <label className='labelInput' htmlFor="image">Importer une photo</label>
            </div> */}
            <h1>Ajouter un(e) détenus(es)</h1>
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

                    
                <label htmlFor="sexe">Sexe:</label>
                    <input
                    type="text"
                    id="sexe"
                    name="sexe"
                    onChange={e => setValues({...values, sexe: e.target.value})}
                    placeholder="M/F"
                    /> 


                <label htmlFor="nation">Nationnalité:</label>
                    <input
                    type="text"
                    id="nation"
                    name="nation"
                    onChange={e => setValues({...values, nationnalite: e.target.value})}
                    placeholder="..."
                    />


                <label htmlFor="salaire">Durée de Paine:</label>
                    <input
                    type="number"
                    id="salaire"
                    name="salaire"
                    onChange={e => setValues({...values, dureePeine: e.target.value})}
                    placeholder='...'
                    />


                    
                <label htmlFor="dateNaissance">Date de venue:</label>
                    <input
                    type="date"
                    id="dateNaissance"
                    name="dateNaissance"
                    onChange={e => setValues({...values, dateVenue: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="raison">Raison:</label>
                    <input
                    type="text"
                    id="raison"
                    name="raison"
                    onChange={e => setValues({...values, raison: e.target.value})}
                    placeholder="..."
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
                <p className='p'>Retour à la <Link to={'/prisonniersPage'}>liste des detenus</Link></p>
                <br />
        </form>
        </div>
    )
}

export default AddDetenus