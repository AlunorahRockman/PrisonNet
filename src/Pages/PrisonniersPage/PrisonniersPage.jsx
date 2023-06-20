import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import "./prisonniersPage.css"

function PrisonniersPage() {
    return (
        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <div className="titreConge">
                        <p>Prisonniers</p>
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

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>


                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>


                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>


                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>

                    <div className="contenuePrisonnier">
                        <div className="imagePrisonnier">
                            <img src={aina}/>
                        </div>
                        <div className="titrePrisonnier">
                            <p>Alunorah Aina</p>
                            <h5>19 ans</h5>
                            <hr className='hr' />
                            <h6>Moramanga</h6>
                        </div>
                        <div className="buttonPrisonnier">
                            <button className='buttonIray'>Afficher les details</button>
                        </div>
                    </div>


                </div>
            </div>
    </div>
    )
}

export default PrisonniersPage