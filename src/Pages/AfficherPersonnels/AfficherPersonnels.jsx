import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import aina from "../../Outils/icon/aina.png";
import { useAuth } from '../../hooks/useAuth';
import Modal from 'react-modal'; 

import "./afficherPersonnels.css"

function AfficherPersonnels() {
    const {idUser} = useParams()
    const navigate = useNavigate()
    const [updatedData, setUpdatedData] = useState({});

    const {user} = useAuth();


    const [dateEmbauche, setDateEmbauche] = useState('');
    const [departement, setDepartement] = useState('');
    const [poste, setPoste] = useState('');
    const [salaire, setSalaire] = useState('');
    const [idPersonnel, setIdPersonnel] = useState(0);
    const [image, setImage] = useState('')

    const [estBloque, setEstBloque] = useState(null)


    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchConge = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getOnePersonnels/${idUser}`);
                const result = response.data;
        
                if (response.status === 200) {
                    setImage(result.image)
                    setUpdatedData({
                        nom: result.nom,
                        prenom: result.prenom,
                        email: result.email,
                        adresse: result.adresse,
                        dateNaissance: new Date(result.dateNaissance).toISOString().split('T')[0],
                        phone: result.phone,
                        sexe: result.sexe,
                        image: result.image
                    });
                    setEstBloque(result.estBloque)
                }
            } catch (error) {
                console.error(error);
            }
        };
            fetchConge();
    }, [idUser]);


    useEffect(() => {
        const getOnePersonnel = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getPersonnelsByOneUser/${idUser}`);
                const personnelArray = response.data;
    
                if (personnelArray.length > 0) {
                    const personnel = personnelArray[0];
                    setDateEmbauche(new Date(personnel.dateEmbauche).toISOString().split('T')[0]);
                    setDepartement(personnel.departement);
                    setPoste(personnel.poste);
                    setSalaire(personnel.salaire);
                    setIdPersonnel(personnel.id)
                }
            } catch (error) {
                console.error(error);
            }
        };

        getOnePersonnel();
    }, [idUser]);

    const updatePersonnels = async () => {
        
        const updatePersonnel = {
            dateEmbauche: dateEmbauche,
            poste: poste,
            departement: departement,
            salaire: salaire,
        };
    
        await axios.put(`http://localhost:5000/updatePersonnel/${idPersonnel}`, updatePersonnel)
        .then(res => {
            console.log(res)
            navigate('/personnelPage')
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updatePersonnels();   
    };


    const [modalIsOpenReff, setModalIsOpenReff] = useState(false);
    const openModalReff = () => {
        setModalIsOpenReff(true);
    };

    const closeModalReff = () => {
        setModalIsOpenReff(false);
    };

    const bloquerCompte = () => {
        if (user.id) {
            axios.post(`http://localhost:5000/bloque/${idUser}`)
                .then(response => {
                    closeModalReff(); 
                    navigate('/personnelPage')
                })
                .catch(error => {
                    console.error(error);
                    closeModalReff(); 
                });
        }
    };


    return (
        <div className='containerAfficher'>
            <div className="coucheAfficher">
                <div className="gaucheAfficher">
                    <div className="imageUser">
                        <img className='image' src={`http://localhost:5000/images/${image}`}/>
                    </div>
                    <hr className="hr" />
                    <div className="inputAfficher">
                        <form onSubmit={handleSubmit}>
                            <div className="inputItem">
                                <label htmlFor="">Date d'embauche</label>
                                <input type='date' value={dateEmbauche} onChange={(e) => setDateEmbauche(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label htmlFor="">Departement</label>
                                <input id="depart" name="depart"
                                value={departement} onChange={(e) => setDepartement(e.target.value)} type="text" placeholder='...'/>
                            </div>
                            <div className="inputItem">
                                <label htmlFor="">Poste</label>
                                <input type="text" value={poste} onChange={(e) => setPoste(e.target.value)} placeholder='...'/>
                            </div>
                            <div className="inputItem">
                                <label htmlFor="">Salaire</label>
                                <input type="number" value={salaire} onChange={(e) => setSalaire(e.target.value)} />
                            </div>
                            
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
                            <div className="inputItem">
                                <button>Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="droiteAfficher">
                    <div className="titreAfficher">
                        <p>Information Personnels</p>
                    </div>  
                    <div className="listeLabel">
                        <label htmlFor="">{updatedData.nom}</label>
                        <label htmlFor="">{updatedData.prenom}</label>
                        <label htmlFor="">{updatedData.email}</label>
                        <label htmlFor="">{updatedData.adresse}</label>
                        <label htmlFor="">{updatedData.dateNaissance}</label>
                        <label htmlFor="">{updatedData.phone}</label>
                        <label htmlFor="">{updatedData.sexe == 'M'? 'Masculin' : 'Féminin'}</label>
                    </div>
                    <div className='divBouton2'>
                        {
                            estBloque === true ? (
                                <button onClick={openModalReff}>Débloquer</button>
                            ): (
                                <button onClick={openModalReff}>Bloquer</button>
                            )
                        }
                    </div>
                    <p className='p'>Retour à la <Link to = {'/personnelPage'}>liste des personnels</Link></p>
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
                <h2>Êtes-vous sûr de vouloir {estBloque === true ? "débloquer" : "bloquer"} ce compte ?</h2>
                <hr className="hr" />
                <div className='modalActions'>
                    {estBloque === true ? (
                        <button onClick={bloquerCompte} className="ok">Débloquer</button>
                    ) : (
                        <button onClick={bloquerCompte} className="ok">Bloquer</button>
                    )}
                    <button onClick={closeModalReff} className="annuler">Annuler</button>
                </div>
            </Modal>

        </div>
    )
}

export default AfficherPersonnels