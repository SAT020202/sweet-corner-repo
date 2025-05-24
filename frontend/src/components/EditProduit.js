import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduitById, getCategories, updateProduit } from '../services/api';
import UnitesProduit from './UnitesProduit';


const EditProduit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        image: null,
        prix: '',
        categorie_id: '',
    });

    const [produit, setProduit] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    getCategories(),
                    getProduitById(id)
                ]);
                setCategories(catRes.data);
                setFormData({
                    nom: prodRes.data.nom,
                    description: prodRes.data.description,
                    image: null,
                    prix: prodRes.data.prix,
                    categorie_id: prodRes.data.categorie.idCategorie,
                });
                 setProduit(prodRes.data);
            } catch (error) {
                alert("Erreur lors du chargement");
            }
        };
        fetchData();
    }, [id]);

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
        data.append('prix', formData.prix);
        data.append('categorie_id', formData.categorie_id);
        if (formData.image) {
            data.append('image', formData.image);
        }
        try {
            await updateProduit(id, data);
            navigate('/produits');
        } catch (error) {
            alert("Erreur lors de la modification");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Modifier le Produit</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image (laisser vide pour ne pas changer)</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        name="prix"
                        value={formData.prix}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select
                        className="form-select"
                        name="categorie_id"
                        value={formData.categorie_id}
                        onChange={handleChange}
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
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
            {produit && (
                <div style={{ marginTop: 40 }}>
                <UnitesProduit produit={produit} />
                </div>
            )}
        </div>
    );
};

export default EditProduit;