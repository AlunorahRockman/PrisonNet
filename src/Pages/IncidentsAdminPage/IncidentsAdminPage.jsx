import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";

import "./incidentsAdminPage.css"

import { useAuth } from '../../hooks/useAuth';


function IncidentsAdminPage() {


    const {user} = useAuth()
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/getAllIncident`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])
    return (


        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <div className="titreConge">
                        <p>Incidents</p>
                    </div>
                    <div className="rechercherDiv">
                        <input value={searchValue} onChange={handleSearchChange} type="text" placeholder='Rechercher...'/>
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
                <div className="coucheConge">

                    <div>
                        <ul className="incident-list">


                        {
                            data
                            .filter(item =>
                                Object.values(item).some(value =>
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                                )
                            ).map((item) =>                 
                                <li>
                                    <div className="imageIncidentsListe">
                                        <img className='personnel-image' src={`http://localhost:5000/images/${item.user.image}`}/>
                                    </div>
                                    <div className="textIncidents">
                                        <h5>{item.user.nom}</h5>
                                        <p className='motifIncidents'>{item.description}</p>
                                        <span>Date: {item.date.substring(0, 10)}</span>
                                        <span>Nom de la détenus concerné: <Link>{item.detenu.nom}</Link></span>
                                        <div className="imageDetenus">
                                            <img src={`http://localhost:5000/images/${item.detenu.image}`}/>
                                        </div>
                                    </div>
                                </li>
                            )
                        }


                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncidentsAdminPage