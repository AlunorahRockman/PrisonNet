import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import errorIcon from "../../Outils/icon/error.ico";
import { useAuth } from '../../hooks/useAuth';

import "./compte.css"

function Compte() {

    const {user} = useAuth()
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()

    const [nom, setNom] = useState("");
    useEffect(() => {
        const valeurRecente = user.nom;
        setNom(valeurRecente);
    }, []);
    
    const [prenom, setPrenom] = useState("");
    useEffect(() => {
        const valeurRecente = user.prenom;
        setPrenom(valeurRecente);
    }, []);

    const [sexe, setSexe] = useState("");
    useEffect(() => {
        const valeurRecente = user.sexe;
        setSexe(valeurRecente);
    }, []);

    const [email, setEmail] = useState("");
    useEffect(() => {
        const valeurRecente = user.email;
        setEmail(valeurRecente);
    }, []);

    const [adresse, setAdresse] = useState("");
    useEffect(() => {
        const valeurRecente = user.adresse;
        setAdresse(valeurRecente);
    }, []);

    const [dateNaissance, setDateNaissance] = useState("");
    useEffect(() => {
        const valeurRecente = user.dateNaissance.substring(0, 10);
        setDateNaissance(valeurRecente);
    }, []);

    const [phone, setPhone] = useState("");
    useEffect(() => {
        const valeurRecente = user.phone;
        setPhone(valeurRecente);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const updatedUser = {
            nom: nom,
            prenom: prenom,
            sexe: sexe,
            email: email,
            adresse: adresse,
            dateNaissance: dateNaissance,
            phone: phone
        };
        

        axios.put(`http://localhost:5000/updateUser/${user.id}`, updatedUser)
            .then(response => {
            console.log(response.data);
                navigate('/')
            })
            .catch(err => {
                console.error(err); 
                if (err.response.status === 401) {
                    setErrors(err.response.data);
                }
            });
    };


    return (
        <div className='corpHome'>
            <div className="gaucheCompte">
                <div className="divTitreCompte">
                    <p>Modifier mon profil</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="divContenueCompte">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)}  id='nom'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}  id='prenom'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="sexe">Sexe</label>
                        <input type="text" value={sexe} onChange={(e) => setSexe(e.target.value)}  id='sexe'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="email">Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  id='email'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)}  id='adresse'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="dateNaissance">Date de Naissance</label>
                        <input type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)}  id='dateNaissance'/>
                    </div>
                    <div className="divContenueCompte">
                        <label htmlFor="phone">Numéro de Téléphone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}  id='phone'/>
                    </div>
                    {
                        errors && errors.length > 0 && (
                            <div className="errors">
                                <div className="errorIcon">
                                    <img src={errorIcon} alt="erreur" />
                                </div>
                                <div className="errorText">
                                    <p>{errors}</p>
                                </div>
                            </div>
                        )
                    }
                    <hr className='hr'/>
                    <div className="divButtonCompte">
                        <button type='submit'>Modifier</button>
                    </div>
                    <p className='p'>Retour à la <Link to = {'/'}>maison</Link></p>
                </form>
            </div>
            <div className="droiteCompte">
                <div className="imageCompte">
                    <div className="photoCompte">
                        <img className='image' src={`http://localhost:5000/images/${user.image}`}/>
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