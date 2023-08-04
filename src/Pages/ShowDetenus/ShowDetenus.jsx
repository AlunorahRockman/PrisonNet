import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import NavBar from '../NavBar/NavBar'
import "./showDetenus.css"

function ShowDetenus() {
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
                }
            } catch (error) {
                console.error(error);
            }
        };

        getDetenus();
    }, [id]);


    return (
        <div>
            <NavBar/>
            <div className="divContainer">
                <div className="couche">
                    <div className="imageShow">
                        <img src={`http://localhost:5000/images/${image}`}/>
                    </div>
                    <hr className='hr' />
                    <div className="contenueDetails">
                        <label htmlFor="">{nom}</label>
                        <label htmlFor="">{prenom}</label>
                        <label htmlFor="">{adresse}</label>
                        <label htmlFor="">{dateNaissance}</label>
                        <label htmlFor="">{sexe}</label>
                        <label htmlFor="">{nationnalite}</label>
                        <label htmlFor="">{dureePeine}</label>
                        <label htmlFor="">{dateVenue}</label>
                        <label htmlFor="">{raison}</label>
                        <br />
                    </div>
                    <hr className="hr" />
                    <div className="divRetour">
                        <label htmlFor="">Retour à la liste des <Link to={'/visitePage'}>visites</Link></label>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
}

export default ShowDetenus