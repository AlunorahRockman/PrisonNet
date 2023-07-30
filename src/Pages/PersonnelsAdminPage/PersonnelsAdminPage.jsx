import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import addPersIcon from "../../Outils/icon/addPers.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import './personnelsAdminPage.css'

function PersonnelsAdminPage() {

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/personnels`)
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
                            <h2>Personnels</h2>
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
                                    <td>Departement</td>
                                    <td>Poste</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    data
                                    .filter(item =>
                                        Object.values(item).some(value =>
                                        String(value).toLowerCase().includes(searchValue.toLowerCase())
                                        ) ||
                                        Object.values(item.user).some(userValue =>
                                        String(userValue).toLowerCase().includes(searchValue.toLowerCase())
                                        )
                                    ).map((item, index) => 
                                    <tr key = {index}>
                                        <td><img src={`http://localhost:5000/images/${item.user.image}`}/></td>
                                        <td>{item.user.nom}</td>
                                        <td>{item.user.prenom}</td>
                                        <td>{item.user.adresse}</td>
                                        <td>{item.user.email}</td>
                                        <td>{item.user.dateNaissance.substring(0, 10)}</td>
                                        <td>{item.user.sexe}</td>
                                        <td>{item.user.phone}</td>
                                        <td>{item.departement}</td>
                                        <td>{item.poste}</td>
                                        <td>
                                            <Link to={`/afficherPersonnels/${item.user.id}`}>
                                                <button className='btnKely'>Afficher</button>
                                            </Link>
                                        </td>       
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                        <div className='trBtn'>
                            <Link to={'/addPers'}>
                                <button className='addBtn'>
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
        </div>
    )
}

export default PersonnelsAdminPage