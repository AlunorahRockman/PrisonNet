import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';

import "./notificationPage.css"

function NotificationPage() {
    return (
        <div className='containerNotif'>
            <div className="coucheNotif">
                <div className="titreNotif">
                    <p>Notifications</p>
                    <hr className='hr' />
                </div>
                <div className="divContainerNotif">
                    
                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>

                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>


                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>

                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>
                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>
                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>

                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>

                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>


                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>


                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>


                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>
                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>
                    <div className="contenueNotif">
                        <div className="coucheContenue">
                            <div className="imageNotif">
                                <img src={aina}/>
                            </div>
                            <div className="descriptionNotif">
                                <h6>Alunorah Aina</h6>
                                <p>Nangataka congé ity namana iray ity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationPage