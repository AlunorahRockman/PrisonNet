import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";

import "./incidentsAdminPage.css"


function IncidentsAdminPage() {
    return (


        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <div className="titreConge">
                        <p>Détenus</p>
                    </div>
                    <div className="rechercherDiv">
                        <input type="text" placeholder='Rechercher...'/>
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
                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>

                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>

                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>

                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>


                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>


                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>


                            <li>
                                <div className="imageIncidentsListe">
                                    <img className="personnel-image" src={aina}/>
                                </div>
                                <div className="textIncidents">
                                    <h5>Alunorah Aina</h5>
                                    <p>Le gardien Smith a été accusé d'abus de 
                                        pouvoir envers le détenu Johnson lors de 
                                        la ronde de nuit. Le détenu prétend avoir
                                        été physiquement agressé sans provocation.</p>
                                    <span>Date: 2023-06-10 23:45:00</span>
                                    <span>Nom de la détenus concerné: <Link>Alunorah Aina</Link></span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncidentsAdminPage