import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import modifierIcon from "../../Outils/icon/modify.ico";
import demandeIcon from "../../Outils/icon/incidentIcon.jpg";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

import "./listeIncidentVisiteur.css"

function ListeIncidentVisiteur() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [idVis, setIdVis] = useState(null)
    const [showMenu, setShowMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const {user} = useAuth()

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchMonDetenus = async () => {
            try {
                const resultat = await axios.get(`http://localhost:5000/getIncidentByOneUser/${user.id}`);
                setData(resultat.data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchMonDetenus();
    }, [user.id]);

        // ! suppression
        const [showConfirmation, setShowConfirmation] = useState(false);
        const [selected, setSelected] = useState(null);
    
        const handleDelete = (id) => {
            const dataObject = data.find(item => item.id === id);
            setSelected(dataObject);
            setShowConfirmation(true);
        };
    
        const confirmDelete = () => {
            axios.delete(`http://localhost:5000/deleteIncident/${selected.id}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            window.location.reload();
            setShowConfirmation(false);
        };

    return (

        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <div className="titreConge">
                        <p>Incidents</p>
                    </div>
                    <div className="rechercherDiv">
                        <input type="text" value={searchValue} onChange={handleSearchChange} placeholder='Rechercher...'/>
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
            <div className="coucheDroiteConge">
                        <div className="coverDroite">
                            <div className="divContenue">

                            {data
                            .filter(item =>
                                Object.values(item).some(value =>
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                                )
                                )
                                .map((item, index) =>
                                <div key = {index} className="contentConge">
                                    <div className="gauche">
                                        <div className="imageC">
                                            <img src={demandeIcon}/>
                                        </div>
                                        <div className="textCongee">
                                            <div className='top'>
                                                <h5><span>Date:</span> {item.date.substring(0, 10)}</h5>
                                            </div>
                                            <div className='motif'>
                                                <h5><span>Description: </span></h5>
                                                <h3>{item.description}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="textCongeM">
                                        <div className="top">
                                            <div>

                                            </div>
                                            {
                                            showMenu && selectedItem && (
                                                <div className="menu-overlay">
                                                    <div className="menu-container">
                                                        <Link to={`/modifyIncident/${item.id}`} className="menu-option">
                                                            <FaEdit className="menu-icon" />
                                                        </Link>
                                                        <div className="menu-option" onClick={() => handleDelete(item.id)}>
                                                            <FaTrash className="menu-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                            <div className="menu" onClick={() => { setShowMenu(!showMenu); setSelectedItem(item); }}>
                                                <p>...</p>
                                            </div>
                                        </div>
                                        <div className="motifI">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>  
                                )
                            }

                            </div>
                        </div>
                    </div>
            </div>
            {showConfirmation && selected && (
                <div className="confirmationModal">
                    <div className="modalContent">
                        <h3>Confirmer la suppression</h3>
                        <p>Voulez-vous vraiment supprimer l'incident sélectionné ?</p>
                        <hr className='hr' />
                        <div className="modalActions">
                            <button className='ok' onClick={confirmDelete}>Supprimer</button>
                            <button className='annuler' onClick={() => setShowConfirmation(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListeIncidentVisiteur