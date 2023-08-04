import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import aina from "../../Outils/icon/aina.png";
import { useAuth } from '../../hooks/useAuth';
import Modal from 'react-modal'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./afficherVisiteurs.css"

function AfficherVisiteurs() {
    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/getOneVisiteurs/${id}`)
            resultat = await resultat.data;
            setData(resultat)
            console.log(data)
        }
        fetchData()
    }, [])

    const [modalIsOpenReff, setModalIsOpenReff] = useState(false);
    const openModalReff = () => {
        setModalIsOpenReff(true);
    };

    const closeModalReff = () => {
        setModalIsOpenReff(false);
    };

    const bloquerCompte = () => {
        if (id) {
            axios.post(`http://localhost:5000/bloque/${id}`)
                .then(response => {
                    closeModalReff(); 
                    toast.success(`Mise a jour enregistré!`, {
                        position: 'bottom-right',
                        autoClose: 5000,
                    });
                    navigate('/personnelPage')
                })
                .catch(error => {
                    console.error(error);
                    closeModalReff(); 
                });
        }
    };

    console.log(data.estBloque)


    return (
        <div className='containerAfficher'>
            <div className="coucheAfficher">
                <div className="gaucheAfficher">
                    <div className="imageUser">
                        <img className='image' src={`http://localhost:5000/images/${data.image}`}/>
                    </div>
                    <hr className="hr" />
                    <div className="inputAfficher">
                    </div>
                </div>
                <div className="droiteAfficher">
                    <div className="titreAfficher">
                        <p>Information Personnels</p>
                    </div>  
                    <div className="listeLabel">
                        <label htmlFor="">{data.nom}</label>
                        <label htmlFor="">{data.prenom}</label>
                        <label htmlFor="">{data.email}</label>
                        <label htmlFor="">{data.adresse}</label>
                        <label htmlFor="">{data.dateNaissance}</label>
                        <label htmlFor="">{data.phone}</label>
                        <label htmlFor="">{data.sexe == 'M'? 'Masculin' : 'Féminin'}</label>
                    </div>
                    <div className='divBouton2'>
                        {
                            data.estBloque === true ? (
                                <button onClick={openModalReff}>Débloquer</button>
                            ): (
                                <button onClick={openModalReff}>Bloquer</button>
                            )
                        }
                    </div>
                    <p className='p'>Retour à la <Link to = {'/visiteursPage'}>liste des visiteurs</Link></p>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpenReff}
                onRequestClose={closeModalReff}
                contentLabel="Modal de Blocage de Compte"
                className="Modal"
                overlayClassName="ModalOverlay"
            >
                <h3>Confirmation de Blocage de Compte</h3>
                <h2>Êtes-vous sûr de vouloir {data.estBloque === true ? "débloquer" : "bloquer"} ce compte ?</h2>
                <hr className="hr" />
                <div className='modalActions'>
                    {data.estBloque === true? (
                        <button onClick={bloquerCompte} className="ok">Débloquer</button>
                    ) : (
                        <button onClick={bloquerCompte} className="ok">Bloquer</button>
                    )}
                    <button onClick={closeModalReff} className="annuler">Annuler</button>
                </div>
            </Modal>
            <ToastContainer
                theme='dark'
            />
        </div>
    )
}

export default AfficherVisiteurs