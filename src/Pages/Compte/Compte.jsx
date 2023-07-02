import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";

import "./compte.css"

function Compte() {
    return (
        <div className='corpHome'>
            <div className="gaucheCompte">
                <div className="divTitreCompte">
                    <p>Modifier mon profil</p>
                </div>
                <form action="">
                    <div className="divContenueCompte">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id='nom'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" id='prenom'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="sexe">Sexe</label>
                        <input type="text" id='sexe'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" id='adresse'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="dateNaissance">Date de Naissance</label>
                        <input type="date" id='dateNaissance'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="phone">Numéro de Téléphone</label>
                        <input type="text" id='phone'/>
                    </div>
                    <hr className='hr'/>
                    <div className="divButtonCompte">
                        <button>Modifier</button>
                    </div>
                </form>
            </div>
            <div className="droiteCompte">
                <div className="imageCompte">
                    <div className="photoCompte">
                        <img src={aina}/>
                    </div>
                    <div className="divInputTitre">
                        <div className="titreInput">
                            <p>Photo de profil</p>
                        </div>
                        <div className="inputBtn">
                            <label htmlFor="file">Importer une photo</label>
                            <input type="file" id='file'/>
                        </div>
                    </div>

                    <div className="divBtn">
                        <hr className='hr'/>
                        <button>Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compte