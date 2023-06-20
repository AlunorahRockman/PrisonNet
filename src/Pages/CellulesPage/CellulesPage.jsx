import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
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
            <div className="couchePrisonniers">
                <div className="topTable">
                    <div className="divTitre">
                        <h2>Cellules</h2>
                    </div>
                    <div className="divLink">
                    </div>
                </div>
                <div className="tableCellules">
                    <table>
                        <thead>
                            <tr>
                                <td>Numero</td>
                                <td>Nombre de prisonnier</td>
                                <td>Diametre</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>3 P</td>
                                <td>4 m 2</td>
                                <td>
                                    <Link>
                                        <button>Modifier</button>
                                    </Link>
                                    <Link>
                                        <button>Afficher</button>
                                    </Link>
                                </td>
                            </tr>

                            <tr>
                                <td>001</td>
                                <td>3 P</td>
                                <td>4 m 2</td>
                                <td>
                                    <Link>
                                        <button>Modifier</button>
                                    </Link>
                                    <Link>
                                        <button>Afficher</button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>001</td>
                                <td>3 P</td>
                                <td>4 m 2</td>
                                <td>
                                    <Link>
                                        <button>Modifier</button>
                                    </Link>
                                    <Link>
                                        <button>Afficher</button>
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