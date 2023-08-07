import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import retourIcon from "../../Outils/icon/retour.ico";
import sendIcon from "../../Outils/icon/send.ico";
import aina from "../../Outils/icon/aina.png";
import { FaSearch } from 'react-icons/fa';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./messagePage.css";


function MessagePage() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [nomUser, setnomUser] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [roomId, setRoomId]=useState()

    const [currentMessage, setCurrentMessage] = useState()
    const [messageList, setMessageList] = useState([])

    const [senderName, setSenderName] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const { socket } = useAuth();
    const { user } = useAuth();

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${user.id}`);
                setData(response.data);
                if (selectedUserId === null && response.data.length > 0) {
                    setnomUser(response.data[0].nom);
                    setSelectedUserId(response.data[0].id);
                    setSelectedImage(response.data[0].image);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData()
    }, []);

    useEffect(()=>{
        if(!socket)return

        socket.emit('join-chat', {
            me:user.id,
        })

        socket.on('new-message', data=>{
            console.log(messageList)
            setMessageList([...messageList, data])
            const senderName = data.sender.nom;
            const messageContent = data.message;
            setSenderName(senderName)
            setMessageContent(messageContent)

        })

    }, [socket])

    useEffect(() => {
        if (senderName && messageContent) {
            toast.success(`Nouveau message de ${senderName} : ${messageContent}`, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    }, [senderName, messageContent]);

    

    const handleUserClick = (id, nom, image) => {
        setnomUser(nom);
        setSelectedUserId(id);
        setSelectedImage(image);
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/messages/${user.id}/${selectedUserId}`);
            setMessageList(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    fetchData()
    }, [handleUserClick]);

    // ! Message 

    const sendMessage = () => {
        if(currentMessage !== ""){
            const messageData = {
                idSender: user.id,
                idRecever: selectedUserId,
                message: currentMessage,
                estVue: 0
            }

            socket.emit("send_message", {
                roomId:roomId,
                content:messageData
            })
        }
        setCurrentMessage(''); 
    }

    const sendNotification = () => {
            const notificationData = {
                senderId: user.id,
                receverId: selectedUserId,
                link: '/fideran',
                message: "une message envoyé",
                isRead: 0
            }

            socket.emit("send_notification", {
                roomId: roomId,
                content: notificationData
            })
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            sendMessage();
            sendNotification();
        }
    };


    // ! Message


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
                                <div className='centralMessage'>
                                    {messageList.map((item, index) => {

                                    const formattedDate = moment(item.createdAt).format('HH:mm:ss');

                                    return (
                                        <div className={user.id === item.idSender ? "sender" : "recipient"} key={index}>
                                            <div className="nom">
                                                <p></p>
                                            </div>
                                            <div className="divContenue">
                                                <div className="divImage">
                                                    {user.id === item.idSender ? null : (
                                                        <img src={`http://localhost:5000/images/${item.sender.image}`} />
                                                    )}
                                                </div>
                                                <div className={user.id === item.idSender ? "gauche" : "droite"}>
                                                    <p>{item.message}</p>
                                                </div>
                                            </div>
                                            <div className="heure">
                                                <p>{formattedDate}</p>
                                            </div>
                                        </div>
                                    );
                            
                                    })}
                                </div>

                            <div className="divFotter">
                                <input
                                id='text'
                                name="contenue"
                                onKeyPress={handleKeyPress}
                                value={currentMessage}
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value)
                                }}
                                type="text"
                                placeholder='Aa...'
                                />
                                {/* <button onClick={sendMessage}> 
                                    <img src={sendIcon} alt="Send" />
                                </button> */}
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
            <ToastContainer
                theme='dark'
            />
        </div>
    );
}

export default MessagePage;
