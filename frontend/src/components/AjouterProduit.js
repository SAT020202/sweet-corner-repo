import React, { useState, useEffect } from 'react';
import { getCategories, addProduit } from '../services/api';
import { useNavigate } from 'react-router-dom'; 

const AjouterProduit = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        image: null,
        prix: '',
        categorie_id: '',
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories :', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nom', formData.nom);
        data.append('description', formData.description);
        data.append('image', formData.image);
        data.append('prix', formData.prix);
        data.append('categorie_id', formData.categorie_id);

        try {
            await addProduit(data);
            navigate('/produits');
            //alert('Produit ajouté avec succès');
        } catch (error) {
            alert('Erreur lors de l\'ajout du produit');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Ajouter un Produit</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image (URL)</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        value={formData.prix}
                        onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select
                        className="form-select"
                        value={formData.categorie_id}
                        onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}
                        required
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((categorie) => (
                            <option key={categorie.idCategorie} value={categorie.idCategorie}>
                                {categorie.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
};

export default AjouterProduit;