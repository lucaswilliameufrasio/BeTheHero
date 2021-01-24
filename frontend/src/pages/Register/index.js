import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import { ValidationError } from '../../components';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    async function handleRegister() {
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastros</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        name="name"
                        ref={register({required: true})}
                        onChange={e => setName(e.target.value)}
                    />
                    {errors.name && <ValidationError error="O nome da ONG é necessário." />}

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        name="email"
                        ref={register({required: true})}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <ValidationError error="O e-mail é necessário." />}

                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        name="whatsapp"
                        ref={register({required: true})}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    {errors.whatsapp && <ValidationError error="O whatsapp é necessário." />}

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            name="city"
                        ref={register({required: true})}
                            onChange={e => setCity(e.target.value)}
                        />
                        {errors.city && <ValidationError error="A cidade é necessária." />}


                        <input
                            placeholder="UF"
                            style={{ width: 80, }}
                            value={uf}
                            name="uf"
                        ref={register({required: true})}
                            onChange={e => setUf(e.target.value)}
                        />
                        {errors.uf && <ValidationError error="A UF (Unidade Federativa) é necessária." />}

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
