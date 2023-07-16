import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import { useAuth } from '../../hooks/useAuth';

import "./visiteAdminPage.css"

function VisiteAdminPage() {

    const {user} = useAuth()
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/getAllVisite`)
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
                    <p>Visites</p>
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
                .filter(item =>
                    Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchValue.toLowerCase())
                    )
                ).map((item) =>                 
                    <div className="contenueBox">
                        <div className="coucheBox">
                            <div className="topConge">
                                <div className="photoConge">
                                    <img className='image' src={`http://localhost:5000/images/${user.image}`}/>
                                </div>
                                <div className="textConge">
                                    <p>Nom d'utilisateur</p>
                                    <h1>Adresse d'utilisateur</h1>
                                    <hr className='hr' />
                                    <h1>Date de visite: {item.dateVisite.substring(0, 10)}</h1>
                                    <hr className='hr' />
                                    <h2>Nom de la détenus: <Link to={'/'}>Nom de la detenus</Link></h2>
                                    <hr className='hr' />
        
                                </div>
                            </div>
                            <div className="basConge">
                                <div className="coucheBtn">
                                    <button className='acceptBtn'>Accépter</button>
                                    <button className='reffusBtn'>Réffuser</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }

            </div>
        </div>
    </div>
    )
}

export default VisiteAdminPage