import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";

import "./visiteAdminPage.css"

function VisiteAdminPage() {
    return (
        <div className='corpsPersonnel'>
        <div className="gauchePers">
            <div className="coucheGauche">
                <div className="titreConge">
                    <p>Visites</p>
                </div>
                <div className="rechercherDiv">
                    {/* <FaSearch className="search-icon" /> */}
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
        <div className="droitePers">
            <div className="coucheConge">
                <div className="contenueBox">
                    <div className="coucheBox">
                        <div className="topConge">
                            <div className="photoConge">
                                <img src={aina}/>
                            </div>
                            <div className="textConge">
                                <p>Alunorah Aina</p>
                                <h1>Moramanga</h1>
                                <hr className='hr' />
                                <h1>Date de visite: 2000/20/10</h1>
                                <hr className='hr' />
                                <h2>Nom de la détenus: <Link to={'/'}>Alunorah Aina</Link></h2>
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

                <div className="contenueBox">
                    <div className="coucheBox">
                        <div className="topConge">
                            <div className="photoConge">
                                <img src={aina}/>
                            </div>
                            <div className="textConge">
                                <p>Alunorah Aina</p>
                                <h1>Moramanga</h1>
                                <hr className='hr' />
                                <h1>Date de visite: 2000/20/10</h1>
                                <hr className='hr' />
                                <h2>Nom de la détenus: <Link to={'/'}>Alunorah Aina</Link></h2>
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

                <div className="contenueBox">
                    <div className="coucheBox">
                        <div className="topConge">
                            <div className="photoConge">
                                <img src={aina}/>
                            </div>
                            <div className="textConge">
                                <p>Alunorah Aina</p>
                                <h1>Moramanga</h1>
                                <hr className='hr' />
                                <h1>Date de visite: 2000/20/10</h1>
                                <hr className='hr' />
                                <h2>Nom de la détenus: <Link to={'/'}>Alunorah Aina</Link></h2>
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

                <div className="contenueBox">
                    <div className="coucheBox">
                        <div className="topConge">
                            <div className="photoConge">
                                <img src={aina}/>
                            </div>
                            <div className="textConge">
                                <p>Alunorah Aina</p>
                                <h1>Moramanga</h1>
                                <hr className='hr' />
                                <h1>Date de visite: 2000/20/10</h1>
                                <hr className='hr' />
                                <h2>Nom de la détenus: <Link to={'/'}>Alunorah Aina</Link></h2>
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

                <div className="contenueBox">
                    <div className="coucheBox">
                        <div className="topConge">
                            <div className="photoConge">
                                <img src={aina}/>
                            </div>
                            <div className="textConge">
                                <p>Alunorah Aina</p>
                                <h1>Moramanga</h1>
                                <hr className='hr' />
                                <h1>Date de visite: 2000/20/10</h1>
                                <hr className='hr' />
                                <h2>Nom de la détenus: <Link to={'/'}>Alunorah Aina</Link></h2>
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
                <div className="contenueBox">
                    <div className="coucheBox">
                        <div className="topConge">
                            <div className="photoConge">
                                <img src={aina}/>
                            </div>
                            <div className="textConge">
                                <p>Alunorah Aina</p>
                                <h1>Moramanga</h1>
                                <hr className='hr' />
                                <h1>Date de visite: 2000/20/10</h1>
                                <hr className='hr' />
                                <h2>Nom de la détenus: <Link to={'/'}>Alunorah Aina</Link></h2>
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

            </div>
        </div>
    </div>
    )
}

export default VisiteAdminPage