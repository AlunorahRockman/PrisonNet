import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import modifyIcon from "../../Outils/icon/modify.ico";
import deleteIcon from "../../Outils/icon/delete.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import "./cellulesPage.css"

function CellulesPage() {
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
                        <input type="text" placeholder='Rechercher...'/>
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
                                <td>Détenus</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>150 NBM</td>
                                <td>3 Détenus</td>
                                <td>4 m2</td>
                                <td>Libre</td>
                                <td>0 Détenus</td>
                                <td className='action'>
                                    <Link>
                                        <button><img className='img' src={modifyIcon}/></button>
                                    </Link>
                                    <Link>
                                        <button className='deleteBtn'><img className='img' src={deleteIcon}/></button>
                                    </Link>
                                </td>
                            </tr>

                            <tr>
                                <td>150 NBM</td>
                                <td>3 Détenus</td>
                                <td>4 m2</td>
                                <td>Libre</td>
                                <td>0 Détenus</td>
                                <td className='action'>
                                    <Link>
                                        <button><img className='img' src={modifyIcon}/></button>
                                    </Link>
                                    <Link>
                                        <button className='deleteBtn'><img className='img' src={deleteIcon}/></button>
                                    </Link>
                                </td>
                            </tr>

                            <tr>
                                <td>150 NBM</td>
                                <td>3 Détenus</td>
                                <td>4 m2</td>
                                <td>Libre</td>
                                <td>0 Détenus</td>
                                <td className='action'>
                                    <Link>
                                        <button><img className='img' src={modifyIcon}/></button>
                                    </Link>
                                    <Link>
                                        <button className='deleteBtn'><img className='img' src={deleteIcon}/></button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CellulesPage