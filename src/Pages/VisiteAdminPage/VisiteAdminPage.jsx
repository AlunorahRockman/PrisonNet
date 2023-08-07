import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import { useAuth } from '../../hooks/useAuth';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import "./visiteAdminPage.css"

function VisiteAdminPage() {

    const {user} = useAuth()
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    // ! ************************

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [visiteIdToUpdate, setVisiteIdToUpdate] = useState(null);

    const accepterVisite = () => {
        if (visiteIdToUpdate) {
            axios.put(`http://localhost:5000/setStatutVisite/${visiteIdToUpdate}`)
                .then(response => {
                    closeModal(); 
                    window.location.reload()
                })
                .catch(error => {
                    console.error(error);
                    closeModal(); 
                });
        }
    };


    // ! ************************

    // ! ************************

    const [modalIsOpenReff, setModalIsOpenReff] = useState(false);

    const openModalReff = () => {
        setModalIsOpenReff(true);
    };

    const closeModalReff = () => {
        setModalIsOpenReff(false);
    };

    const [visiteIdToUpdateReff, setVisiteIdToUpdateReff] = useState(null);

    const accepterVisiteReff = () => {
        if (visiteIdToUpdateReff) {
            axios.put(`http://localhost:5000/setStatutVisiteReff/${visiteIdToUpdateReff}`)
                .then(response => {
                    closeModalReff(); 
                    window.location.reload()
                })
                .catch(error => {
                    console.error(error);
                    closeModalReff(); 
                });
        }
        toast.success(`Mise a jour enregistré!`, {
            position: 'bottom-right',
            autoClose: 5000,
        });
    };

    // ! ************************

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/getAllVisite`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])


    return (
        <div className='corpsPersonnel'>
        <div className="gauchePers">
            <div className="coucheGauche">
                <div className="titreConge">
                    <p>Visites</p>
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
        <div className="droitePers">
            <div className="coucheConge">

                
            {
                data
                .filter(item =>
                    Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchValue.toLowerCase())
                    )
                ).map((item) =>                 
                    <div className="contenueBox">
                        <div className="coucheBox">
                            <div className="topConge">
                                <div className="photoConge">
                                    <img className='image' src={`http://localhost:5000/images/${item.visiteur.user.image}`}/>
                                </div>
                                <div className="textConge">
                                    <p>{item.visiteur.user.nom}</p>
                                    <h1>{item.visiteur.user.adresse}</h1>
                                    <hr className='hr' />
                                    <h1>Date de visite: {item.dateVisite.substring(0, 10)}</h1>
                                    <hr className='hr' />
                                    <h2>Nom de la détenus: <Link to={`/showDetenus/${item.detenu.id}`}>{item.detenu.nom}</Link></h2>
                                    <hr className='hr' />
                                </div>
                            </div>
                            <div className="basConge">
                                {
                                    item.statut === 2 ? (
                                        <div className='coucheBtn'>
                                            {/* <button className='acceptBtn' onClick={() => { setVisiteIdToUpdate(item.id); openModal(); }}>Accépter</button> */}
                                            <p>Refusé</p>
                                        </div>
                                    ) : item.statut === 1 ? (
                                        <div className='coucheBtn'>
                                            <p>Accepté</p>
                                            {/* <button className='reffusBtn' onClick={() => { setVisiteIdToUpdateReff(item.id); openModalReff(); }}>Réffuser</button> */}
                                        </div>
                                    ) : (
                                        <div className='coucheBtn'>
                                            <button className='acceptBtn' onClick={() => { setVisiteIdToUpdate(item.id); openModal(); }}>Accépter</button>
                                            <button className='reffusBtn' onClick={() => { setVisiteIdToUpdateReff(item.id); openModalReff(); }}>Réfuser</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    )
                }

            </div>
        </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Confirmation Modal"
            className="Modal"
            overlayClassName="ModalOverlay" 
            >
            <h3>Confirmation</h3>
            <h2>Êtes-vous sûr de vouloir accépter cette visite ?</h2>
            <hr className="hr" />
            <div className='modalActions'>
                <button onClick={accepterVisite} className="ok">Oui</button>
                <button onClick={closeModal} className="annuler">Non</button>
            </div>
        </Modal>
        <Modal
            isOpen={modalIsOpenReff}
            onRequestClose={closeModalReff}
            contentLabel="Confirmation Modal"
            className="Modal"
            overlayClassName="ModalOverlay" 
            >
            <h3>Confirmation</h3>
            <h2>Êtes-vous sûr de vouloir réffuser cette visite ?</h2>
            <hr className="hr" />
            <div className='modalActions'>
                <button onClick={accepterVisiteReff} className="ok">Oui</button>
                <button onClick={closeModalReff} className="annuler">Non</button>
            </div>
        </Modal>
        <ToastContainer
                theme='dark'
            />
    </div>
    )
}

export default VisiteAdminPage