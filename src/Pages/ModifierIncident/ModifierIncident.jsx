import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import retourIcon from "../../Outils/icon/retour.ico";
import addPersIcon from "../../Outils/icon/addPers.ico";
import aina from "../../Outils/icon/aina.png";
import errorIcon from "../../Outils/icon/error.ico";

import "./modifierIncident.css"

function ModifierIncident() {
        const {idUser} = useParams()
        const navigate = useNavigate()
        const [incident, setIncident] = useState({});
        const [updatedIncident, setUpdatedIncident] = useState({});
        const [errors, setErrors] = useState([]);

        const updateIncident = () => {
            axios.put(`http://localhost:5000/updateIncident/${idUser}`, updatedIncident)
                .then(response => {
                    console.log(response.data);
                    navigate('/listeIncidents')
                })
                .catch(err => {
                    console.error(err);
                    if (err.response && err.response.status === 401) {
                        setErrors(err.response.data);
                    }
                });
        };
    
        useEffect(() => {
            const fetchIncident = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/getOneIncident/${idUser}`);
                    const result = response.data;
            
                    if (response.status === 200) {
                        setIncident(result);
                        setUpdatedIncident({
                            description: result.description,
                            date: new Date(result.date).toISOString().split('T')[0] // Formatage de la date au format "YYYY-MM-DD"
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            };
                fetchIncident();
        }, [idUser]);
    
        
        const handleUpdateClick = (e) => {
            e.preventDefault();
            updateIncident();
        };


    return (
        <div className="containerAddPers">
            <h1>Modification</h1>
                <form onSubmit={handleUpdateClick}>
                    <label>Description:</label>
                    <input type="text"   value={updatedIncident.description || ''}
                        onChange={(e) => setUpdatedIncident({ ...updatedIncident, description: e.target.value })}  placeholder='...' id="description"/>
                    <label>Date:</label>
                    <input type="date" value={updatedIncident.date || ''}
                        onChange={(e) => setUpdatedIncident({ ...updatedIncident, date: e.target.value })}  id="date"/>

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
                    <p className='p'>Retour à la <Link to={'/listeIncidents'}>liste de vos incidents</Link></p>
                    <br />
            </form>
        </div>
    )
}

export default ModifierIncident