import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import retourIcon from "../../Outils/icon/retour.ico";
import addPersIcon from "../../Outils/icon/addPers.ico";
import aina from "../../Outils/icon/aina.png";
import errorIcon from "../../Outils/icon/error.ico";

import "./modifierConge.css"

function ModifierConge() {

    const {idUser} = useParams()
    const navigate = useNavigate()
    const [conge, setConge] = useState({});
    const [updatedConge, setUpdatedConge] = useState({});
    const [errors, setErrors] = useState([]);


    const updateConge = () => {
        axios.put(`http://localhost:5000/updateConge/${idUser}`, updatedConge)
            .then(response => {
                console.log(response.data);
                navigate('/')
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    setErrors(err.response.data);
                }
            });
    };

    useEffect(() => {
        const fetchConge = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getOneConge/${idUser}`);
                const result = response.data;
        
                if (response.status === 200) {
                    setConge(result);
                    setUpdatedConge({
                        date: new Date(result.date).toISOString().split('T')[0],
                        dateFin: new Date(result.dateFin).toISOString().split('T')[0],
                        motif: result.motif
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
            fetchConge();
    }, [idUser]);


    const handleUpdateClick = (e) => {
        e.preventDefault();
        updateConge();
    };

    return (
        <div className="containerAddPers">
        <h1>Modification</h1>
        <form onSubmit={handleUpdateClick}>
            <label htmlFor="numero">Date de début:</label>
                <input
                type="date"
                id="date"
                name="date"
                value={updatedConge.date || ''}
                onChange={(e) => setUpdatedConge({ ...updatedConge, date: e.target.value })} 
                placeholder='...'
                />
            <label htmlFor="max">Date de fin congé:</label>
                <input
                type="date"
                id="dateFin"
                name="dateFin"
                value={updatedConge.dateFin || ''}
                onChange={(e) => setUpdatedConge({ ...updatedConge, dateFin: e.target.value })} 
                placeholder='...'
                />

            <label htmlFor="super">Motif:</label>
                <input
                type="text"
                id="motif"
                name="motif"
                value={updatedConge.motif || ''}
                onChange={(e) => setUpdatedConge({ ...updatedConge, motif: e.target.value })} 
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
            <p className='p'>Retour à la <Link to={'/'}>maison</Link></p>
            <br />
        </form>
    </div>
    )
}

export default ModifierConge