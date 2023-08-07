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
    const [idVis, setIdVis] = useState(null);
    const navigate = useNavigate();

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);                                                                                           

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const minDate = `${year}-${month}-${day}`;

    const {user} = useAuth()

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const fetchData = async () => {
        try {
            const resultat = await axios.get(`http://localhost:5000/getIdVisiteur/${user.id}`);
            const idVisiteur = resultat.data;
            setIdVis(idVisiteur);

            setValues({
                ...values,
                visiteurId: idVisiteur
            });
        } catch (error) {
            console.error(error);
        }
    };

    console.log(idVis)
    
    useEffect(() => {
        fetchData();
    }, [user.id]);
    
    useEffect(() => {
        const fetchMonDetenus = async () => {
            try {
                if (idVis) {
                    const resultat = await axios.get(`http://localhost:5000/getMonDetenus/${idVis}`);
                    setData(resultat.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchMonDetenus();
    }, [idVis]);

    console.log(data)
    

    const handleModalOpen = (itemId) => {
        setSelectedItemId(itemId);
        setValues({
            ...values,
            detenuId: itemId
        });
        console.log(itemId);
    };


    const [values, setValues] = useState({
        visiteurId: null,
        detenuId: null,
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
                            Object.values(item.detenu).some(value => 
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                        )
                        .map((item) =>                 
                            <div className="contenuePrisonnier">
                                <div className="imagePrisonnier">
                                    <img src={`http://localhost:5000/images/${item.detenu.image}`}/>
                                </div>
                                <div className="titrePrisonnier">
                                    <div className="divHorizontal">
                                        <p>{item.detenu.nom}</p>
                                        <h5>{item.detenu.dateVenue.substring(0, 10)}</h5>
                                    </div>
                                    <hr className='hr' />
                                    <h6>{item.detenu.adresse}</h6>
                                </div>
                                <div className="buttonPrisonnier">
                                    <button className='buttonIray' onClick={() => handleModalOpen(item.detenu.id)}>Visiter</button>
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
                                <input className='input' type="date" id="date" min={minDate} onChange={e => setValues({ ...values, dateVisite: e.target.value })} />;
                                <label className='label'>Description:</label>
                                <input className='input' type="text" placeholder='...' id="description" onChange={e => setValues({ ...values, description: e.target.value })} />
                                <br />
                                <label className='label'>Heure de visite:</label>
                                <input className='input' type="time" id="heure" onChange={e => setValues({ ...values, heure: e.target.value })} />;
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