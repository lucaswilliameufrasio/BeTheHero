import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import {ValidationError} from '../../components';

export default function Logon() {
    const [id, setId] = useState('');
    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    async function handleLogin() {
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleSubmit(handleLogin)}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        name="id"
                        value={id}
                        ref={register({required: true})}
                        onChange={e => setId(e.target.value)}
                    />

                    {errors.id && <ValidationError error="É necessário digitar um ID válido antes de continuar."/>}

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
