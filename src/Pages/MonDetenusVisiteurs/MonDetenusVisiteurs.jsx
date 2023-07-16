import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import addPersIcon from "../../Outils/icon/plus.ico";
import { useAuth } from '../../hooks/useAuth';
import errorIcon from "../../Outils/icon/error.ico";

import "./monDetenusVisiteurs.css"

function MonDetenusVisiteurs() {
    
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const {user} = useAuth()

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleModalOpen = (itemId) => {
        setSelectedItemId(itemId);
        setValues({
            ...values,
            idDetenus: itemId
        });
        console.log(itemId);
    };


    const [values, setValues] = useState({
        idVisiteur: user.id,
        idDetenus: null,
        description: "",
        dateVisite: "",
        heure: "",
        statut: 0
    });

    
    const handleModalClose = () => {
        setSelectedItemId(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/createOneVisite', values)
        .then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        });
    };

    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/detenus`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])
    
    return (
        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <div className="titreConge">
                        <p>Mes détenus</p>
                    </div>
                    <div className="rechercherDiv">
                        <input type="text"  value={searchValue} onChange={handleSearchChange}  placeholder='Rechercher...'/>
                    </div>
                    <Link to={"/"}>
                        <div className="contenue">
                            <img className='image' src={retourIcon}/>
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="droitePrisonniers">
                <div className="coucheConge">
                    {
                        data
                        .filter(item =>
                            Object.values(item).some(value =>
                            String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                        ).map((item) =>                 
                            <div className="contenuePrisonnier">
                                <div className="imagePrisonnier">
                                    <img src={`http://localhost:5000/images/${item.image}`}/>
                                </div>
                                <div className="titrePrisonnier">
                                    <p>{item.nom}</p>
                                    <h5>{item.dateVenue.substring(0, 10)}</h5>
                                    <hr className='hr' />
                                    <h6>{item.adresse}</h6>
                                </div>
                                <div className="buttonPrisonnier">
                                    <button className='buttonIray' onClick={() => handleModalOpen(item.id)}>Visiter</button>
                                </div>
                            </div>
                    )
                    }

                </div>
            </div>
            {selectedItemId && (
                <div className="modal">
                    <div className="modal-contentt">
                        <div className="divTitle">
                            <p>Demande une visite</p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="inputModal">
                                <label className='label'>Date de visite:</label>
                                <input className='input' type="date" id="date" onChange={e => setValues({ ...values, dateVisite: e.target.value })} />;
                                <label className='label'>Description:</label>
                                <input className='input' type="text" placeholder='...' id="description" onChange={e => setValues({ ...values, description: e.target.value })} />
                                <br />
                                <label className='label'>Heure de visite:</label>
                                <input className='input' type="hore" id="date" onChange={e => setValues({ ...values, heure: e.target.value })} />; 
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
        </div>
    )
}

export default MonDetenusVisiteurs