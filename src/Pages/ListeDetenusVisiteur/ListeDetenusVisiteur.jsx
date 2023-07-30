import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import retourIcon from "../../Outils/icon/retour.ico";
import errorIcon from "../../Outils/icon/error.ico";
import { useAuth } from '../../hooks/useAuth';
import { FaSearch } from 'react-icons/fa';

import "./listeDetenusVisiteur.css"

function ListeDetenusVisiteur() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemIdPrendre, setSelectedItemIdPrendre] = useState(null);
    const [errors, setErrors] = useState([]);
    const [idVis, setIdVis] = useState(null);
    const navigate = useNavigate();
    
    const {user} = useAuth()

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    useEffect(() => {
        const fetchdata = async () => {
            let resultat = await axios.get(`http://localhost:5000/getIdVisiteur/${user.id}`);
            resultat = await resultat.data;
            setIdVis(resultat); 
            setValuesPrendre({ ...valuesPrendre, visiteurId: resultat });
        };
        fetchdata();
    }, [user.id]);


    const handleModalOpen = (itemId) => {
        setSelectedItemId(itemId);
        setValues({
            ...values,
            detenuId: itemId
        });
        console.log(itemId);
    };


    const handleModalOpenPrendre = (itemId) => {
        setSelectedItemIdPrendre(itemId);
        setValuesPrendre({
            ...valuesPrendre,
            detenuId: itemId
        });
    };

    const [valuesPrendre, setValuesPrendre] = useState({
        visiteurId: idVis,
        detenuId: null,
    });


    const [values, setValues] = useState({
        detenuId: null,
        userId: user.id,
        description: "",
        date: "",
        statut: 1
    });


    const handleModalClose = () => {
        setSelectedItemId(null);
    };

    const handleModalClosePrendre = () => {
        setSelectedItemIdPrendre(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/createOneIncident', values)
        .then(res => {
            console.log(res.data);
            navigate('/listeIncidents');
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        });
    };

    const handleFormSubmitPrendre = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/createOneVisiteurDetenus', valuesPrendre)
        .then(res => {
            console.log(res.data);
            navigate('/mesDetenus');
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
        let resultat = await axios.get(`http://localhost:5000/detenus`);
        resultat = await resultat.data;
        setData(resultat);
        };
        fetchData();
    }, []);

    return (
        <div className='corpsPersonnel'>
            <div className="gauchePers">
                <div className="coucheGauche">
                <Link to={"/"}>
                    <div className="contenue">
                    <img className='image' src={retourIcon} alt="Retour" />
                    <p>Retour</p>
                    </div>
                </Link>
                </div>
            </div>
            <div className="droitePers">
                <div className="basDroite">
                <div className="topTable">
                    <div className="divTitre">
                    <h2>Détenus</h2>
                    </div>
                    <div className="divInputRecherche">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder='Rechercher...'
                    />
                    </div>
                </div>
                <div className="tablePers">
                    <table>
                    <thead>
                        <tr>
                        <td>Photo</td>
                        <td>Nom</td>
                        <td>Prénom</td>
                        <td>Adresse</td>
                        <td>Date de naissance</td>
                        <td>Sexe</td>
                        <td>Nationalité</td>
                        <td>Durée</td>
                        <td>Venue</td>
                        <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                        .filter(item =>
                            Object.values(item).some(value =>
                            String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                        )
                        .map((item, index) =>
                            <tr key={index}>
                            <td><img className='image' src={`http://localhost:5000/images/${item.image}`}/></td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.adresse}</td>
                            <td className='datetd'>{item.dateNaissance.substring(0, 10)}</td>
                            <td>{item.sexe}</td>
                            <td>{item.nationnalite}</td>
                            <td>{item.dureePeine} <span>ans</span></td>
                            <td>{item.dateVenue.substring(0, 10)}</td>
                            <td className='tdButton'>
                                <button className='btnKely' onClick={() => handleModalOpenPrendre(item.id)}>Prendre</button>
                                <button className='btnKely' onClick={() => handleModalOpen(item.id)}>Soisir</button>
                            </td>
                            </tr>
                        )
                        }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>

            {selectedItemId && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="divTitle">
                            <p>Envoyer une incident</p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="inputModal">
                                <label>Description:</label>
                                <input type="text" placeholder='...' id="description" onChange={e => setValues({ ...values, description: e.target.value })} />
                                <label>Date:</label>
                                <input type="date" id="date" onChange={e => setValues({ ...values, date: e.target.value })} />
                            </div>
                            <br />
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
                            <div className="modal-buttons">
                                <button type="submit" className="ok">Envoyer</button>
                                <button type="button" className="annuler" onClick={handleModalClose}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedItemIdPrendre && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="divTitle">
                            <p>Confirmation</p>
                        </div>
                        <br />
                        <hr className='hr'/>
                        <div className='divConfirmation'>
                            <p>Vous voullez vraiement prendre cette détenus pour vous?</p>
                        </div>
                        <form onSubmit={handleFormSubmitPrendre}>
                            <hr className='hr' />
                            <div className="modal-buttons">
                                <button type="submit" className="ok">OK</button>
                                <button type="button" className="annuler" onClick={handleModalClosePrendre}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListeDetenusVisiteur