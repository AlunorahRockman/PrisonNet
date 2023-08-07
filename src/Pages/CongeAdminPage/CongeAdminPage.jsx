import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import "./congeAdminPage.css"
import { useAuth } from '../../hooks/useAuth';
import Modal from 'react-modal'; 

function CongeAdminPage() {

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

    const [congeIdToUpdate, setCongeIdToUpdate] = useState(null);

    const accepterConge = () => {
        if (congeIdToUpdate) {
            axios.put(`http://localhost:5000/setStatutConge/${congeIdToUpdate}`)
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

    const [congeIdToUpdateReff, setCongeIdToUpdateReff] = useState(null);

    const accepterCongeReff = () => {
        if (congeIdToUpdateReff) {
            axios.put(`http://localhost:5000/setStatutCongeReff/${congeIdToUpdateReff}`)
                .then(response => {
                    closeModalReff(); 
                    window.location.reload()
                })
                .catch(error => {
                    console.error(error);
                    closeModalReff(); 
                });
        }
    };


    // ! ************************


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/getAllConge`)
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
                        <p>Congés</p>
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
                            .filter((item) =>
                                Object.values(item).some((value) =>
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                            ) ||
                                Object.values(item.personnel).some((value) =>
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                            ) ||
                                Object.values(item.personnel.user).some((value) =>
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                        ).map((item) =>                 

                        <div className="contenueBoxD">
                            <div className="coucheBox">
                                <div className="topConge">
                                    <div className="photoConge">
                                        <img className='image' src={`http://localhost:5000/images/${item.personnel.user.image}`}/>
                                    </div>
                                    <div className="textConge">
                                        <p>{item.personnel.user.nom}</p>
                                        <h1>{item.personnel.poste}</h1>
                                        <hr className='hr' />
                                        <h1>{item.date.substring(0, 10)} - {item.dateFin.substring(0, 10)}</h1>
                                        <hr className='hr' />
                                        <h2>{item.motif}</h2>
                                    </div>
                                </div>
                                <div className="basConge">
                                {
                                    item.status === 2 ? (
                                        <div className='coucheBtn'>
                                            {/* <button className='acceptBtn' onClick={() => { setCongeIdToUpdate(item.id); openModal(); }}>Accépter</button> */}
                                            <p>Reffusé</p>
                                        </div>
                                    ) : item.status === 1 ? (
                                        <div className='coucheBtn'>
                                            <p>Accepté</p>
                                            {/* <button className='reffusBtn' onClick={() => { setCongeIdToUpdateReff(item.id); openModalReff(); }}>Réffuser</button> */}
                                        </div>
                                    ) : (
                                        <div className='coucheBtn'>
                                            <button className='acceptBtn' onClick={() => { setCongeIdToUpdate(item.id); openModal(); }}>Accépter</button>
                                            <button className='reffusBtn' onClick={() => { setCongeIdToUpdateReff(item.id); openModalReff(); }}>Réffuser</button>
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
            <h2>Êtes-vous sûr de vouloir accépter cette congé ?</h2>
            <hr className="hr" />
            <div className='modalActions'>
                <button onClick={accepterConge} className="ok">Oui</button>
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
            <h2>Êtes-vous sûr de vouloir réffuser cette congé ?</h2>
            <hr className="hr" />
            <div className='modalActions'>
                <button onClick={accepterCongeReff} className="ok">Oui</button>
                <button onClick={closeModalReff} className="annuler">Non</button>
            </div>
        </Modal>
        </div>
    )
}

export default CongeAdminPage