import React, { useState } from 'react';
import axios from 'axios';
import './css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useRole } from './Navbar';
import HomePage from './HomePage';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setRole } = useRole();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', { email, password });

            if (res.data.success) {
                // Stocke le rôle et le token dans le localStorage
                localStorage.setItem('role', res.data.user.role);
                localStorage.setItem('token', res.data.token);
                if (res.data.user.role === 'admin') {
                    localStorage.setItem('idAdmin', res.data.user.idAdmin); 
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;


                setRole(res.data.user.role); // Met à jour le rôle dans le Navbar immédiatement
                navigate('/');
            } else {
                alert('Identifiants invalides');
            }
        } catch (error) {
            alert('Erreur de connexion');
            console.error(error);
        }
    };

    return (
        <div>
            <div className="login-page">
                <div className="login-form">
                    <h2>Connexion</h2>
                    <p>Veuillez vous connecter en utilisant les détails du compte ci-dessous.</p>
                   <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Courriel"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Se connecter</button>
                </form>
                    <div className="login-links">
                        <a href="/creerCompte">Créer un compte</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;