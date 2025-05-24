import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/creerCompte.css'; // Assurez-vous d'avoir ce fichier CSS pour le style


const CreerCompte = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/creerCompte', {
                email,
                password,
                password_confirmation: passwordConfirm,
                
            });
            if (res.data.success) {
                alert('Compte créé avec succès ! Connectez-vous.');
                navigate('/login');
            } else {
                alert(res.data.message || 'Erreur lors de la création du compte');
            }
        } catch (error) {
            alert('Erreur lors de la création du compte');
            console.error(error);
        }
    };

    return (
    <div className="register-page">
        <div className="register-form">
            <h2>Créer un compte</h2>
            <p>Veuillez remplir les détails ci-dessous pour créer un compte.</p>
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
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    required
                />
                <button type="submit">Créer le compte</button>
            </form>
        </div>
    </div>
);
};
export default CreerCompte;