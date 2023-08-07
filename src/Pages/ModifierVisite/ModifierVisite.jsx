import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import retourIcon from "../../Outils/icon/retour.ico";
import addPersIcon from "../../Outils/icon/addPers.ico";
import aina from "../../Outils/icon/aina.png";
import errorIcon from "../../Outils/icon/error.ico";

import "./modifierVisite.css"

function ModifierVisite() {
    const {idUser} = useParams()
    const navigate = useNavigate()
    const [visite, setVisite] = useState({});
    const [updatedVisite, setUpdatedVisite] = useState({});
    const [errors, setErrors] = useState([]);


    const updateVisite = () => {
        axios.put(`http://localhost:5000/updateVisite/${idUser}`, updatedVisite)
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

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);                                                                                           

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const minDate = `${year}-${month}-${day}`;


    useEffect(() => {
        const fetchConge = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getOneVisite/${idUser}`);
                const result = response.data;
        
                if (response.status === 200) {
                    setVisite(result);
                    setUpdatedVisite({
                        dateVisite: new Date(result.dateVisite).toISOString().split('T')[0],
                        description: result.description,
                        heure: result.heure
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
        updateVisite();
    };



    return (
        <div className="containerAddPers">
        <h1>Modification</h1>
        <form onSubmit={handleUpdateClick}>
            <label htmlFor="numero">Date de visite:</label>
                <input
                type="date"
                id="dateFin"
                name="dateFin"
                min={minDate} 
                value={updatedVisite.dateVisite || ''}
                onChange={(e) => setUpdatedVisite({ ...updatedVisite, dateVisite: e.target.value })} 
                placeholder='...'
                />
            <label htmlFor="super">Description:</label>
                <input
                type="text"
                id="desc"
                name="desc"
                value={updatedVisite.description || ''}
                onChange={(e) => setUpdatedVisite({ ...updatedVisite, description: e.target.value })} 
                placeholder='...'
                />

            <label htmlFor="super">Heure de visite:</label>
                <input
                type="time"
                id="heure"
                name="heure"
                value={updatedVisite.heure || ''}
                onChange={(e) => setUpdatedVisite({ ...updatedVisite, heure: e.target.value })} 
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

export default ModifierVisite