import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import aina from "../../Outils/icon/aina.png";
import { useAuth } from '../../hooks/useAuth';

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
                    <p className='p'>Retour à la <Link to = {'/visiteursPage'}>liste des visiteurs</Link></p>
                </div>
            </div>
        </div>
    )
}

export default AfficherVisiteurs