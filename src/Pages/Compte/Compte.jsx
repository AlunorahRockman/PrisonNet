import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import errorIcon from "../../Outils/icon/error.ico";
import password from "../../Outils/icon/password.ico";
import { useAuth } from '../../hooks/useAuth';
import Modal from 'react-modal'; 
import { ToastContainer, toast} from 'react-toastify';

import "./compte.css"

function Compte() {

    const {user} = useAuth()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const [dataUser, setDataUser] = useState({
        nom: "",
        prenom: "",
        sexe: "",
        email: "",
        adresse: "",
        dateNaissance: "",
        phone: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            let resultat = await axios.get(`http://localhost:5000/getOneUsers/${user.id}`);
            resultat = await resultat.data;
            setDataUser(resultat);
        };
        fetchData();
    }, []);

    const [nom, setNom] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.nom;
        setNom(valeurRecente);
    }, [dataUser.nom]);
    
    const [prenom, setPrenom] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.prenom;
        setPrenom(valeurRecente);
    }, [dataUser.prenom]);

    const [sexe, setSexe] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.sexe;
        setSexe(valeurRecente);
    }, [dataUser.sexe]);

    const [email, setEmail] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.email;
        setEmail(valeurRecente);
    }, [dataUser.email]);

    const [adresse, setAdresse] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.adresse;
        setAdresse(valeurRecente);
    }, [dataUser.adresse]);

    const [dateNaissance, setDateNaissance] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.dateNaissance.substring(0, 10)
        setDateNaissance(valeurRecente);
    }, [dataUser.dateNaissance]);

    const [phone, setPhone] = useState("");
    useEffect(() => {
        const valeurRecente = dataUser.phone;
        setPhone(valeurRecente);
    }, [dataUser.phone]);
    
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
                window.location.reload()
            })
            .catch(err => {
                console.error(err); 
                if (err.response.status === 401) {
                    setErrors(err.response.data);
                }
            });
    };

    // ! Image *****************************

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false); 
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setShowCancelButton(true);
        setShowSaveButton(true);
    };
    
    const handleCancel = () => {
        setSelectedFile(null);
        setPreviewImage(null);
        setShowCancelButton(false);
        setShowSaveButton(false);
    };
    

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Veuillez sélectionner une image.");
            return;
        }

        const currentFileName = selectedFile.name;

        let fileName = "";

        if (user.type_compte === "Admin") {
            fileName = `${user.id}Admin`;
        }

        if (user.type_compte === "Visiteur") {
            fileName = `${user.id}Visiteur`;
        }

        if (user.type_compte === "Personnel") {
            fileName = `${user.id}Personnel`;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);


        axios.post(`http://localhost:5000/upload/${fileName}`, formData)
            .then((response) => {
                console.log(response.data);
                axios.put(`http://localhost:5000/setImage/${user.id}/${fileName}`)
                .then((response) => {
                    console.log(response.data.message);
                    navigate('/')
                    window.location.reload()
                })
                .catch((error) => {
                    console.error(error.response.data.message);
                    alert("Une erreur est survenue lors de la modification de l'image.");
                });
            })
            .catch((error) => {
                console.error(error.response.data.message);
                alert("Une erreur est survenue lors du téléchargement de l'image.");
            });
    };


// ! **********************************************
    const [modalIsOpenReff, setModalIsOpenReff] = useState(false);
    const [errorsPass, setErrorsPass] = useState('')



    const [values, setValues] = useState({
        userId: user.id,
        motdepasseActuel: "",
        nouveauPass: "",
        confirmPass: ""
    })

    const closeModalReff = () => {
        setModalIsOpenReff(false);
    };

    const openModalReff = () => {
        setModalIsOpenReff(true);
    };

    const handleSubmitPass = (e) => {
        e.preventDefault()
        console.log(values)
        axios.post(`http://localhost:5000/modifierMotdepasseCompte`, values)
            .then(response => {
                closeModalReff(); 
                toast.success('Le mot de passe a été modifié avec succès!', {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'dark'
                });
            })
            .catch(err => {
                console.error(err);
                if (err.response.status === 401) {
                    setErrorsPass(err.response.data);
                }
            });
    };



// ! **********************************************

    return (
        <div className='corpHome'>
            <div className="gaucheCompte">
                <div className="divTitreCompte">
                    <p>Modifier mon profil</p>
                </div>
                <div className='modPass'>
                    <button onClick={() => {openModalReff(); }}><img src={password}/></button>
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
                        {previewImage ? (
                            <img className='image' src={previewImage} alt="Image sélectionnée" />
                        ) : (
                            <img className='image' src={`http://localhost:5000/images/${dataUser.image}`} alt="Image de profil" />
                        )}
                    </div>
                    <div className="divInputTitre">
                        {showCancelButton ? ( 
                            <div className="titreInput">
                                <button onClick={handleCancel}>Annuler</button>
                            </div>
                        ) : (
                            <div className="titreInput">
                                <p>Photo de profil</p>
                            </div>
                        )}
                        <div className="inputBtn">
                            <label htmlFor="file">Importer une photo</label>
                            <input type="file" onChange={handleFileChange} id='file'/>
                        </div>
                    </div>

                    <div className="divBtn">
                        <hr className='hr'/>
                        {showSaveButton && <button onClick={handleUpload}>Enregistrer</button>}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpenReff}
                onRequestClose={closeModalReff}
                contentLabel="Confirmation Modal"
                className="Modal"
                overlayClassName="ModalOverlay" 
                style={{
                    content: {
                        width: "400px", 
                        margin: "auto", 
                    },
                }}
                >
                <h3>Mettre a jour votre mot de passe</h3>
                <br />
                <hr className="hr" />
                <form onSubmit={handleSubmitPass}>
                <div className="divContainerIput">
                    <br />
                    <div className="divInputM">
                        <label>Mot de passe actuel:</label>
                        <input type="password" placeholder='...' onChange={e => setValues({...values, motdepasseActuel: e.target.value})}/>
                    </div>
                    <div className="divInputM">
                        <label>Nouveau mot de passe:</label>
                        <input type="password" placeholder='...' onChange={e => setValues({...values, nouveauPass: e.target.value})}/>
                    </div>
                    <div className="divInputM">
                        <label>Confirmation du nouveau mot de passe:</label>
                        <input type="password" placeholder='...' onChange={e => setValues({...values, confirmPass: e.target.value})}/>
                    </div>
                    <br />
                </div>
                    {
                        errorsPass && errorsPass.length > 0 && (
                        <div className="errors">
                            <div className="errorIcon">
                                <img src={errorIcon} alt="erreur" />
                            </div>
                            <div className="errorText">
                            <p style={{ fontSize: '15px' }}>{errorsPass}</p>
                            </div>
                        </div>
                        )
                    }
                <hr className="hr" />
                <div className='modalActions'>
                    <button type="submit" className="ok">Modifier</button>
                    <button onClick={closeModalReff} className="annuler">Annuler</button>
                </div>
                </form>
            </Modal>
        </div>
    )
}

Modal.setAppElement('#root');

export default Compte