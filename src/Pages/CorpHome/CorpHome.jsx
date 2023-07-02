import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import aina from "../../Outils/icon/aina.png";
import personnelIcon from "../../Outils/icon/personnel.ico";
import congeIcon from "../../Outils/icon/conge.ico";
import prisonnierIcon from "../../Outils/icon/prisonier.ico";
import celluleIcon from "../../Outils/icon/cellule.ico";
import visiteurIcon from "../../Outils/icon/visiteur.ico";
import incidentIcon from "../../Outils/icon/alert.ico";
import visiteIcon from "../../Outils/icon/visite.ico";
import adminIcon from "../../Outils/icon/admin.ico";
import infoIcon from "../../Outils/icon/info.ico";
import axios from 'axios';
import "./corpHome.css"
import personnelIconN from "../../Outils/icon/personnelN.ico";
import congeIconN from "../../Outils/icon/congeN.ico";
import prisonnierIconN from "../../Outils/icon/prisonierN.ico";
import celluleIconN from "../../Outils/icon/celluleN.ico";
import visiteurIconN from "../../Outils/icon/visiteurN.ico";
import NotificationPage from '../NotificationPage/NotificationPage';

function CorpHome() {
    return (
        <div className='corpHome'>
            <div className="gaucheHome">
                <div className="coucheGauche">
                    <Link to={"/comptePage"}>
                        <div className="contenue">
                            <img className='image' src={aina}/>
                            <p>Alunorah Aina</p>
                        </div>
                    </Link>
                    <Link to={"/personnelPage"}>
                        <div className="contenue">
                            <img className='image' src={personnelIcon}/>
                            <p>Personnels</p>
                        </div>
                    </Link>
                    <Link to={"/congePage"}>
                        <div className="contenue">
                            <img className='image' src={congeIcon}/>
                            <p>Congées</p>
                        </div>
                    </Link>
                    <Link to={"/visitePage"}>
                        <div className="contenue">
                            <img className='image' src={visiteIcon}/>
                            <p>Visites</p>
                        </div>
                    </Link>
                    <Link to={"/prisonniersPage"}>
                        <div className="contenue">
                            <img className='image' src={prisonnierIcon}/>
                            <p>Détenus</p>
                        </div>
                    </Link>
                    <Link to={"/cellulesPage"}>
                        <div className="contenue">
                            <img className='image' src={celluleIcon}/>
                            <p>Cellules</p>
                        </div>
                    </Link>
                    <Link to={"/visiteursPage"}>
                        <div className="contenue">
                            <img className='image' src={visiteurIcon}/>
                            <p>Visiteurs</p>
                        </div>
                    </Link>
                    <Link to={"/incidentPage"}>
                        <div className="contenue">
                            <img className='image' src={incidentIcon}/>
                            <p>Incidents</p>
                        </div>
                    </Link>
                    <Link to={"/adminPage"}>
                        <div className="contenue">
                            <img className='image' src={adminIcon}/>
                            <p>Administrateurs</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="droiteHome">
                <div className="coucheDroite">
                    <div className="hautDroite">
                        <div className="contenueBox">
                            <div className="imageBox">
                                <img className='imageGrang' src={personnelIconN}/>
                            </div>
                            <div className="textBox">
                                <h2>Personnels</h2>
                                <p>150</p>
                            </div>
                        </div>
                        <div className="contenueBox">
                            <div className="imageBox">
                                <img className='imageGrang' src={congeIconN}/>
                            </div>
                            <div className="textBox">
                                <h2>Congées en cours</h2>
                                <p>150</p>
                            </div>
                        </div>
                        <div className="contenueBox">
                            <div className="imageBox">
                                <img className='imageGrang' src={prisonnierIconN}/>
                            </div>
                            <div className="textBox">
                                <h2>Détenus</h2>
                                <p>150</p>
                            </div>
                        </div>
                        <div className="contenueBox">
                            <div className="imageBox">
                                <img className='imageGrang' src={celluleIconN}/>
                            </div>
                            <div className="textBox">
                                <h2>Cellules</h2>
                                <p>150</p>
                            </div>
                        </div>
                        <div className="contenueBox">
                            <div className="imageBox">
                                <img className='imageGrang' src={visiteurIconN}/>
                            </div>
                            <div className="textBox">
                                <h2>Visiteurs</h2>
                                <p>150</p>
                            </div>
                        </div>
                    </div>
                    <div className="basDroite">
                        <div className="topTable">
                            <div className="divTitre">
                                <h2>Personnels</h2>
                            </div>
                            <div className="divLink">
                                <Link to={'/personnelPage'}>
                                    <p>Afficher tous</p>
                                </Link>
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
                                        <td>Numéro</td>
                                        <td>Departement</td>
                                        <td>Poste</td>
                                        <td>Salaire</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img src={aina}/></td>
                                        <td>Aina Tolotriniavo</td>
                                        <td>Alunorah</td>
                                        <td>Moramanga</td>
                                        <td>034 56 896 25</td>
                                        <td>Developpement</td>
                                        <td>Dev</td>
                                        <td>2000000 Ar</td>    
                                    </tr>
                                    <tr>
                                        <td><img src={aina}/></td>
                                        <td>Aina Tolotriniavo</td>
                                        <td>Alunorah</td>
                                        <td>Moramanga</td>
                                        <td>034 56 896 25</td>
                                        <td>Developpement</td>
                                        <td>Dev</td>
                                        <td>2000000 Ar</td>    
                                    </tr>
                                    <tr>
                                        <td><img src={aina}/></td>
                                        <td>Aina Tolotriniavo</td>
                                        <td>Alunorah</td>
                                        <td>Moramanga</td>
                                        <td>034 56 896 25</td>
                                        <td>Developpement</td>
                                        <td>Dev</td>
                                        <td>2000000 Ar</td>    
                                    </tr>
                                    <tr>
                                        <td><img src={aina}/></td>
                                        <td>Aina Tolotriniavo</td>
                                        <td>Alunorah</td>
                                        <td>Moramanga</td>
                                        <td>034 56 896 25</td>
                                        <td>Developpement</td>
                                        <td>Dev</td>
                                        <td>2000000 Ar</td>    
                                    </tr>
                                    <tr>
                                        <td><img src={aina}/></td>
                                        <td>Aina Tolotriniavo</td>
                                        <td>Alunorah</td>
                                        <td>Moramanga</td>
                                        <td>034 56 896 25</td>
                                        <td>Developpement</td>
                                        <td>Dev</td>
                                        <td>2000000 Ar</td>    
                                    </tr>
                                    <tr>
                                        <td><img src={aina}/></td>
                                        <td>Aina Tolotriniavo</td>
                                        <td>Alunorah</td>
                                        <td>Moramanga</td>
                                        <td>034 56 896 25</td>
                                        <td>Developpement</td>
                                        <td>Dev</td>
                                        <td>2000000 Ar</td>    
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CorpHome