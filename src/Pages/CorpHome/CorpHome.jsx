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
import congeDemIcon from "../../Outils/icon/congeDem.ico";
import envIncitIcon from "../../Outils/icon/envoyeIncident.ico";
import demandeIcon from "../../Outils/icon/demande.jpg";
import mesDetenusIcon from "../../Outils/icon/mesDetenu.ico";
import { FaEdit, FaTrash } from 'react-icons/fa';
import visiteIconn from "../../Outils/icon/visite.jpg";
import axios from 'axios';
import "./corpHome.css"
import personnelIconN from "../../Outils/icon/personnelN.ico";
import congeIconN from "../../Outils/icon/congeN.ico";
import prisonnierIconN from "../../Outils/icon/prisonierN.ico";
import celluleIconN from "../../Outils/icon/celluleN.ico";
import visiteurIconN from "../../Outils/icon/visiteurN.ico";
import modifierIcon from "../../Outils/icon/modify.ico";
import { useAuth } from '../../hooks/useAuth';
import { FaSearch } from 'react-icons/fa';

function CorpHome() {

    const [data, setData] = useState([]);
    const [visiteursCount, setVisiteursCount] = useState(0);
    const [personnelsCount, setPersonnelsCount] = useState(0);
    const [congeEnCoursCount, setEnCoursCount] = useState(0);
    const [detenusCount, setDetenusCount] = useState(0);
    const [celluleCount, setcelluleCount] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedConge, setSelectedConge] = useState(null);
    

    const navigate = useNavigate();
    const [dataConge, setDataConge] = useState([]);
    const [searchValueConge, setSearchValueConge] = useState('');

    const [dataVisite, setDataVisite] = useState([]);
    const [searchValueVisite, setSearchValueVisite] = useState('');

    const handleSearchChange = (event) => {
        setSearchValueConge(event.target.value);
    };

    const handleSearchChangeVisite = (event) => {
        setSearchValueVisite(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            let resultat = await axios.get(`http://localhost:5000/getCongeByOneUser/${user.id}`);
            resultat = await resultat.data;
            setDataConge(resultat);
        };
        fetchData();
    }, []);

    
    useEffect(() => {
        const fetchData = async () => {
            let resultat = await axios.get(`http://localhost:5000/getVisiteByOneUser/${user.id}`);
            resultat = await resultat.data;
            setDataVisite(resultat);
        };
        fetchData();
    }, []);

    const {user}=useAuth()

    useEffect(() => {
    const fetchVisiteursCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getVisiteurCount');
            const count = response.data.count;
            setVisiteursCount(count);
        } catch (error) {
            console.error(error);
        }
    };
        fetchVisiteursCount();
    }, []);

    useEffect(() => {
        const fetchVisiteursCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/congeEnCoursCount');
                const count = response.data.count;
                setEnCoursCount(count);
            } catch (error) {
                console.error(error);
            }
        };
            fetchVisiteursCount();
        }, []);
    

    useEffect(() => {
        const fetcthData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getCelluleCount');
                const count = response.data.count;
                setcelluleCount(count);
            } catch (error) {
                console.error(error);
            }
    };
        fetcthData();
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getPersonnelsCount');
                const count = response.data.count;
                setPersonnelsCount(count);
            } catch (error) {
                console.error(error);
            }
    };
        fetchdata();
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getDetenusCount');
                const count = response.data.count;
                setDetenusCount(count);
            } catch (error) {
                console.error(error);
            }
    };
        fetchdata();
    }, []);


    useEffect(() => {
        const fetchData=async ()=>{ 
            let resultat = await axios.get(`http://localhost:5000/personnels`)
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])

    const handleDeleteConge = (idConge) => {
        const conge = dataConge.find(item => item.id === idConge);
        setSelectedConge(conge);
        setShowConfirmation(true);
    };

    const confirmDeleteConge = () => {
        axios.delete(`http://localhost:5000/deleteConge/${selectedConge.id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        window.location.reload();
        setShowConfirmation(false);
    };

    // ! suppression
    const [showConfirmationVisite, setShowConfirmationVisite] = useState(false);
    const [selectedVisite, setSelectedVisite] = useState(null);

    const handleDeleteVisite = (id) => {
        const dataObject = dataVisite.find(item => item.id === id);
        setSelectedVisite(dataObject);
        setShowConfirmationVisite(true);
    };

    const confirmDeleteVisite = () => {
        axios.delete(`http://localhost:5000/deleteVisite/${selectedVisite.id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        window.location.reload();
        setShowConfirmationVisite(false);
    };
    // ! suppression

    if(user.type_compte=="Admin")
        return (
            <div className='corpHome'>
                <div className="gaucheHome">
                    <div className="coucheGauche">
                        <Link to={"/comptePage"}>
                            <div className="contenue">
                                <img className='image' src={`http://localhost:5000/images/${user.image}`}/>
                                <p>{user.nom}</p>
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
                                    <p>{personnelsCount}</p>
                                </div>
                            </div>
                            <div className="contenueBox">
                                <div className="imageBox">
                                    <img className='imageGrang' src={congeIconN}/>
                                </div>
                                <div className="textBox">
                                    <h2>Congées en cours</h2>
                                    <p>{congeEnCoursCount}</p>
                                </div>
                            </div>
                            <div className="contenueBox">
                                <div className="imageBox">
                                    <img className='imageGrang' src={prisonnierIconN}/>
                                </div>
                                <div className="textBox">
                                    <h2>Détenus</h2>
                                    <p>{detenusCount}</p>
                                </div>
                            </div>
                            <div className="contenueBox">
                                <div className="imageBox">
                                    <img className='imageGrang' src={celluleIconN}/>
                                </div>
                                <div className="textBox">
                                    <h2>Cellules</h2>
                                    <p>{celluleCount}</p>
                                </div>
                            </div>
                            <div className="contenueBox">
                                <div className="imageBox">
                                    <img className='imageGrang' src={visiteurIconN}/>
                                </div>
                                <div className="textBox">
                                    <h2>Visiteurs</h2>
                                    <p>{visiteursCount}</p>
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
                                            <td>Email</td>
                                            <td>Date de naissance</td>
                                            <td>Sexe</td>
                                            <td>Téléphone</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => 
                                            <tr key={index}>
                                                <td><img src={`http://localhost:5000/images/${item.image}`}/></td>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.adresse}</td>
                                                <td>{item.email}</td>
                                                <td>{item.dateNaissance.substring(0, 10)}</td>
                                                <td>{item.sexe}</td>
                                                <td className='tdPhone'>{item.phone}</td>    
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        // 😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍
    else if(user.type_compte=="Visiteur")
        return(
            <div className='corpHome'>
                <div className="gaucheHome">
                    <div className="coucheGauche">
                        <Link to={"/comptePage"}>
                            <div className="contenue">
                                <img className='image' src={`http://localhost:5000/images/${user.image}`}/>
                                <p>{user.nom}</p>
                            </div>
                        </Link>
                        <Link to={"/tousLesDetenus"}>
                            <div className="contenue">
                                <img className='image' src={prisonnierIcon}/>
                                <p>Détenus</p>
                            </div>
                        </Link>
                        <Link to={"/listeIncidentsVisiteurs"}>
                            <div className="contenue">
                                <img className='image' src={incidentIcon}/>
                                <p>Incidents</p>
                            </div>
                        </Link>
                        <Link to={"/mesDetenus"}>
                            <div className="contenue">
                                <img className='image' src={mesDetenusIcon}/>
                                <p>Mes détenus</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="droiteHome">
                <div className="coucheDroiteConge">
                            <div className="coverDroit">
                                <div className="divTete">
                                    <div className="titre">
                                        <p>Demande de visite</p>
                                    </div>
                                    <div className="rechercheDiv">
                                        <div className="icon">
                                            <FaSearch className="search-icon" />
                                        </div>
                                        <div className="divInput">
                                            <input type="text" value={searchValueVisite} onChange={handleSearchChangeVisite} placeholder='Rechercher ici...'/>
                                        </div>
                                    </div>
                                </div>
                            <div className="divContenue">


                                {dataVisite
                                    .filter(item =>
                                        Object.values(item).some(value =>
                                        String(value).toLowerCase().includes(searchValueVisite.toLowerCase())
                                        )
                                        )
                                        .map((item, index) =>
                                            <div key={index} className="contentConge">
                                                <div className="gauche">
                                                    <div className="imageC">
                                                        <img src={visiteIconn}/>
                                                    </div>
                                                    <div className="textCongee">
                                                        <div className='top'>
                                                            <h5><span>Date :</span> {item.dateVisite.substring(0, 10)} <span 
                                                        className='espace'>Heure : </span> {item.heure} h</h5>
                                                        </div>
                                                        <div className='motif'>
                                                            <h5><span>Description: </span></h5>
                                                            <h3> {item.description} </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="textCongeM">
                                                    <div className="top">
                                                        <div>

                                                        </div>
                                                        {
                                                        showMenu && selectedItem && (
                                                            <div className="menu-overlay">
                                                                <div className="menu-container">
                                                                    <Link to={`/modifyVisite/${item.id}`} className="menu-option">
                                                                        <FaEdit className="menu-icon" />
                                                                    </Link>
                                                                    <div className="menu-option" onClick={() => handleDeleteVisite(item.id)}>
                                                                        <FaTrash className="menu-icon" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                        <div className="menu" onClick={() => { setShowMenu(!showMenu); setSelectedItem(item); }}>
                                                            <p>...</p>
                                                        </div>
                                                    </div>
                                                    <div className="motif">
                                                        <p>En attente</p>
                                                    </div>
                                                </div>
                                            </div> 
                                        )
                                    }

                            </div>
                        </div>
                    </div>
                </div>
                {showConfirmationVisite && selectedVisite && (
                    <div className="confirmationModal">
                        <div className="modalContent">
                            <h3>Confirmer la suppression</h3>
                            <p>Voulez-vous vraiment annuler le demande de visite sélectionné ?</p>
                            <hr className='hr' />
                            <div className="modalActions">
                                <button className='ok' onClick={confirmDeleteVisite}>Supprimer</button>
                                <button className='annuler' onClick={() => setShowConfirmationVisite(false)}>Annuler</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
        // 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀
    else
        return (
            <div className='corpHome'>
                <div className="gaucheHome">
                    <div className="coucheGauche">
                        <Link to={"/comptePage"}>
                            <div className="contenue">
                                <img className='image' src={`http://localhost:5000/images/${user.image}`}/>
                                <p>{user.nom}</p>
                            </div>
                        </Link>
                        <Link to={"/listeDetenus"}>
                            <div className="contenue">
                                <img className='image' src={envIncitIcon}/>
                                <p>Envoyer incident</p>
                            </div>
                        </Link>
                        <Link to={"/listeIncidents"}>
                            <div className="contenue">
                                <img className='image' src={incidentIcon}/>
                                <p>Incidents</p>
                            </div>
                        </Link>
                        <Link to={"/demandeConge"}>
                            <div className="contenue fil">
                                <img className='image' src={congeDemIcon}/>
                                <p>Demander de congé</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="droiteHome">
                    <div className="coucheDroiteConge">
                            <div className="coverDroit">
                                <div className="divTete">
                                    <div className="titre">
                                        <p>Demande de congés</p>
                                    </div>
                                    <div className="rechercheDiv">
                                        <div className="icon">
                                            <FaSearch className="search-icon" />
                                        </div>
                                        <div className="divInput">
                                            <input type="text" value={searchValueConge} onChange={handleSearchChange} placeholder='Rechercher ici...'/>
                                        </div>
                                    </div>
                                </div>
                            <div className="divContenue">

                            {dataConge
                            .filter(item =>
                                Object.values(item).some(value =>
                                String(value).toLowerCase().includes(searchValueConge.toLowerCase())
                                )
                                )
                                .map((item, index) =>
                                    <div key = {index} className="contentConge">
                                        <div className="gauche">
                                            <div className="imageC">
                                                <img src={demandeIcon}/>
                                            </div>
                                            <div className="textCongee">
                                                <div className='top'>
                                                    <h5><span>Date de début:</span> {item.date.substring(0, 10)} <span 
                                                    className='espace'>Date de fin:</span> {item.dateFin.substring(0, 10)} </h5>
                                                </div>
                                                <div className='motif'>
                                                    <h3> {item.motif} </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="textCongeM">
                                        <div className="top">
                                            <div>

                                            </div>
                                            {
                                            showMenu && selectedItem && (
                                                <div className="menu-overlay">
                                                    <div className="menu-container">
                                                        <Link to={`/modifyConge/${item.id}`} className="menu-option">
                                                            <FaEdit className="menu-icon" />
                                                        </Link>
                                                        <div className="menu-option" onClick={() => handleDeleteConge(item.id)}>
                                                            <FaTrash className="menu-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                            <div className="menu" onClick={() => { setShowMenu(!showMenu); setSelectedItem(item); }}>
                                                <p>...</p>
                                            </div>
                                        </div>
                                        <div className="motif">
                                            <p>En attente</p>
                                        </div>
                                    </div>
                                    </div>  
                                )
                            }

                            </div>
                        </div>
                    </div>
                </div>
                {showConfirmation && selectedConge && (
                    <div className="confirmationModal">
                        <div className="modalContent">
                            <h3>Confirmer la suppression</h3>
                            <p>Voulez-vous vraiment le annuler el demande de congé sélectionné ?</p>
                            <hr className='hr' />
                            <div className="modalActions">
                                <button className='ok' onClick={confirmDeleteConge}>Supprimer</button>
                                <button className='annuler' onClick={() => setShowConfirmation(false)}>Annuler</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
}

export default CorpHome