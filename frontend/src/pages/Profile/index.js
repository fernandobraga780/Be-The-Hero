import React, {useEffect, useState} from 'react';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const navigate = useNavigate();

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        }
        catch{
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear();

        navigate('/');
    }

    return (
        <div className='profile-container'>
            <header className='profile-header'>
                <img className='logo' src={logoImg} alt="Be The Hero"/>
                <span> Bem vinda, {ongName} </span>

                <Link className='button' to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} className='power-button' type='button'>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1 className='profile-title'>Casos cadastrados</h1>

            <ul className='incidents'>
                {incidents.map(incident => (
                    <li key={incident.id} className='incident-card'>
                    <strong className='card-title'>Caso:</strong>
                    <p className='card-information'>{incident.title}</p>

                    <strong className='card-title'>DESCRI????O:</strong>
                    <p className='card-information'>{incident.description}</p>

                    <strong className='card-title'>VALOR:</strong>
                    <p className='card-information'>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} className='delete-button' type='button'>
                        <FiTrash2 size={20} color="#A8A8B3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}