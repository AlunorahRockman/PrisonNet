import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar'
import { useAuth } from '../../hooks/useAuth';

import "./celluleShow.css"

function CelluleShow() {

    const {id} = useParams()

    const navigate = useNavigate()

    const {user} = useAuth()
    const [data, setData] = useState([])
    const [detenus, setDetenus] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchValueDetenus, setSearchValueDetenus] = useState('');
    const [selectedItemIdAjouter, setSelectedItemIdAjouter] = useState(null);


    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        let resultat = await axios.get(`http://localhost:5000/detenus`);
            resultat = await resultat.data;
            setData(resultat);
        };
        fetchData();
    }, []);

    const handleModalOpenAjouter = (itemId) => {
        setSelectedItemIdAjouter(itemId);
        setValuesAjouter({
            ...valuesAjouter,
            detenuId: itemId
        });
    };

    const handleDelete = (id) => {
        const dataObject = detenus.find(item => item.id === id);
        setSelected(dataObject);
        setShowConfirmation(true);
    };

    
    const handleModalCloseAjouter = () => {
        setSelectedItemIdAjouter(null);
    };

    const [valuesAjouter, setValuesAjouter] = useState({
        celluleId: id,
        detenuId: null,
    });

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchChangeDetenus = (event) => {
        setSearchValueDetenus(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/createOneCelluleDetenus', valuesAjouter)
        .then(res => {
            console.log(res.data);
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
        let resultat = await axios.get(`http://localhost:5000/getDetenusByOneCellule/${id}`);
            resultat = await resultat.data;
            setDetenus(resultat);
        };
        fetchData();
    }, []);

    const confirmDelete = () => {
        axios.delete(`http://localhost:5000/deleteDetenusCellule/${selected.id}`)
        .then(response => {
            console.log(response.data);
            window.location.reload();
            setShowConfirmation(false);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div>
            <NavBar/>
            <div className="containerShow">
                <div className="coucheShow">
                    <div className="gaucheShow">
                        <div className="titreShow">
                            <p>Les détenus de cette cellule</p>
                        </div>
                        <div className="inputSearch">
                            <input type="text" value={searchValueDetenus}
                        onChange={handleSearchChangeDetenus} placeholder='Rechercher ici...'/>
                        </div>
                        <hr className="hr" />


                        {
                            detenus
                            .filter(item =>
                                Object.values(item.detenu).some(value =>
                                String(value).toLowerCase().includes(searchValueDetenus.toLowerCase())
                                )
                            )
                            .map((item, index) =>

                                <div key={index} className="divContenueShow">
                                    <div className="imageSho">
                                        <img src={`http://localhost:5000/images/${item.detenu.image}`}/>
                                    </div>
                                    <div className="divText">
                                        <div className="divMenu">
                                        {
                                            showMenu && selectedItem && (
                                                <div className="menu-container" onClick={() => handleDelete(item.id)}>
                                                    <FaTrash className="menu-i" />
                                                </div>
                                            )
                                        }
                                            <div className="Menu" onClick={() => { setShowMenu(!showMenu); setSelectedItem(item); }}>
                                                <p>...</p>
                                            </div>
                                        </div>
                                        <div className="detail">
                                            <p>{item.detenu.nom}</p>
                                            <h4>{item.detenu.adresse}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className="divRetour">
                            <p>Retous à la liste des <Link to={'/cellulesPage'}>cellules</Link></p>
                        </div>


                    </div>
                    <div className="droitShow">
                        <div className="titreNouveau">
                            <div className="iray">
                                <p>Ajouter un nouveau détenu dans cette cellule</p>
                            </div>
                            <div className="inputRechercher">
                                <input type="text" value={searchValue}
                        onChange={handleSearchChange} placeholder='Rechercher ici...'/>
                            </div>
                        </div>
                        <hr className="hr" />
                        <div className="divContenueDroite">


                        {data
                        .filter(item =>
                            Object.values(item).some(value =>
                            String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                        )
                        .map((item, index) =>
                            <div key={index} className="contenuePrisonnier">
                                <div className="imagePrisonnier">
                                    <img src={`http://localhost:5000/images/${item.image}`}/>
                                </div>
                                <div className="titrePrisonnier">
                                    <div className="divHorizontal">
                                        <p>{item.nom}</p>
                                        <h5>{item.dateFin}</h5>
                                    </div>
                                    <hr className='hr' />
                                    <h6>{item.adresse}</h6>
                                </div>
                                <div className="buttonPrisonnier">
                                    <button className='buttonIray' onClick={() => handleModalOpenAjouter(item.id)}>Ajouter</button>
                                </div>
                            </div>

                        )
                    }

                        </div>
                    </div>
                </div>
            </div>
            {selectedItemIdAjouter && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="divTitle">
                            <p>Confirmation</p>
                        </div>
                        <br />
                        <hr className='hr'/>
                        <div className='divConfirmation'>
                            <p>Vous voullez vraiement ajouter cette détenus dans ce cellule?</p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <hr className='hr' />
                            <div className="modal-buttons">
                                <button type="submit" className="ok">OK</button>
                                <button type="button" className="annuler" onClick={handleModalCloseAjouter}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showConfirmation && selected && (
                <div className="confirmationModal">
                    <div className="modalContent">
                        <h3>Confirmer la sortir</h3>
                        <p>Voulez-vous vraiment sortir cette détenu de ce cellule?</p>
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

export default CelluleShow