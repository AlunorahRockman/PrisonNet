import React, { useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import errorIcon from "../../Outils/icon/error.ico";
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import "./demandeConge.css"

function DemandeCongePers() {

    const [errors, setErrors] = useState([]);
    const [idPers, setIdPers] = useState(0);

    const navigate = useNavigate();

    const {user} = useAuth();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getIdPersonnel/${user.id}`);
                const id = response.data.id;
                setIdPers(id);
            } catch (error) {
                console.error(error);
            }
    };
        fetchdata();
    }, [user.id]);

    console.log(idPers)


    useEffect(() => {
        if (idPers !== null) {
            setValues((prevState) => ({
                ...prevState,
                personnelId: idPers,
            }));
        }
    }, [idPers]);



    
    const [values, setValues] = useState({
        personnelId: null,
        date: "",
        dateFin: "",
        motif: "",
        status: 0
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createOneConge', values)
        .then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                setErrors(err.response.data);
            }
        });
    };



    return (
        <div className="containerAddPers">
            <h1>Demande de congé</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numero">Date de début:</label>
                    <input
                    type="date"
                    id="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setValues({ ...values, date: e.target.value })}
                    placeholder='...'
                    />
                <label htmlFor="max">Date de fin congé:</label>
                    <input
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setValues({...values, dateFin: e.target.value})}
                    placeholder='...'
                    />

                <label htmlFor="super">Motif:</label>
                    <input
                    type="text"
                    id="motif"
                    name="motif"
                    onChange={e => setValues({...values, motif: e.target.value})}
                    placeholder='...'
                    />

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
                <hr className='hr' />
                <button type="submit" className="submit-button">Enregistrer</button>
                <hr className='hr' />
                <p className='p'>Retour à la <Link to={'/'}>maison</Link></p>
                <br />
            </form>
        </div>
    )
}

export default DemandeCongePers