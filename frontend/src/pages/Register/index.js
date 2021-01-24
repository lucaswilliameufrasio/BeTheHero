import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

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
                    {errors.name && <span className="validationErrorMessage">O nome da ONG é necessário.</span>}

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        name="email"
                        ref={register({required: true})}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="validationErrorMessage">O e-mail é necessário.</span>}

                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        name="whatsapp"
                        ref={register({required: true})}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    {errors.whatsapp && <span className="validationErrorMessage">O whatsapp é necessário.</span>}

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            name="city"
                        ref={register({required: true})}
                            onChange={e => setCity(e.target.value)}
                        />
                        {errors.city && <span className="validationErrorMessage">A cidade é necessária.</span>}


                        <input
                            placeholder="UF"
                            style={{ width: 80, }}
                            value={uf}
                            name="uf"
                        ref={register({required: true})}
                            onChange={e => setUf(e.target.value)}
                        />
                        {errors.uf && <span className="validationErrorMessage">A UF (Unidade Federativa) é necessária.</span>}

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
