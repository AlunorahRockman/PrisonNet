import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import modifyIcon from "../../Outils/icon/modify.ico";
import deleteIcon from "../../Outils/icon/delete.ico";
import addPersIcon from "../../Outils/icon/addPers.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import "./cellulesPage.css"

function CellulesPage() {

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/cellules`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])


    return (

        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <Link to={"/"}>
                        <div className="contenue">
                            <img className='image' src={retourIcon}/>
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
            </div>
        <div className="droitePrisonniers">
            <div className="basDroite">
                <div className="topTable">
                    <div className="divTitre">
                        <h2>Cellules</h2>
                    </div>
                    <div className="divInputRecherche">
                        <FaSearch className="search-icon" />
                        <input type="text" value={searchValue}
                                onChange={handleSearchChange} placeholder='Rechercher...'/>
                    </div>
                </div>
                <div className="tableCellules">
                    <table>
                        <thead>
                            <tr>
                                <td>Numero</td>
                                <td>Capacité maximal</td>
                                <td>Superficie</td>
                                <td>Statut</td>
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
                            ).map((item) => 
                                <tr>
                                    <td>{item.numero}</td>
                                    <td>{item.capaciteMax} Détenus</td>
                                    <td>{item.superficie} m<sup>2</sup></td>
                                    <td>{item.statut === 0 ? "Libre" : "Occupé"}</td>
                                    <td className='action'>
                                        <Link>
                                            <button><img className='img' src={modifyIcon}/></button>
                                        </Link>
                                        <Link>
                                            <button className='deleteBtn'><img className='img' src={deleteIcon}/></button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className='trBtn'>
                        <Link to={'/addCellule'}>
                            <button className='addBtnc'>
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

export default CellulesPage