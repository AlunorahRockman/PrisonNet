import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import "./addCellule.css"

function AddCellule() {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    
    const [values, setValues] = useState({
        numero: "",
        capaciteMax: "",
        superficie: "",
        statut: 1,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createOneCellule', values)
        .then(res => {
            console.log(res.data);
            navigate('/cellulesPage');
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
            <h1>Ajouter une cellule</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numero">Numéro unique:</label>
                    <input
                    type="text"
                    id="numero"
                    name="numero"
                    onChange={e => setValues({ ...values, numero: e.target.value })}
                    placeholder='...'
                    />
                <label htmlFor="max">Capacité maximal:</label>
                    <input
                    type="text"
                    id="max"
                    name="max"
                    onChange={e => setValues({...values, capaciteMax: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="super">Superficie:</label>
                    <input
                    type="text"
                    id="super"
                    name="super"
                    onChange={e => setValues({...values, superficie: e.target.value})}
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
                <hr className='hr' />
                <p className='p'>Retour à la <Link to={'/cellulesPage'}>liste des cellules</Link></p>
                <br />
        </form>
        </div>
    )
}

export default AddCellule