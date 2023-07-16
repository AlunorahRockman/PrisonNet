import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../../hooks/useAuth';

import retourIcon from "../../Outils/icon/retour.ico";
import sendIcon from "../../Outils/icon/send.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import moment from 'moment';


import "./messagePage.css";

const socket = io.connect('http://localhost:5000');

function MessagePage() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const [nomUser, setnomUser] = useState("")
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);


    const {user}=useAuth()

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${user.id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        };
        fetchData();
    }, []);

    useEffect(() => {
        socket.on('message', (data) => {
        console.log('Message received:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
        getMessages(receiverId, user.id);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleUserClick = (id, nom, image) => {
        setReceiverId(id);
        setnomUser(nom);
        setSelectedUserId(id);
        setSelectedImage(image);
        getMessages(id, user.id);
    };

    const getMessages = (idRecever, idSender) => {
        axios.get(`http://localhost:5000/messages/${idRecever}/${idSender}`)
        .then(response => {
            const messages = response.data;
            // Mettez à jour l'état des messages avec les nouveaux messages reçus
            setMessages(messages);
            console.log(messages)
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
    };

    const sendMessage = () => {
        if (!receiverId) {
            console.warn('No receiver selected');
        return;
        }

        const messageData = {
            idSender: user.id,
            idRecever: receiverId,
            message: message,
            estVue: false
        };

        socket.emit('message', messageData);
        getMessages(receiverId, user.id);
    };

    return (
        <div className='messanger'>
            <div className="centralCenter">
                <div className="gaucheCentral">
                    <div className="couche">
                        <div className="titreDiscusion">
                            <p>Discussions</p>
                        </div>
                        <div className="inputRechercherDis">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={handleSearchChange}
                                placeholder='Recherche dans Messenger...'
                            />
                        </div>
                        <div className="content">
                        {data
                            .filter(item =>
                            Object.values(item).some(value =>
                                String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                            )
                            .map((item, index) => (
                            <div
                                key={index}
                                className={`contenueUser ${item.id === selectedUserId ? 'selected' : ''}`}
                                onClick={() => handleUserClick(item.id, item.nom, item.image)}
                                >
                                <div className="image">
                                    <img src={`http://localhost:5000/images/${item.image}`}/>
                                </div>
                                <div className="titre">
                                    <div className="div">
                                        <h6>{item.nom}</h6>
                                        <p>{item.typeCompte}</p>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div className="central">
                    <div className="topImage">
                        <Link to={`/`}>
                            <img src={`http://localhost:5000/images/${selectedImage}`}/>
                        </Link>
                        <p>{nomUser}</p>
                    </div>
                    <div className="centralMessage">
                        {messages.map((message, index) => message.idSender === user.id ?
                            <div key={index} className="sender">
                                <p>{message.message}</p>
                                <h6>{moment(message.createdAt).format('DD/MM/YYYY -> HH:mm')}</h6>
                            </div>:
                            <div key={index} className="recipient">
                                <p>{message.message}</p>
                                <h6>{moment(message.createdAt).format('DD/MM/YYYY HH:mm')}</h6>
                            </div>
                        )}
                    </div>
                    <div className="divFotter">
                        <input
                        id='text'
                        name="contenue"
                        value={message}
                        onChange={handleMessageChange}
                        type="text"
                        placeholder='Aa...'
                        />
                        <button onClick={sendMessage}>
                            <img src={sendIcon} alt="Send" />
                        </button>
                    </div>
                </div>
                <div className="droitCentral">
                    <div className="droiteCover">
                        <Link to={`/`}>
                            <img src={`http://localhost:5000/images/${selectedImage}`}/>
                        </Link>
                    </div>
                    <div className="nom">
                        <p>{nomUser}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagePage;
