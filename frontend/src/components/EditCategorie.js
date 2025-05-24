import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories, updateCategorie } from '../services/api';
import './css/EditCategorie.css';

const EditCategorie = () => {
    const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nom: '' }); // Données du formulaire

    // Charger les données de la catégorie à modifier
    useEffect(() => {
        const fetchCategorie = async () => {
            try {
                const response = await getCategories(); // Récupère toutes les catégories
                const categorie = response.data.find((cat) => cat.idCategorie === parseInt(id));
                if (categorie) {
                    setFormData({ nom: categorie.nom }); // Pré-remplit le formulaire
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la catégorie :', error);
            }
        };

        fetchCategorie();
    }, [id]);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategorie(id, formData); // Met à jour la catégorie via l'API
            navigate('/categories'); // Redirige vers la liste des catégories
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la catégorie :', error);
        }
    };

    return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container mt-5">
            <h1 className="text-center mb-4"><i className="fas fa-edit"></i> Modifier la Catégorie</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label"> <i className="fas fa-tag me-2"></i>Nom de la catégorie</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        required
                    />
                </div>
            <div className="text-center">
                <button type="submit" className="btn btn-outline-primary w-50">
                    <i className="fas fa-save me-2"></i> Enregistrer
                </button>
            </div>
            </form>
        </div>
    </div>
    );
};

export default EditCategorie;