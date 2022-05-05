import React, {useState} from 'react';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    let navigate = useNavigate();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            navigate('/profile');
        }
        catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }

    return (
        <div className="new-incident-container">
            <div className="new-incident-content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1 className='new-incident-title'> Cadastrar novo caso </h1>
                    <p className='new-incident-drecription'>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Volta para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                   
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}