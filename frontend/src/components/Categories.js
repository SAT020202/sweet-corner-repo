import React, { useState, useEffect } from 'react';
import { getCategories, addCategorie, updateCategorie, deleteCategorie } from '../services/api';
import './css/Categorie.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [formData, setFormData] = useState({ nom: '' }); // Données du formulaire
  const [editingId, setEditingId] = useState(null); // ID de la catégorie en cours d'édition
  const role = localStorage.getItem('role'); 

  // Charger les catégories au montage du composant
  useEffect(() => {
    if (role === 'admin') {
      fetchCategories();
    }
  }, [role]);

  // Récupérer les catégories depuis l'API
  const fetchCategories = async () => {
     try {
    const response = await getCategories();
    console.log('Réponse API catégories:', response);
    setCategories(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    if (error.response) {
      console.error('Réponse du serveur:', error.response.data);
      alert('Erreur API : ' + JSON.stringify(error.response.data));
    }
  }
  };

  // Ajouter ou modifier une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit appelé');
    try {
        if (editingId) {
        console.log('Modification en cours pour ID:', editingId);
        const response = await updateCategorie(editingId, formData); // Met à jour la catégorie via l'API
        console.log('Réponse de l\'API pour la modification :', response.data);

        setCategories(
            categories.map((categorie) =>
            categorie.idCategorie === editingId ? response.data : categorie
            )
        );
        } else {
        console.log('Ajout d\'une nouvelle catégorie avec les données :', formData);
        const response = await addCategorie(formData); // Ajoute une nouvelle catégorie via l'API
        console.log('Réponse de l\'API pour l\'ajout :', response.data);

        // Ajouter la nouvelle catégorie à la liste
        setCategories([...categories, response.data]);
        }

        // Réinitialiser le formulaire et l'état d'édition
        setFormData({ nom: '' });
        setEditingId(null);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement :', error);
    }
    };
  

  // Supprimer une catégorie
    const handleDelete = async (idCategorie) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
        if (!confirmDelete) {
            return; // Si l'utilisateur annule, ne rien faire
        }

        try {
            await deleteCategorie(idCategorie);
            setCategories(categories.filter((categorie) => categorie.idCategorie !== idCategorie)); // Mettre à jour la liste localement
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };
  if (role !== 'admin') {
    return <Navigate to="/" />;
  }
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestion des Catégories</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nom de la catégorie"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-outline-primary">
            {editingId ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>

      {/* Tableau des catégories */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, background: '#fff', borderRadius: 8, overflow: 'hidden', textAlign: 'center' }}>
        <thead >
          <tr style={{ background: '#e6d2fa' }}>
            <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Id</th>
            <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Nom</th>
            <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}> Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                Chargement...
              </td>
            </tr>
          ) : (
            categories.map((categorie, index) => (
              <tr key={categorie.idCategorie}>
                <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>{index + 1}</td>
                <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>{categorie.nom}</td>
                <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>
                  <div>
                    
                  </div>
                  <button
                    onClick={() => navigate(`/categories/edit/${categorie.idCategorie}`)} // Redirige vers le formulaire de modification
                 style={{
                                    background: 'white',
                                    color: '#ff8c00',
                                    border: 'solid #ff8c00',
                                    borderRadius: 6,
                                    padding: '6px 18px',
                                    cursor: 'pointer',
                                    fontSize: 15,
                                    marginRight: 10
                                }}
                >
                   <i className="fas fa-edit me-1"></i> 
                </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(categorie.idCategorie)}
                   style={{
                                    background: 'white',
                                    color: '#ff0000',
                                    border: 'solid #ff0000',
                                    borderRadius: 6,
                                    padding: '6px 18px',
                                    cursor: 'pointer',
                                    fontSize: 15
                                }}
                  >
                   <i className="fas fa-trash-alt me-1"></i> 
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;