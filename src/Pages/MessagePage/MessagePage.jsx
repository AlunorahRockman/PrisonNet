import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import sendIcon from "../../Outils/icon/send.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';

import "./messagePage.css"

function MessagePage() {
    return (
        <div className='messanger'>
            <div className="centralCenter">
                <div className="gaucheCentral">
                    <div className="couche">
                        <div className="titreDiscusion">
                            <p>Discussions</p>
                        </div>
                        <div className="inputRechercherDis">
                            <input type="text" placeholder='Recherche dans Messenger...'/>
                        </div>
                        <div className="content">

                            <div className="contenueUser">
                                <div className="image">
                                    <img src={aina}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>Aina Tolotriniavo</h6>
                                        <p>Alunorah</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="contenueUser">
                                <div className="image">
                                    <img src={aina}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>Aina Tolotriniavo</h6>
                                        <p>Alunorah</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="contenueUser">
                                <div className="image">
                                    <img src={aina}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>Aina Tolotriniavo</h6>
                                        <p>Alunorah</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="contenueUser">
                                <div className="image">
                                    <img src={aina}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>Aina Tolotriniavo</h6>
                                        <p>Alunorah</p>
                                    </div>
                                </div>
                            </div>


                            
                            <div className="contenueUser">
                                <div className="image">
                                    <img src={aina}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>Aina Tolotriniavo</h6>
                                        <p>Alunorah</p>
                                    </div>
                                </div>
                            </div>


                            
                            <div className="contenueUser">
                                <div className="image">
                                    <img src={aina}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>Aina Tolotriniavo</h6>
                                        <p>Alunorah</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            <div className="central">
                <div className="topImage">
                    <Link to={`/`}>
                        <img src={aina}/>
                    </Link>
                    <p>Alunorah</p>
                </div>
                <div className="centralMessage">

                    <div className="sender">
                        <p>Manahoana daholo ô</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>
                    <div className="recipient">
                        <p>Salama e, ary nareo any manao ahoana</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>
                    <div className="sender">
                        <p>zalah ao?</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>
                    <div className="recipient">
                        <p>Salama e, ary nareo any manao ahoana</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>

                    <div className="sender">
                        <p>Manahoana daholo ô</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>
                    <div className="recipient">
                        <p>Salama e, ary nareo any manao ahoana</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>
                    <div className="sender">
                        <p>Aay tsara be zany, mlam tsara ny asa ao Mlam tsara iha y zalah ao?</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>
                    <div className="recipient">
                        <p>Salama e, ary nareo any manao ahoana</p>
                        <h6>2004/20/02 03:20</h6>
                    </div>

                </div>
                <div className="divFotter">
                    <input id='text' name = "contenue" type="text" placeholder='Aa...'/>
                    <button>
                        <img src={sendIcon}/>
                    </button>
                </div>
            </div>
            <div className="droitCentral">
                <div className="droiteCover">
                    <Link to={`/`}>
                        <img src={aina}/>
                    </Link>
                </div>
                <div className="nom">
                    <p>Alunorah</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MessagePage