import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const { register, handleSubmit, errors } = useForm();

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident() {
        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar umn herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a Home
                    </Link>
                </section>

                <form onSubmit={handleSubmit(handleNewIncident)}>
                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        name="title"
                        ref={register({required: true})}
                        onChange={e => setTitle(e.target.value)}
                    />                    
                    {errors.title && <span className="validationErrorMessage">O título é necessário.</span>}

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        name="description"
                        ref={register({required: true})}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {errors.description && <span className="validationErrorMessage">É necessário fornecer uma descrição.</span>}

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        name="value"
                        ref={register({required: true})}
                        onChange={e => setValue(e.target.value)}
                    />
                    {errors.value && <span className="validationErrorMessage">É necessário fornecer o valor.</span>}

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
