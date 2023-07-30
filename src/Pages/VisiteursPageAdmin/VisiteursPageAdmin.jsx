import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import addPersIcon from "../../Outils/icon/addPers.ico";
import { FaSearch } from 'react-icons/fa';

import "./visiteursPageAdmin.css"

function VisiteursPageAdmin() {

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/visiteurs`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])

    console.log(data)

    return (
        <div className='corpsPersonnel'>
            <div className="gauchePers">
                <div className="coucheGauche">
                    <Link to={"/"}>
                        <div className="contenue">
                            <img className='image' src={retourIcon}/>
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="droitePers">
                <div className="basDroite">
                    <div className="topTable">
                        <div className="divTitre">
                            <h2>Visiteurs</h2>
                        </div>
                        <div className="divInputRecherche">
                            <FaSearch className="search-icon" />
                            <input type="text" value={searchValue}
                                onChange={handleSearchChange} placeholder='Rechercher...'/>
                        </div>
                    </div>
                    <div className="tablePers">
                        <table>
                            <thead>
                                <tr>
                                    <td>Photo</td>
                                    <td>Nom</td>
                                    <td>Prénom</td>
                                    <td>Adresse</td>
                                    <td>Email</td>
                                    <td>Date de naissance</td>
                                    <td>Sexe</td>
                                    <td>Téléphone</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    data
                                    .filter(item =>
                                        Object.values(item).some(value =>
                                        String(value).toLowerCase().includes(searchValue.toLowerCase())
                                        )
                                    ).map((item,index) => 
                                        <tr key={index}>
                                            <td>
                                            <img className='image' src={`http://localhost:5000/images/${item.image}`}/>
                                            </td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom}</td>
                                            <td>{item.adresse}</td>
                                            <td>{item.email}</td>
                                            <td>{item.dateNaissance.substring(0, 10)}</td>
                                            <td>{item.sexe}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <Link to={`/detailsVisiteurs/${item.id}`}>
                                                    <button className='btnKely'>Afficher</button>
                                                </Link>
                                            </td>    
                                        </tr>  
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisiteursPageAdmin