import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import './personnelsAdminPage.css'

function PersonnelsAdminPage() {
    return (
        <div className='corpsPersonnel'>
            <div className="gauchePers">
                <div className="coucheGauche">
                    <Link to={"/"}>
                        <div className="contenue">
                            <img className='image' src={retourIcon}/>
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="droitePers">
                <div className="basDroite">
                    <div className="topTable">
                        <div className="divTitre">
                            <h2>Personnels</h2>
                        </div>
                        <div className="divLink">
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
                                    <td>Actions</td>
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
                                    <td>
                                        <Link to={'/'}>
                                            <button className='btnKely'>Afficher</button>
                                        </Link>
                                    </td>    
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
                                    <td>
                                        <Link to={'/'}>
                                            <button className='btnKely'>Afficher</button>
                                        </Link>
                                    </td>    
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
                                    <td>
                                        <Link to={'/'}>
                                            <button className='btnKely'>Afficher</button>
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

export default PersonnelsAdminPage