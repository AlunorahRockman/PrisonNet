import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import aina from "../../Outils/icon/aina.png";
import { useAuth } from '../../hooks/useAuth';

import "./detailsDetenus.css"

function DetailsDetenus() {
    const {id} = useParams()

    const navigate = useNavigate()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [adresse, setAdresse] = useState('')
    const [dateNaissance, setDateNaissance] = useState('')
    const [sexe, setSexe] = useState('')
    const [nationnalite, setNationnalite] = useState('')
    const [dureePeine, setDureePeine] = useState(0)
    const [dateVenue, setDateVenue] = useState('')
    const [raison, setRaison] = useState('')
    const [image, setImage] = useState('')
    const [idDetenus, setIdDetenus] = useState(0)

    const [errors, setErrors] = useState([])

    useEffect(() => {
        const getDetenus = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getOneDetenus/${id}`);
                const data = response.data;
    
                if (data) {
                    setNom(data.nom)
                    setPrenom(data.prenom)
                    setAdresse(data.adresse)
                    setDateNaissance(new Date(data.dateNaissance).toISOString().split('T')[0]);
                    setSexe(data.sexe);
                    setNationnalite(data.nationnalite);
                    setDureePeine(data.dureePeine);
                    setDateVenue(new Date(data.dateVenue).toISOString().split('T')[0])
                    setRaison(data.raison)
                    setImage(data.image)
                    setIdDetenus(data.id)
                }
            } catch (error) {
                console.error(error);
            }
        };

        getDetenus();
    }, [id]);


    const updateDetenus = async () => {
        
        const updateDetenu = {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            dateNaissance: dateNaissance,
            sexe: sexe,
            nationnalite: nationnalite,
            dureePeine: dureePeine,
            dateVenue: dateVenue,
            raison: raison
        };
    
        await axios.put(`http://localhost:5000/updateDetenus/${id}`, updateDetenu)
        .then(res => {
            console.log(res)
            navigate('/prisonniersPage')
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
        updateDetenus()
    }

        // ! Image *****************************

        const [selectedFile, setSelectedFile] = useState(null);
        const [previewImage, setPreviewImage] = useState(null);
        const [showCancelButton, setShowCancelButton] = useState(false);
        const [showSaveButton, setShowSaveButton] = useState(false); 
    
        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setShowCancelButton(true);
            setShowSaveButton(true);
        };
    
        const handleCancel = () => {
            setSelectedFile(null);
            setPreviewImage(null); 
            setShowCancelButton(false);
            setShowSaveButton(false);
        };
    
        const handleUpload = () => {
            if (!selectedFile) {
                alert("Veuillez sélectionner une image.");
                return;
            }
    
            const currentFileName = selectedFile.name;
    
            let fileName = "";
    
            fileName = `${idDetenus}Detenus`;
    
            const formData = new FormData();
            formData.append("image", selectedFile);
    
    
            axios.post(`http://localhost:5000/upload/${fileName}`, formData)
                .then((response) => {
                    console.log(response.data);
                    axios.put(`http://localhost:5000/setImageDetenus/${idDetenus}/${fileName}`)
                    .then((response) => {
                        console.log(response.data.message);
                        navigate('/prisonniersPage');
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.error(error.response.data.message);
                        alert("Une erreur est survenue lors de la modification de l'image.");
                    });
                })
                .catch((error) => {
                    console.error(error.response.data.message);
                    alert("Une erreur est survenue lors du téléchargement de l'image.");
                });
        };
    
    
    // ! **********************************************


    return (
        <div className='corpHome'>
            <div className="gaucheCompte">
                <div className="divTitreCompte">
                    <p>Modifier le profil de détenus</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="divContenueCompte">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)}  id='nom'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}  id='prenom'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)}  id='adresse'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="dateNaissance">Date de Naissance</label>
                        <input type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)}  id='dateNaissance'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="sexe">Sexe</label>
                        <input type="text" value={sexe} onChange={(e) => setSexe(e.target.value)}  id='sexe'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="email">Nationnalité</label>
                        <input type="text" value={nationnalite} onChange={(e) => setNationnalite(e.target.value)}  id='nationnalite'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="phone">Durée de peine</label>
                        <input type="text" value={dureePeine} onChange={(e) => setDureePeine(e.target.value)}  id='dureePaine'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="phone">Date de venue</label>
                        <input type="text" value={dateVenue} onChange={(e) => setDateVenue(e.target.value)}  id='dateVenue'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="phone">Raison</label>
                        <input type="text" value={raison} onChange={(e) => setRaison(e.target.value)}  id='raison'/>
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
                    <hr className='hr'/>
                    <div className="divButtonCompte">
                        <button type='submit'>Modifier</button>
                    </div>
                    <p className='p'>Retour à la <Link to = {'/prisonniersPage '}>liste des détenus</Link></p>
                </form>
            </div>
            <div className="droiteCompte">
                <div className="imageCompte">
                    <div className="photoCompte">
                        {previewImage ? (
                            <img className='image' src={previewImage} alt="Image sélectionnée" />
                        ) : (
                            <img className='image' src={`http://localhost:5000/images/${image}`} alt="Image de profil" />
                        )}
                    </div>
                    <div className="divInputTitre">
                        {showCancelButton ? ( 
                            <div className="titreInput">
                                <button onClick={handleCancel}>Annuler</button>
                            </div>
                        ) : (
                            <div className="titreInput">
                                <p>Photo de profil</p>
                            </div>
                        )}
                        <div className="inputBtn">
                            <label htmlFor="file">Importer une photo</label>
                            <input type="file" onChange={handleFileChange} id='file'/>
                        </div>
                    </div>

                    <div className="divBtn">
                        <hr className='hr'/>
                        {showSaveButton && <button onClick={handleUpload}>Enregistrer</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsDetenus