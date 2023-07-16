import axios from 'axios';
import React, {useState} from 'react'
import aina from "../../Outils/icon/aina.png";
import logo from "../../Outils/icon/logo.png";
import deconnecterIcon from "../../Outils/icon/logout.ico";
import notificationIcon from "../../Outils/icon/notification.ico";
import { useAuth } from '../../hooks/useAuth';
import messengerIcon from "../../Outils/icon/messenger.ico";
import { useParams, Link, useNavigate } from 'react-router-dom'

import "../NavBar/navBar.css"

function NavBarMessage() {
    const [showNotification, setShowNotification] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Nouvel état

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
    };

    const {user} = useAuth()

    function logout() {
        localStorage.clear();
        window.location.reload();
    }

    
    const openConfirmationModal = () => {
        setShowConfirmationModal(true);
    };


    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    return (
        <div className="navContainer">
        <div className="navCouche">
            <div className="navPrim">
            <Link to={'/'}>
                <div className="iconPrison">
                <img src={logo} alt="logo Icon" />
                </div>
            </Link>
            <div className="textPrison">
                <p>PrisonNet</p>
            </div>
            </div>
            <div className="navDem">
            <div className={`iconDem ${showNotification ? 'active' : ''}`} onClick={handleNotificationClick}>
                <img src={notificationIcon} alt="notification Icon" />
            </div>
            <div className="photo" onClick={handleProfileClick}>
                <img src={`http://localhost:5000/images/${user.image}`}/>
                <div className="photo-bg"></div>
            </div>
            </div>
        </div>
        {showNotification && (
            <div className="notificationWindow">
                <div className="coucheNotif">
                    <div className="titreNotif">
                        <p>Notifications</p>
                        <hr className='hr' />
                    </div>
                    <div className="divContainerNotif">
                        
                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>


                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>


                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>


                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/'}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={aina}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>Alunorah Aina</h6>
                                        <p>Nangataka angataka angataka angataka angatakacongé ity namana iray ity</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        )}

        {showProfileDropdown && (
            <div className="profileDropdown">
                <div className="dropdownContent">
                    <Link to="/comptePage">
                        <div className="dropCompte">
                            <div className="divImage">
                                <img src={`http://localhost:5000/images/${user.image}`}/>
                            </div>
                            <div className="textDrop">
                                <p>{user.nom}</p>
                            </div>
                        </div>
                    </Link>
                    <hr className='hr' />
                    <button onClick={openConfirmationModal}>
                        <div className="divImage">
                            <img src={deconnecterIcon}/>
                        </div>
                        <div className="text">
                            <p>Se déconnecter</p>
                        </div>
                    </button>
                </div>
            </div>
        )}

        {showConfirmationModal && (
            <div className="confirmationModal">
                <div className="modalContent">
                    <h3>Confirmer la déconnexion</h3>
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                <hr className='hr' />
                <div className="modalActions">
                    <button className='ok' onClick={logout}>OK</button>
                    <button className='annuler' onClick={closeConfirmationModal}>Annuler</button>
                </div>
                </div>
            </div>
        )}
        </div>
    );

}


export default NavBarMessage