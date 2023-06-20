import axios from 'axios';
import React, {useState} from 'react'
import aina from "../../Outils/icon/aina.png";
import logo from "../../Outils/icon/logo.png";
import deconnecterIcon from "../../Outils/icon/logout.ico";
import notificationIcon from "../../Outils/icon/notification.ico";
import messengerIcon from "../../Outils/icon/messenger.ico";
import { useParams, Link, useNavigate } from 'react-router-dom'
import "./navBar.css"

function NavBar() {
    return (
        <div className='navContainer'>
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
                    <Link to={'/'}>
                        <div className="iconPrim">
                            <img src={messengerIcon} alt="message Icon" />
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className="iconDem">
                            <img src={notificationIcon} alt="notification Icon" />
                        </div>
                    </Link>
                    <Link to={"/"}>
                        <div className="photo">
                            <img src={aina} alt="photo Profil" />
                            <div className='photo-bg'></div>
                        </div>
                    </Link>
                    <button>
                        <img src={deconnecterIcon} alt="deconnecter Icon"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar