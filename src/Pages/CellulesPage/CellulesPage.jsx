import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import modifyIcon from "../../Outils/icon/modify.ico";
import deleteIcon from "../../Outils/icon/delete.ico";
import addPersIcon from "../../Outils/icon/addPers.ico";
import entrerIcon from "../../Outils/icon/entrer.ico";
import errorIcon from "../../Outils/icon/error.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import "./cellulesPage.css"

function CellulesPage() {

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [selectedItemId, setSelectedItemId] = useState(null);

    const [numero, setNumero] = useState(null)
    const [capaciteMax, setCapaciteMax] = useState(null)
    const [superficie, setSuperficie] = useState(null)
    const [status, setStatus] = useState(null)

    const [errors, setErrors] = useState([]);

    const handleModalOpen = (itemId) => {
        setSelectedItemId(itemId);
        const dataObject = data.find(item => item.id === itemId);
        setNumero(dataObject.numero)
        setCapaciteMax(dataObject.capaciteMax)
        setSuperficie(dataObject.superficie)
        setStatus(dataObject.statut)
    };

    const handleModalClose = () => {
        setSelectedItemId(null);
    };


    const updateCellule = async () => {
        
        const updatedCell = {
            numero: numero,
            capaciteMax: capaciteMax,
            superficie: superficie,
            statut: status,
        };
    
        await axios.put(`http://localhost:5000/updateCellule/${selectedItemId}`, updatedCell)
        .then(res => {
            console.log(res)
            setSelectedItemId(null);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        updateCellule()
    };



    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/cellules`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])

    // ! suppression
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleDelete = (id) => {
        const dataObject = data.find(item => item.id === id);
        setSelected(dataObject);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:5000/deleteCellule/${selected.id}`)
        .then(response => {
            console.log(response.data);
            window.location.reload();
            setShowConfirmation(false);
        })
        .catch(error => {
            console.error(error);
        });
    };
    // ! suppression




    return (

        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <Link to={"/"}>
                        <div className="contenue">
                            <img className='image' src={retourIcon}/>
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
            </div>
        <div className="droitePrisonniers">
            <div className="basDroite">
                <div className="topTable">
                    <div className="divTitre">
                        <h2>Cellules</h2>
                    </div>
                    <div className="divInputRecherche">
                        <FaSearch className="search-icon" />
                        <input type="text" value={searchValue}
                                onChange={handleSearchChange} placeholder='Rechercher...'/>
                    </div>
                </div>
                <div className="tableCellules">
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Numero</td>
                                <td>Capacité maximal</td>
                                <td>Superficie</td>
                                <td>Statut</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data
                            .filter((item) =>
                                String(item.numero).toLowerCase().includes(searchValue.toLowerCase()) ||
                                String(item.capaciteMax).toLowerCase().includes(searchValue.toLowerCase()) ||
                                String(item.superficie).toLowerCase().includes(searchValue.toLowerCase()) ||
                                (item.statut === 1 ? "Libre" : "Occupé").toLowerCase().includes(searchValue.toLowerCase())
                            ).map((item, index) => 
                                <tr key={index}>
                                    <td><Link to={`/celluleShow/${item.id}`}><button className='detailBtn'><img className='img' src={entrerIcon}/></button></Link></td>
                                    <td>{item.numero}</td>
                                    <td>{item.capaciteMax} Détenus</td>
                                    <td>{item.superficie} m<sup>2</sup></td>
                                    <td>{item.statut === 1 ? "Libre" : "Occupé"}</td>
                                    <td className='action'>
                                        <button onClick={() => handleModalOpen(item.id)}><img className='img' src={modifyIcon}/></button>
                                        <button className='deleteBtn' onClick={() => handleDelete(item.id)}><img className='img' src={deleteIcon}/></button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className='trBtn'>
                        <Link to={'/addCellule'}>
                            <button className='addBtnc'>
                                <div className="icon">
                                    <img src={addPersIcon}/>
                                </div>
                                <div className="text">
                                    <p>Ajouter</p>
                                </div>
                            </button>
                        </Link>  
                    </div>
                </div>
            </div>
        </div>
        
        {selectedItemId && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="divTitle">
                            <p>Modifier une cellule</p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="inputModal">
                                <label>Numéro</label>
                                <input value={numero} onChange={(e) => setNumero(e.target.value)} type="number"/>
                                <label>Capacité maximal</label>
                                <input value={capaciteMax} onChange={(e) => setCapaciteMax(e.target.value)} type="number"/>
                                <label>Superficie</label>
                                <input value={superficie} onChange={(e) => setSuperficie(e.target.value)} type="number"/>
                                <label>Statut:</label>

                                <select value={status === 1 ? "Libre" : "Occupé"} onChange={(e) => setStatus(e.target.value === "Libre" ? 1 : 2)}>
                                    <option value="Libre" defaultValue={status === 1}>Libre</option>
                                    <option value="Occupé" defaultValue={status === 2}>Occupé</option>
                                </select>
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
                                <button type="submit" className="ok">Modifier</button>
                                <button type="button" className="annuler" onClick={handleModalClose}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showConfirmation && selected && (
                <div className="confirmationModal">
                    <div className="modalContent">
                        <h3>Confirmer la suppression</h3>
                        <p>Voulez-vous vraiment supprimer la cellule sélectionné ?</p>
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

export default CellulesPage