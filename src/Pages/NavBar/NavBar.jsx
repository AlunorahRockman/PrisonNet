import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import aina from '../../Outils/icon/aina.png';
import logo from '../../Outils/icon/logo.png';
import deconnecterIcon from '../../Outils/icon/logout.ico';
import notificationIcon from '../../Outils/icon/notification.ico';
import messengerIcon from '../../Outils/icon/messenger.ico';
import { useAuth } from '../../hooks/useAuth';
import './navBar.css';

function NavBar() {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); 
    const [notificationList, setNotifitionList] = useState([])

    const { socket } = useAuth();
    const { user } = useAuth();

    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let resultat = await axios.get(`http://localhost:5000/getOneUsers/${user.id}`);
            resultat = await resultat.data;
            setDataUser(resultat);
        };
        fetchData();
    }, []);

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
    };

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

    useEffect(()=>{
        if(!socket)return

        socket.emit('join-notification', {
            me:user.id,
        })

        socket.on('new-notification', data=>{
            console.log(notificationList)
            setNotifitionList([...notificationList, data])
        })

    }, [socket])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getNotification/${user.id}`);
                setNotifitionList(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData()
    }, []);

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
            <Link to="/messagePage">
                <div className="iconPrim">
                <img src={messengerIcon} alt="message Icon" />
                </div>
            </Link>
            <div className={`iconDem ${showNotification ? 'active' : ''}`} onClick={handleNotificationClick}>
                <img src={notificationIcon} alt="notification Icon" />
            </div>
            <div className="photo" onClick={handleProfileClick}>
                <img src={`http://localhost:5000/images/${dataUser.image}`}/>
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
                        
                    {notificationList.map((item, index) => {
                        <Link to={`/${item.link}`}>
                            <div className="contenueNotif">
                                <div className="coucheContenue">
                                    <div className="imageNotif">
                                        <img src={`http://localhost:5000/images/${item.sender.image}`}/>
                                    </div>
                                    <div className="descriptionNotif">
                                        <h6>{item.sender.nom}</h6>
                                        <p>{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}


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
                                <img src={`http://localhost:5000/images/${dataUser.image}`}/>
                            </div>
                            <div className="textDrop">
                                <p>{dataUser.nom}</p>
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

export default NavBar;
